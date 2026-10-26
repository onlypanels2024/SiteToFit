// SiteToFit email service: sends payslip emails queued by the app (companies/{cid}/mail/{id}) through Resend.
// The app never chooses who gets an email or what it says: this checks the address against the person on the rota
// and builds the message itself, so the queue can't be used to send anything else.
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
admin.initializeApp();
const RESEND_KEY = defineSecret('RESEND_KEY');
const clean = (s, n = 80) => String(s || '').replace(/[<>"\r\n]/g, ' ').trim().slice(0, n);
const monthName = (ym) => new Date(ym + '-15T12:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'Europe/Malta' });

exports.sendPayslip = onDocumentCreated({ document: 'companies/{cid}/mail/{id}', region: 'europe-west1', secrets: [RESEND_KEY], retry: false }, async (ev) => {
  const ref = ev.data.ref; const m = ev.data.data(); const { cid } = ev.params;
  if (!m || m.status !== 'queued' || m.kind !== 'payslip' || !/^\d{4}-\d{2}$/.test(m.ym || '')) return;
  const fail = (msg) => ref.update({ status: 'error', error: String(msg).slice(0, 300), doneAt: Date.now() });
  try {
    const db = admin.firestore();
    const [co, run, person] = await Promise.all([db.doc(`companies/${cid}`).get(), db.doc(`companies/${cid}/payruns/${m.ym}`).get(), db.doc(`companies/${cid}/staff/${m.staffId}`).get()]);
    if (!co.exists || !run.exists || run.data().status !== 'approved') return fail('This payroll is not approved.');
    if (!person.exists || !person.data().email || person.data().email.toLowerCase() !== String(m.to).toLowerCase()) return fail('The email address doesn’t match the person on the rota.');
    const line = (run.data().lines || []).find((l) => l.staffId === m.staffId);
    if (!line) return fail('This person isn’t on the approved payroll.');
    const path = `companies/${cid}/payslips/${m.ym}/${m.staffId}.pdf`;
    const [buf] = await admin.storage().bucket().file(path).download();
    const c = co.data(); const name = clean(c.name);
    const reply = clean((c.invoice && c.invoice.email) || (c.contact && c.contact.email), 120);
    const net = '€' + Number(line.net).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const first = clean(person.data().name).split(' ')[0];
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_KEY.value()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${name} payslips <payslips@siteto.fit>`, to: [person.data().email], ...(reply ? { reply_to: reply } : {}),
        subject: `Your payslip for ${monthName(m.ym)} · ${name}`,
        text: `Hi ${first},\n\nYour payslip for ${monthName(m.ym)} is attached as a PDF. Net pay: ${net}.\n\nIf anything looks wrong, reply to this email${reply ? '' : ' or speak to the office'}.\n\n${name}\n\nSent with SiteToFit`,
        attachments: [{ filename: `Payslip ${monthName(m.ym)} - ${clean(person.data().name)}.pdf`, content: buf.toString('base64') }],
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return fail(body.message || `Email service error ${res.status}`);
    await ref.update({ status: 'sent', sentAt: Date.now(), providerId: body.id || '' });
  } catch (e) { await fail(e.message || e); }
});
