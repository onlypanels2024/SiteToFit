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

// ---------- In-app Help assistant + help requests to SiteToFit ----------
const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const { GUIDE } = require('./help-guide.js');
const NTFY_TOPIC = 'sitetofit-quotes-836cbad082d3'; // same private alert channel as the website (Gary's phone)
const ROLE_LABEL = { owner: 'Owner / manager', office: 'Office', sales: 'Salesperson', store: 'Store keeper', team: 'Installer team', staff: 'Staff' };
const PACKS = { sales: 'Sales app', store: 'Store', targets: 'Targets & report', payroll: 'Rota & payroll', contracts: 'Digital contracts' };

exports.helpChat = onCall({ region: 'europe-west1', secrets: [ANTHROPIC_KEY], timeoutSeconds: 60 }, async (req) => {
  const uid = req.auth && req.auth.uid;
  if (!uid) throw new HttpsError('unauthenticated', 'Please sign in.');
  const db = admin.firestore();
  const prof = (await db.doc('users/' + uid).get()).data();
  if (!prof || !prof.companyId) throw new HttpsError('permission-denied', 'Your login isn’t linked to a company.');
  const comp = (await db.doc('companies/' + prof.companyId).get()).data() || {};
  // Daily limit per person, so costs can't run away.
  const day = new Date().toISOString().slice(0, 10);
  const cRef = db.doc('helpUsage/' + uid + '_' + day);
  const used = await db.runTransaction(async (tx) => { const s = await tx.get(cRef); const n = ((s.exists && s.data().n) || 0) + 1; tx.set(cRef, { n, uid, day }); return n; });
  if (used > 60) return { text: 'You’ve reached today’s limit for the assistant. Tap “Send to SiteToFit support” and Gary will help you.', handoff: true };
  const msgs = (Array.isArray(req.data && req.data.messages) ? req.data.messages : []).slice(-16)
    .map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.text || '').slice(0, 2000) }))
    .filter((m) => m.content.trim());
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== 'user') throw new HttpsError('invalid-argument', 'Type your question first.');
  const packs = Object.keys(PACKS).filter((k) => comp.features && comp.features[k]).map((k) => PACKS[k]);
  const system = 'You are the Help assistant inside the SiteToFit app. You help people at a company that uses SiteToFit to use the app, using only the guide below.\n'
    + 'The person: role ' + (ROLE_LABEL[prof.role] || 'unknown') + ', company "' + clean(comp.name, 60) + '". Optional parts this company has switched on: ' + (packs.join(', ') || 'none') + '. Only explain parts they have; if they ask about one they don’t have, say it is an optional part SiteToFit can switch on.\n'
    + 'They are on the screen: ' + clean(req.data && req.data.page, 40) + '.\n'
    + 'Rules:\n- Answer only from the guide. Never invent buttons, features, prices or promises. Use the exact button names from the guide in quotes.\n'
    + '- Short, clear steps: 1 to 5 short lines or numbered steps. Plain friendly language. No emojis.\n- Reply in the person’s language (English or Maltese).\n'
    + '- If the guide doesn’t cover it, it needs SiteToFit to change something, it looks like a fault or missing data, or the person asks for a human: say briefly that SiteToFit support (Gary) will need to help, and end your reply with the exact text [[HANDOFF]].\n'
    + '- You can’t see or change their data. Never ask for passwords, card numbers or ID card numbers.\n- Only help with SiteToFit; politely decline anything else. You are an AI assistant; say so if asked.\n'
    + 'GUIDE:\n' + GUIDE;
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': ANTHROPIC_KEY.value(), 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: 'claude-haiku-5-5', max_tokens: 700, system, messages: msgs }),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) { console.error('anthropic', res.status, out); throw new HttpsError('internal', 'The assistant isn’t available right now. Tap “Send to SiteToFit support” instead.'); }
  let text = (out.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
  const handoff = text.includes('[[HANDOFF]]');
  text = text.replace(/\[\[HANDOFF\]\]/g, '').trim();
  return { text: text || 'Sorry, I couldn’t answer that. Tap “Send to SiteToFit support”.', handoff };
});

// Phone alert to Gary when a help request arrives or the person writes again. No personal details are sent.
exports.helpAlert = onDocumentWritten({ document: 'support/{id}', region: 'europe-west1', secrets: [RESEND_KEY], retry: false }, async (ev) => {
  const before = ev.data.before.exists ? ev.data.before.data() : null;
  const after = ev.data.after.exists ? ev.data.after.data() : null;
  if (!after) return;
  const nb = before ? (before.messages || []).length : 0;
  const na = (after.messages || []).length;
  if (na <= nb) return;
  const last = (after.messages || [])[na - 1] || {};
  // Gary replied: email the person too, in case they don't open Help straight away. The address comes from their login, not the request.
  if (last.from === 'support') {
    try {
      const u = await admin.auth().getUser(after.uid);
      if (!u.email) return;
      const comp = (await admin.firestore().doc('companies/' + after.cid).get()).data() || {};
      const link = SITE + (comp.slug ? '/c/' + comp.slug : '/app/');
      const esc = (t) => String(t || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
      const subj = clean(after.subject, 70);
      await resend({
        from: 'SiteToFit Support <support@siteto.fit>', to: [u.email], reply_to: 'gary.falzon2104@gmail.com',
        subject: 'SiteToFit replied: ' + (subj || 'your help request'),
        text: 'Hi ' + clean(after.name, 40) + ',\n\nGary from SiteToFit replied to your help request' + (subj ? ' "' + subj + '"' : '') + ':\n\n' + String(last.text || '') + '\n\nTo answer, open SiteToFit and tap Help, then My requests: ' + link + '\n\nSiteToFit',
        html: '<div style="font-family:Arial,sans-serif;font-size:15px;color:#18212b;max-width:560px"><p>Hi ' + esc(clean(after.name, 40)) + ',</p><p>Gary from SiteToFit replied to your help request' + (subj ? ' <b>“' + esc(subj) + '”</b>' : '') + ':</p><div style="border-left:4px solid #c5f135;background:#f4f2ff;padding:12px 14px;border-radius:8px;white-space:pre-wrap">' + esc(last.text) + '</div><p>To answer, open SiteToFit and tap <b>Help</b>, then <b>My requests</b>.</p><p><a href="' + link + '" style="display:inline-block;background:#3a17c4;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold">Open SiteToFit</a></p><p style="color:#5b6672;font-size:13px">SiteToFit · siteto.fit</p></div>',
      });
    } catch (e) { console.error('help reply email', e); }
    return;
  }
  if (last.from !== 'user' || after.lastFrom !== 'user') return;
  const isNew = !before;
  await fetch('https://ntfy.sh/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ topic: NTFY_TOPIC, title: isNew ? 'New SiteToFit help request' : 'New reply on a SiteToFit help request', message: 'A customer needs help in the app. Tap to open Help requests on your control dashboard.', tags: ['sos'], priority: isNew ? 4 : 3, click: SITE + '/app/#/admin/help/' + ev.params.id }),
  }).catch((e) => console.error('ntfy', e));
});

// ---------------------------------------------------------------------------------------------------------------
// Quotes pack: emailing a quote to its client, and telling the company when the client accepts or declines online.
// As with contracts, the app only says which quote; this checks it and writes the email itself.
const { onDocumentUpdated } = require('firebase-functions/v2/firestore');
const euro2 = (n) => '€' + (Math.round((Number(n) || 0) * 100) / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const dayText = (iso) => (iso ? new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Malta' }) : '');
const companyInbox = (c) => clean((c.invoice && c.invoice.email) || (c.contact && c.contact.email), 120);

exports.sendQuoteMail = onDocumentCreated({ document: 'companies/{cid}/mail/{id}', region: 'europe-west1', secrets: [RESEND_KEY], retry: false }, async (ev) => {
  const ref = ev.data.ref; const m = ev.data.data(); const { cid } = ev.params;
  if (!m || m.status !== 'queued' || m.kind !== 'quote-link' || !m.quoteId) return;
  const fail = (msg) => ref.update({ status: 'error', error: String(msg).slice(0, 300), doneAt: Date.now() });
  try {
    const db = admin.firestore();
    const [co, qd] = await Promise.all([db.doc(`companies/${cid}`).get(), db.doc(`companies/${cid}/quotes/${m.quoteId}`).get()]);
    if (!co.exists || !qd.exists) return fail('Quote not found.');
    const q = qd.data(); const comp = co.data(); const name = clean((comp.invoice && comp.invoice.legalName) || comp.name);
    if (!q.clientEmail || q.clientEmail.toLowerCase() !== String(m.to).toLowerCase()) return fail('The email address doesn’t match the quote.');
    if (q.status !== 'sent' || !q.token || q.token !== m.token) return fail('This quote isn’t waiting to be sent.');
    const ln = await db.doc(`quoteLinks/${q.token}`).get();
    if (!ln.exists || ln.data().cid !== cid || ln.data().quoteId !== m.quoteId) return fail('The quote link is missing.');
    if (!q.pdf || !q.pdf.path || !q.pdf.path.startsWith(`companies/${cid}/quotes/${m.quoteId}/`)) return fail('The quote PDF isn’t ready.');
    const [buf] = await admin.storage().bucket().file(q.pdf.path).download();
    const reply = companyInbox(comp);
    const first = clean(q.clientName).split(' ')[0];
    const link = `${SITE}/quote/?t=${q.token}`;
    const id = await resend({ from: `${clean(comp.name)} <quotes@siteto.fit>`, to: [q.clientEmail], ...(reply ? { reply_to: reply } : {}),
      subject: `Quote ${clean(q.no, 30)} from ${name}`,
      text: `Hi ${first},\n\nThank you for your interest. Your quote ${clean(q.no, 30)}${q.subject ? ` (${clean(q.subject, 120)})` : ''} for ${euro2(q.total)} is attached as a PDF.\n\nYou can also view it online and accept or decline it here:\n\n${link}\n\n${q.validUntil ? `This quote is valid until ${dayText(q.validUntil)}.\n\n` : ''}If you have any questions, reply to this email.\n\n${name}\n\nSent with SiteToFit`,
      attachments: [{ filename: `Quote ${clean(q.no, 30)}.pdf`, content: buf.toString('base64') }] });
    return ref.update({ status: 'sent', sentAt: Date.now(), providerId: id });
  } catch (e) { await fail(e.message || e); }
});

// The client accepted or declined on the link: record it on the quote (even if nobody has the app open) and email the company.
exports.quoteAnswered = onDocumentUpdated({ document: 'quoteLinks/{token}', region: 'europe-west1', secrets: [RESEND_KEY], retry: false }, async (ev) => {
  const before = ev.data.before.data(); const after = ev.data.after.data(); const { token } = ev.params;
  if (!before || !after || before.status !== 'sent' || !['accepted', 'declined'].includes(after.status) || !after.cid || !after.quoteId) return;
  const db = admin.firestore();
  const qref = db.doc(`companies/${after.cid}/quotes/${after.quoteId}`);
  const qd = await qref.get();
  if (!qd.exists || qd.data().token !== token || qd.data().status !== 'sent') return; // the office changed it, or it was answered already
  const acc = after.status === 'accepted';
  await qref.update(acc
    ? { status: 'accepted', acceptedAt: after.acceptedAt || Date.now(), acceptName: clean(after.acceptName), answeredOnline: true }
    : { status: 'declined', declinedAt: after.declinedAt || Date.now(), declineReason: String(after.declineReason || '').slice(0, 600), answeredOnline: true });
  const co = await db.doc(`companies/${after.cid}`).get();
  const to = co.exists ? companyInbox(co.data()) : '';
  if (!to || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) return;
  const q = qd.data();
  try {
    await resend({ from: 'SiteToFit <quotes@siteto.fit>', to: [to],
      subject: acc ? `Quote ${clean(q.no, 30)} accepted by ${clean(q.clientName)}` : `Quote ${clean(q.no, 30)} declined by ${clean(q.clientName)}`,
      text: acc
        ? `Good news: ${clean(after.acceptName) || clean(q.clientName)} accepted quote ${clean(q.no, 30)} (${euro2(q.total)}) online on ${fmtWhen(after.acceptedAt || Date.now())}.\n\nOpen Quotes in SiteToFit to turn it into a sale, an invoice or both.`
        : `${clean(q.clientName)} declined quote ${clean(q.no, 30)} (${euro2(q.total)}) online on ${fmtWhen(after.declinedAt || Date.now())}.${after.declineReason ? `\n\nReason given: ${clean(after.declineReason, 600)}` : ''}\n\nYou can edit the quote in SiteToFit and send a new version.` });
  } catch (e) { console.warn('quote alert email', e.message || e); }
});

// ---------------------------------------------------------------------------------------------------------------
// POS pack: card payments through Stripe Connect. Each client company connects its own Stripe account (Stripe sets
// its fees and pays it out); SiteToFit creates a payment page for each payment and Stripe tells us when it's paid.
// Secrets (Gary sets them himself): STRIPE_SECRET (SiteToFit's platform secret key) and STRIPE_WEBHOOK_SECRET
// (signing secret of the Connect webhook endpoint pointing at stripeWebhook).
const { onRequest } = require('firebase-functions/v2/https');
const STRIPE_SECRET = defineSecret('STRIPE_SECRET');
const STRIPE_WEBHOOK_SECRET = defineSecret('STRIPE_WEBHOOK_SECRET');
const stripeClient = () => require('stripe')(STRIPE_SECRET.value());
async function staffOf(req, cid, roles) {
  const uid = req.auth && req.auth.uid;
  if (!uid) throw new HttpsError('unauthenticated', 'Please sign in.');
  if (typeof cid !== 'string' || !cid) throw new HttpsError('invalid-argument', 'Company missing.');
  const db = admin.firestore();
  const [me, sa] = await Promise.all([db.doc(`users/${uid}`).get(), db.doc(`superadmins/${uid}`).get()]);
  const ok = sa.exists || (me.exists && me.data().companyId === cid && roles.includes(me.data().role) && me.data().active !== false);
  if (!ok) throw new HttpsError('permission-denied', 'You can’t do this for this company.');
  return uid;
}
const stripeState = (a) => ({ accountId: a.id, chargesEnabled: !!a.charges_enabled, payoutsEnabled: !!a.payouts_enabled, detailsSubmitted: !!a.details_submitted, country: a.country || '', checkedAt: Date.now() });

// The owner connects (or finishes connecting) the company's Stripe account. Returns Stripe's set-up page.
exports.stripeConnect = onCall({ region: 'europe-west1', secrets: [STRIPE_SECRET] }, async (req) => {
  const { cid, country } = req.data || {};
  await staffOf(req, cid, ['owner']);
  const stripe = stripeClient(); const db = admin.firestore();
  const cref = db.doc(`companies/${cid}`); const co = (await cref.get()).data() || {};
  let accountId = co.stripe && co.stripe.accountId;
  if (!accountId) {
    const acct = await stripe.accounts.create({
      country: ['MT', 'IE', 'GB'].includes(country) ? country : 'MT',
      email: clean((co.invoice && co.invoice.email) || (co.contact && co.contact.email), 120) || undefined,
      business_profile: { name: clean(co.name, 100) || undefined },
      controller: { fees: { payer: 'account' }, losses: { payments: 'stripe' }, stripe_dashboard: { type: 'full' } },
      metadata: { cid },
    });
    accountId = acct.id;
    await cref.update({ stripe: stripeState(acct) });
  }
  const link = await stripe.accountLinks.create({ account: accountId, type: 'account_onboarding', refresh_url: `${SITE}/app/#/pos`, return_url: `${SITE}/app/#/pos` });
  return { url: link.url };
});

// Checks whether the company's Stripe account can take card payments yet.
exports.stripeStatus = onCall({ region: 'europe-west1', secrets: [STRIPE_SECRET] }, async (req) => {
  const { cid } = req.data || {};
  await staffOf(req, cid, ['owner', 'office']);
  const cref = admin.firestore().doc(`companies/${cid}`); const co = (await cref.get()).data() || {};
  if (!co.stripe || !co.stripe.accountId) return { chargesEnabled: false };
  const acct = await stripeClient().accounts.retrieve(co.stripe.accountId);
  const s = stripeState(acct); await cref.update({ stripe: s });
  return { chargesEnabled: s.chargesEnabled };
});

// Creates the Stripe payment page for one POS payment, on the company's own Stripe account.
exports.posCheckout = onCall({ region: 'europe-west1', secrets: [STRIPE_SECRET] }, async (req) => {
  const { cid, tillId } = req.data || {};
  await staffOf(req, cid, ['owner', 'office']);
  const db = admin.firestore();
  const [co, td] = await Promise.all([db.doc(`companies/${cid}`).get(), db.doc(`companies/${cid}/tills/${tillId}`).get()]);
  const acct = co.exists && co.data().stripe;
  if (!acct || !acct.chargesEnabled) throw new HttpsError('failed-precondition', 'Card payments aren’t switched on yet. Connect Stripe in POS settings.');
  if (!td.exists) throw new HttpsError('not-found', 'Payment not found.');
  const t = td.data();
  if (t.status !== 'pending' || t.method !== 'card') throw new HttpsError('failed-precondition', 'This payment isn’t waiting for a card payment.');
  const cents = Math.round(Number(t.total) * 100);
  if (!(cents >= 50)) throw new HttpsError('invalid-argument', 'Card payments must be at least €0.50.');
  const name = clean(co.data().name, 80);
  const session = await stripeClient().checkout.sessions.create({
    mode: 'payment',
    line_items: [{ quantity: 1, price_data: { currency: 'eur', unit_amount: cents, product_data: { name: `${name} · ${clean(t.no, 20)}`, description: clean((t.ref && t.ref.label) || 'Payment', 120) } } }],
    customer_email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t.email || '') ? t.email : undefined,
    payment_intent_data: { description: `${name} ${clean(t.no, 20)}`, metadata: { cid, tillId } },
    metadata: { cid, tillId },
    success_url: `${SITE}/paid/?c=${encodeURIComponent(name)}`,
    cancel_url: `${SITE}/paid/?c=${encodeURIComponent(name)}&cancel=1`,
  }, { stripeAccount: acct.accountId });
  await td.ref.update({ stripe: { url: session.url, sessionId: session.id, accountId: acct.accountId } });
  return { url: session.url, sessionId: session.id };
});

// ---- Tap to Pay (SiteToFit Android app): the staff phone itself reads the client's card or phone over NFC. ----
// The phone asks for a short-lived token, we create the payment on the company's own Stripe account, the phone
// collects the card, then terminalConfirm (and the webhook, as a backup) marks the payment as paid.
async function tapCompany(req, cid) {
  await staffOf(req, cid, ['owner', 'office']);
  const cref = admin.firestore().doc(`companies/${cid}`); const co = await cref.get();
  const acct = co.exists && co.data().stripe;
  if (!acct || !acct.chargesEnabled) throw new HttpsError('failed-precondition', 'Card payments aren’t switched on yet. Connect Stripe in POS settings.');
  return { cref, co: co.data(), acct };
}
async function tapMarkPaid(cid, tillId, pi, account) {
  const db = admin.firestore(); const tref = db.doc(`companies/${cid}/tills/${tillId}`);
  return db.runTransaction(async (tx) => {
    const td = await tx.get(tref); if (!td.exists) return false;
    const t = td.data();
    if (t.status === 'paid') return true;
    if (t.status !== 'pending' || !t.stripe || t.stripe.tapIntent !== pi.id || account !== t.stripe.accountId) return false;
    const amount = (pi.amount_received || pi.amount || 0) / 100;
    let jref = null; let j = null;
    if (t.ref && t.ref.kind === 'job' && t.ref.id) { jref = db.doc(`companies/${cid}/jobs/${t.ref.id}`); const jd = await tx.get(jref); j = jd.exists ? jd.data() : null; }
    tx.update(tref, { status: 'paid', paidAt: Date.now(), stripe: { ...t.stripe, paymentIntent: pi.id, amountPaid: amount, tap: true } });
    if (j && !(j.payments || []).some((p) => p.tillId === tillId)) {
      tx.update(jref, { paid: (Number(j.paid) || 0) + amount, payments: [...(j.payments || []), { amount, at: Date.now(), method: 'card', note: `Card (Tap to Pay) · receipt ${t.no}`, tillId }] });
    }
    return true;
  });
}

// The Android app asks for this each time Stripe's card reader software needs to sign in.
exports.terminalToken = onCall({ region: 'europe-west1', secrets: [STRIPE_SECRET] }, async (req) => {
  const { cid } = req.data || {};
  const { acct } = await tapCompany(req, cid);
  const tok = await stripeClient().terminal.connectionTokens.create({}, { stripeAccount: acct.accountId });
  return { secret: tok.secret };
});

// Prepares one Tap to Pay payment: makes sure the company has a Stripe "location" (its address), then creates the payment.
exports.terminalIntent = onCall({ region: 'europe-west1', secrets: [STRIPE_SECRET] }, async (req) => {
  const { cid, tillId } = req.data || {};
  const { cref, co, acct } = await tapCompany(req, cid);
  const db = admin.firestore(); const stripe = stripeClient();
  const td = await db.doc(`companies/${cid}/tills/${tillId}`).get();
  if (!td.exists) throw new HttpsError('not-found', 'Payment not found.');
  const t = td.data();
  if (t.status !== 'pending' || t.method !== 'card') throw new HttpsError('failed-precondition', 'This payment isn’t waiting for a card payment.');
  const cents = Math.round(Number(t.total) * 100);
  if (!(cents >= 50)) throw new HttpsError('invalid-argument', 'Card payments must be at least €0.50.');
  const name = clean(co.name, 80);
  let locationId = co.terminal && co.terminal.accountId === acct.accountId ? co.terminal.locationId : '';
  if (!locationId) {
    const ps = await db.doc(`companies/${cid}/posSettings/main`).get();
    const a = (ps.exists && ps.data().tap) || {};
    const line1 = clean(a.line1, 100); const city = clean(a.city, 60); const postcode = clean(a.postcode, 20);
    if (!line1 || !city || !postcode) throw new HttpsError('failed-precondition', 'Add your business address under “Tap to Pay” in POS settings first.');
    const loc = await stripe.terminal.locations.create({ display_name: name || 'Main', address: { line1, city, postal_code: postcode, country: acct.country || 'MT' } }, { stripeAccount: acct.accountId });
    locationId = loc.id;
    await cref.update({ terminal: { locationId, accountId: acct.accountId } });
  }
  const pi = await stripe.paymentIntents.create({
    amount: cents, currency: 'eur', payment_method_types: ['card_present'], capture_method: 'automatic',
    description: `${name} ${clean(t.no, 20)}`, metadata: { cid, tillId, tap: '1' },
  }, { stripeAccount: acct.accountId });
  await td.ref.update({ 'stripe.tapIntent': pi.id, 'stripe.accountId': acct.accountId });
  return { clientSecret: pi.client_secret, intentId: pi.id, locationId };
});

// After the phone says the card went through, check with Stripe and mark the payment as paid.
exports.terminalConfirm = onCall({ region: 'europe-west1', secrets: [STRIPE_SECRET] }, async (req) => {
  const { cid, tillId } = req.data || {};
  const { acct } = await tapCompany(req, cid);
  const td = await admin.firestore().doc(`companies/${cid}/tills/${tillId}`).get();
  if (!td.exists) throw new HttpsError('not-found', 'Payment not found.');
  const t = td.data();
  if (t.status === 'paid') return { paid: true };
  if (!t.stripe || !t.stripe.tapIntent) return { paid: false };
  const pi = await stripeClient().paymentIntents.retrieve(t.stripe.tapIntent, { stripeAccount: acct.accountId });
  if (pi.status !== 'succeeded') return { paid: false, status: pi.status };
  return { paid: await tapMarkPaid(cid, tillId, pi, acct.accountId) };
});

// Stripe calls this when a client has paid (Connect webhook: checkout.session.completed, account.updated and, for Tap to Pay, payment_intent.succeeded).
exports.stripeWebhook = onRequest({ region: 'europe-west1', secrets: [STRIPE_SECRET, STRIPE_WEBHOOK_SECRET] }, async (req, res) => {
  let ev;
  try { ev = stripeClient().webhooks.constructEvent(req.rawBody, req.headers['stripe-signature'], STRIPE_WEBHOOK_SECRET.value()); }
  catch (e) { res.status(400).send('Bad signature'); return; }
  const db = admin.firestore();
  try {
    if (ev.type === 'checkout.session.completed' && ev.data.object.payment_status === 'paid') {
      const s = ev.data.object; const { cid, tillId } = s.metadata || {};
      if (cid && tillId) {
        const tref = db.doc(`companies/${cid}/tills/${tillId}`);
        await db.runTransaction(async (tx) => {
          const td = await tx.get(tref); if (!td.exists) return;
          const t = td.data();
          if (t.status === 'paid' || !t.stripe || t.stripe.sessionId !== s.id || ev.account !== t.stripe.accountId) return;
          const amount = (s.amount_total || 0) / 100;
          let jref = null; let j = null;
          if (t.ref && t.ref.kind === 'job' && t.ref.id) { jref = db.doc(`companies/${cid}/jobs/${t.ref.id}`); const jd = await tx.get(jref); j = jd.exists ? jd.data() : null; }
          tx.update(tref, { status: 'paid', paidAt: Date.now(), stripe: { ...t.stripe, paymentIntent: s.payment_intent || '', amountPaid: amount } });
          if (j && !(j.payments || []).some((p) => p.tillId === tillId)) {
            tx.update(jref, { paid: (Number(j.paid) || 0) + amount, payments: [...(j.payments || []), { amount, at: Date.now(), method: 'card', note: `Card · receipt ${t.no}`, tillId }] });
          }
        });
      }
    }
    if (ev.type === 'payment_intent.succeeded') {
      const pi = ev.data.object; const { cid, tillId, tap } = pi.metadata || {};
      if (cid && tillId && tap === '1') await tapMarkPaid(cid, tillId, pi, ev.account);
    }
    if (ev.type === 'account.updated') {
      const a = ev.data.object; const cid = a.metadata && a.metadata.cid;
      if (cid) { const cref = db.doc(`companies/${cid}`); const co = await cref.get(); if (co.exists && co.data().stripe && co.data().stripe.accountId === a.id) await cref.update({ stripe: stripeState(a) }); }
    }
    res.json({ received: true });
  } catch (e) { console.error('stripeWebhook', e); res.status(500).send('Error'); }
});
