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

// ---------------------------------------------------------------------------------------------------------------
// Digital contracts pack: the signing link email and the signed copy email. As with payslips, the app only queues
// which contract; this function checks it and writes the email itself.
const SITE = 'https://siteto.fit';
const fmtWhen = (ms) => new Date(ms).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Malta' });
async function resend(body) {
  const res = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${RESEND_KEY.value()}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(out.message || `Email service error ${res.status}`);
  return out.id || '';
}
exports.sendContractMail = onDocumentCreated({ document: 'companies/{cid}/mail/{id}', region: 'europe-west1', secrets: [RESEND_KEY], retry: false }, async (ev) => {
  const ref = ev.data.ref; const m = ev.data.data(); const { cid } = ev.params;
  if (!m || m.status !== 'queued' || !['contract-link', 'contract-signed'].includes(m.kind) || !m.contractId) return;
  const fail = (msg) => ref.update({ status: 'error', error: String(msg).slice(0, 300), doneAt: Date.now() });
  try {
    const db = admin.firestore();
    const [co, con] = await Promise.all([db.doc(`companies/${cid}`).get(), db.doc(`companies/${cid}/contracts/${m.contractId}`).get()]);
    if (!co.exists || !con.exists) return fail('Contract not found.');
    const c = con.data(); const comp = co.data(); const name = clean(comp.name);
    if (!c.clientEmail || c.clientEmail.toLowerCase() !== String(m.to).toLowerCase()) return fail('The email address doesn’t match the contract.');
    const reply = clean((comp.invoice && comp.invoice.email) || (comp.contact && comp.contact.email), 120);
    const first = clean(c.clientName).split(' ')[0];
    const from = `${name} <contracts@siteto.fit>`;
    if (m.kind === 'contract-link') {
      if (c.status !== 'sent' || !c.token || c.token !== m.token) return fail('This contract isn’t waiting for an emailed signature.');
      const sg = await db.doc(`signing/${c.token}`).get();
      if (!sg.exists || sg.data().cid !== cid) return fail('The signing link is missing.');
      const link = `${SITE}/sign/?t=${c.token}`;
      const id = await resend({ from, to: [c.clientEmail], ...(reply ? { reply_to: reply } : {}),
        subject: `Please sign your contract with ${name}`,
        text: `Hi ${first},\n\nThank you for choosing ${name}. Please read and sign your contract here:\n\n${link}\n\nYou’ll see the contract and the company policy. Tick both boxes, then sign with your finger or mouse.\n\nThis link works until ${fmtWhen(sg.data().expiresAt)}.\n\nIf you have any questions, reply to this email.\n\n${name}\n\nSent with SiteToFit` });
      return ref.update({ status: 'sent', sentAt: Date.now(), providerId: id });
    }
    // signed copy, to the client and (separately) to the company's chosen inbox
    if (c.status !== 'signed' || !c.pdf || !c.pdf.path || !c.pdf.path.startsWith(`companies/${cid}/contracts/${m.contractId}/`)) return fail('The signed PDF isn’t ready.');
    const [buf] = await admin.storage().bucket().file(c.pdf.path).download();
    const att = [{ filename: clean(c.pdf.name, 120) || 'Signed contract.pdf', content: buf.toString('base64') }];
    const ids = [];
    ids.push(await resend({ from, to: [c.clientEmail], ...(reply ? { reply_to: reply } : {}),
      subject: `Your signed contract with ${name}`,
      text: `Hi ${first},\n\nThank you for signing. Your signed contract is attached as a PDF. Please keep it for your records.\n\nIf anything looks wrong, reply to this email.\n\n${name}\n\nSent with SiteToFit`, attachments: att }));
    const set = await db.doc(`companies/${cid}/contractSettings/main`).get();
    const copy = set.exists ? clean(set.data().copyEmail, 120) : '';
    if (copy && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(copy)) {
      ids.push(await resend({ from, to: [copy], subject: `Signed contract: ${clean(c.clientName)} (${clean([c.orderNo, c.quoteNo].filter(Boolean).join(' / '))})`,
        text: `${clean(c.clientName)} signed their contract on ${fmtWhen(c.signedAt)}. The signed PDF is attached and saved on the client’s file in SiteToFit.\n\nSalesperson: ${clean(c.salesName)}`, attachments: att }));
    }
    return ref.update({ status: 'sent', sentAt: Date.now(), providerId: ids.join(',') });
  } catch (e) { await fail(e.message || e); }
});

// ---------------------------------------------------------------------------------------------------------------
// Upload PDF + AI conversion (Claude API). Only the company's owner or office can call it, only for their own
// company's uploaded file. It returns a draft; the app shows it for review and nothing is used until approved.
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const ANTHROPIC_KEY = defineSecret('ANTHROPIC_KEY');
const FIELD_LIST = ['Date', 'Company', 'Client name', 'ID card', 'Address', 'Order / quote no.', 'Sales order no.', 'Quote no.', 'System', 'Total price', 'Salesperson'];
exports.convertContract = onCall({ region: 'europe-west1', secrets: [ANTHROPIC_KEY], timeoutSeconds: 540, memory: '1GiB' }, async (req) => {
  const uid = req.auth && req.auth.uid; const { cid, path } = req.data || {};
  if (!uid) throw new HttpsError('unauthenticated', 'Please sign in.');
  const db = admin.firestore();
  const [me, sa] = await Promise.all([db.doc(`users/${uid}`).get(), db.doc(`superadmins/${uid}`).get()]);
  const ok = sa.exists || (me.exists && me.data().companyId === cid && ['owner', 'office'].includes(me.data().role) && me.data().active !== false);
  if (!ok) throw new HttpsError('permission-denied', 'Only the owner or office can convert contracts.');
  if (typeof path !== 'string' || !path.startsWith(`companies/${cid}/contract-uploads/`) || !path.endsWith('.pdf')) throw new HttpsError('invalid-argument', 'Upload the PDF again.');
  const file = admin.storage().bucket().file(path);
  const [meta] = await file.getMetadata();
  if (Number(meta.size) > 15 * 1024 * 1024) throw new HttpsError('invalid-argument', 'That PDF is over 15 MB.');
  const [buf] = await file.download();
  const instructions = `This PDF is a company's sales contract, possibly followed by its terms and conditions or company policy.
Do three things:
1. Split it into two parts: "contract" (the agreement itself) and "policy" (general terms and conditions, company policy, warranty, cancellation, privacy and similar standing rules). If there is no separate policy part, return an empty policy.
2. Copy the wording exactly as written. Do not add, remove, summarise or reword any legal text. Keep headings and numbered clauses. Use plain text: one blank line between paragraphs, no markdown.
3. Wherever the contract has a blank to fill in for each sale (lines of underscores or dots, empty boxes, "[ ]", "Name: ______", sample values clearly meant to be replaced), replace it with exactly one of these fields written as {{Field}}: ${FIELD_LIST.map((f) => `{{${f}}}`).join(', ')}. Only use a field when it clearly matches. Leave signature lines out; signatures are added separately.
Reply with JSON only, no other text, in this shape:
{"contract": "...", "policy": "...", "fields": ["Field names you used"], "contractPages": "e.g. Pages 1–5", "policyPages": "e.g. Pages 6–8 or empty", "pages": number, "notes": "one short sentence on anything the company should check, or empty"}`;
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': ANTHROPIC_KEY.value(), 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: 'claude-sonnet-5-5', max_tokens: 24000, messages: [{ role: 'user', content: [{ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: buf.toString('base64') } }, { type: 'text', text: instructions }] }] }),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) { console.error('anthropic', res.status, out); throw new HttpsError('internal', 'The AI service couldn’t read that PDF. Try again, or write the contract in the app.'); }
  const text = (out.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
  const json = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
  let r; try { r = JSON.parse(json); } catch (e) { throw new HttpsError('internal', 'The AI’s answer couldn’t be read. Try again.'); }
  const fields = (Array.isArray(r.fields) ? r.fields : []).filter((f) => FIELD_LIST.includes(f));
  return { contract: String(r.contract || '').slice(0, 200000), policy: String(r.policy || '').slice(0, 200000), fields, contractPages: String(r.contractPages || ''), policyPages: String(r.policyPages || ''), pages: Number(r.pages) || null, notes: String(r.notes || '').slice(0, 400), truncated: out.stop_reason === 'max_tokens' };
});
