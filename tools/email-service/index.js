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

// ---- "Ask us" pack: the company's own assistant page (siteto.fit/ask/?c=…). Answers a new customer from what
// the company wrote about itself, takes their details, and can book a site visit straight into the calendar.
// No sign-in: anyone with the link can use it, so everything here is rate limited and kept small. ----

const DAYNAME = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const isoDay = (iso) => new Date(iso + 'T12:00:00').getDay();
const addDays = (n) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);

// Days the company could see someone, skipping days that are already full.
async function freeDays(cid, set) {
  const days = String(set.slotDays || '1,2,3,4,5').split(',').filter((x) => x !== '');
  const perDay = Math.max(1, Math.min(20, Number(set.perDay) || 3));
  const from = addDays(1); const to = addDays(21);
  const snap = await admin.firestore().collection(`companies/${cid}/visits`).where('date', '>=', from).where('date', '<=', to).get();
  const used = {};
  snap.forEach((d) => { const v = d.data(); if (v.status !== 'cancelled') used[v.date] = (used[v.date] || 0) + 1; });
  const out = [];
  for (let i = 1; i <= 21 && out.length < 6; i++) {
    const iso = addDays(i);
    if (!days.includes(String(isoDay(iso)))) continue;
    if ((used[iso] || 0) >= perDay) continue;
    out.push(iso);
  }
  return out;
}

// ---------------------------------------------------------------------------
// The assistant that talks to the public — on the company's "Ask us" page, and by text message after a missed
// call. Same brain either way: it answers only from what the company wrote about itself, gets the person's name
// and number, and can book a site visit. One place, so the two packs can never drift apart.
// ---------------------------------------------------------------------------
async function runAssistant(o) {
  const { db, cid, comp, set, msgs, chatRef, chat, chatId, source, idKey } = o;
  const alreadyBooked = !!(chat && chat.visitId);
  const slots = set.bookVisits !== false && !alreadyBooked ? await freeDays(cid, set) : [];
  const byText = o.where === 'text';

  const system = 'You are the assistant for "' + clean(comp.name, 60) + '", a company in Malta. You are talking to someone who may become a customer'
    + (byText ? ', by text message, because they rang and nobody could get to the phone.\n' : ' on the company’s public page.\n')
    + 'WHAT THE COMPANY TOLD YOU ABOUT ITSELF (your only source about them):\n"""\n' + clean(set.about, 1500) + '\n"""\n'
    + (set.areas ? 'Areas they cover: ' + clean(set.areas, 200) + '\n' : '')
    + (set.hours ? 'Opening hours: ' + clean(set.hours, 120) + '\n' : '')
    + (set.phone ? 'Their phone: ' + clean(set.phone, 40) + '\n' : '')
    + 'Rules:\n'
    + (byText
      ? '- This is SMS. Keep every reply under 300 characters, one or two sentences. No emojis, no links unless the company gave you one. Reply in the person’s language (English or Maltese).\n'
        + '- They already rang, so they want something. Find out what, and get their name. You already have their number.\n'
      : '- Warm, short, plain language. Two or three sentences at a time. No emojis. Reply in the person’s language (English or Maltese).\n'
        + '- Your job is to get their name, phone number and what they need. Ask for one thing at a time, naturally, not as a form.\n')
    + '- Answer ONLY from what the company told you. Never invent prices, timescales, products or promises. If you do not know, say so plainly and offer to have someone call them.\n'
    + (slots.length
      ? '- They can book a free site visit. Days you may offer: ' + slots.map((d) => DAYNAME[isoDay(d)] + ' ' + d).join(', ') + '. Times you may offer: ' + clean(set.slotTimes || 'Morning, Afternoon', 120) + '. Only offer these.\n'
      : '- You cannot book anything here; offer to have someone call them instead.\n')
    + '- You are an assistant, not a person; say so if asked. Never ask for card numbers, ID card numbers or passwords.\n'
    + '- Decline anything not about this company and its work.\n'
    + 'ALWAYS end your reply with one line of JSON on its own, no code fences:\n'
    + '[[DATA]]{"name":"","phone":"","what":"","address":"","date":"","time":"","book":false}\n'
    + 'Fill only what the person actually told you; leave the rest empty. "date" must be one of the days offered, in YYYY-MM-DD. '
    + 'Set "book" to true only when they have agreed to a visit AND you have their name, phone and a date from the list.';

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': ANTHROPIC_KEY.value(), 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: 'claude-haiku-5-5', max_tokens: byText ? 300 : 600, system, messages: msgs }),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) { console.error('anthropic assistant', res.status, out); throw new HttpsError('internal', 'The assistant isn’t available right now.'); }
  let text = (out.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
  let data = {};
  const cut = text.lastIndexOf('[[DATA]]');
  if (cut >= 0) { try { data = JSON.parse(text.slice(cut + 8).trim()) || {}; } catch (e) { data = {}; } text = text.slice(0, cut).trim(); }
  if (!text) text = 'Sorry, could you say that again?';

  const name = clean(data.name, 80); const phone = clean(o.knownPhone || data.phone, 40); const what = clean(data.what, 300); const address = clean(data.address, 200);
  const nowMsgs = [...msgs.map((m) => ({ role: m.role, text: m.content, at: Date.now() })), { role: 'assistant', text, at: Date.now() }].slice(-40);
  const base = { cid, at: (chat && chat.at) || Date.now(), name, phone, what, address, messages: nowMsgs, updatedAt: Date.now(), ...(o.extra || {}) };

  // Book the visit only when the model says so and we really have what we need.
  let booked = null;
  const wantsBook = !!data.book && !alreadyBooked && slots.includes(String(data.date || '')) && phone && name;
  if (wantsBook) {
    const time = clean(data.time, 40);
    const client = await db.collection(`companies/${cid}/clients`).add({ name, phone, address, source, createdAt: Date.now() });
    const visit = await db.collection(`companies/${cid}/visits`).add({
      clientId: client.id, clientName: name, phone, address, what: what || 'Enquiry from the assistant',
      date: data.date, time, status: 'booked', note: '', files: [], createdAt: Date.now(), source, [idKey]: chatId,
    });
    const lead = await db.collection(`companies/${cid}/leads`).add({
      name, phone, address, what, source, status: 'visit', clientId: client.id,
      nextStep: 'Site visit booked', nextDate: data.date, createdAt: Date.now(), [idKey]: chatId,
    });
    await chatRef.set({ ...base, status: 'new', visitId: visit.id, leadId: lead.id, clientId: client.id }, { merge: true });
    booked = { visit: true, date: data.date, time };
  } else {
    // No booking yet: still keep the enquiry, and make the lead as soon as there is a number to call back.
    let leadId = chat && chat.leadId;
    if (!leadId && phone && name) {
      const lead = await db.collection(`companies/${cid}/leads`).add({
        name, phone, address, what, source, status: 'open', nextStep: 'Call back', nextDate: addDays(1), createdAt: Date.now(), [idKey]: chatId,
      });
      leadId = lead.id;
      booked = { visit: false };
    }
    await chatRef.set({ ...base, status: (chat && chat.status) || 'new', ...(leadId ? { leadId } : {}) }, { merge: true });
  }
  return { reply: text, booked };
}

// Two limits, so a stranger can't run up a bill: per conversation, and per company per day.
function shapeMessages(messages) {
  const msgs = (Array.isArray(messages) ? messages : []).slice(-20)
    .map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.text || '').slice(0, 800) }))
    .filter((m) => m.content.trim());
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  return msgs;
}
async function dayBudget(cid) {
  const day = new Date().toISOString().slice(0, 10);
  const cRef = admin.firestore().doc(`askUsage/${cid}_${day}`);
  return admin.firestore().runTransaction(async (tx) => { const d = await tx.get(cRef); const n = ((d.exists && d.data().n) || 0) + 1; tx.set(cRef, { n, cid, day }); return n; });
}

exports.askChat = onCall({ region: 'europe-west1', secrets: [ANTHROPIC_KEY], timeoutSeconds: 60 }, async (req) => {
  const { token, chatId, messages } = req.data || {};
  if (!/^[a-f0-9]{48}$/.test(String(token || ''))) throw new HttpsError('invalid-argument', 'Bad link.');
  if (!/^[a-f0-9]{32}$/.test(String(chatId || ''))) throw new HttpsError('invalid-argument', 'Bad chat.');
  const db = admin.firestore();
  const linkSnap = await db.doc(`askLinks/${token}`).get();
  if (!linkSnap.exists || linkSnap.data().active === false) throw new HttpsError('not-found', 'This link isn’t working any more.');
  const { cid } = linkSnap.data();
  const comp = (await db.doc(`companies/${cid}`).get()).data() || {};
  if (!comp.features || !comp.features.aiask) throw new HttpsError('failed-precondition', 'This assistant is switched off.');
  const set = (await db.doc(`companies/${cid}/askSettings/main`).get()).data() || {};

  const msgs = shapeMessages(messages);
  if (!msgs.length || msgs[msgs.length - 1].role !== 'user') throw new HttpsError('invalid-argument', 'Say something first.');
  if (msgs.filter((m) => m.role === 'user').length > 40) throw new HttpsError('resource-exhausted', 'This chat is long. Please call us instead.');
  if (await dayBudget(cid) > 400) return { reply: 'We’ve had a lot of questions today. Please call or WhatsApp us and we’ll help you straight away.' };

  const chatRef = db.doc(`askChats/${chatId}`);
  const chat = (await chatRef.get()).data() || null;
  if (chat && chat.cid !== cid) throw new HttpsError('permission-denied', 'Bad chat.');
  return runAssistant({ db, cid, comp, set, msgs, chatRef, chat, chatId, source: 'Assistant', idKey: 'askChatId', where: 'page', extra: { token } });
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

// The receipt for a payment (a quote's deposit, or any POS payment): emailed to the client, office always copied.
exports.sendReceiptMail = onDocumentCreated({ document: 'companies/{cid}/mail/{id}', region: 'europe-west1', secrets: [RESEND_KEY], retry: false }, async (ev) => {
  const ref = ev.data.ref; const m = ev.data.data(); const { cid } = ev.params;
  if (!m || m.status !== 'queued' || m.kind !== 'receipt' || !m.tillId) return;
  const fail = (msg) => ref.update({ status: 'error', error: String(msg).slice(0, 300), doneAt: Date.now() });
  try {
    const db = admin.firestore();
    const [co, td] = await Promise.all([db.doc(`companies/${cid}`).get(), db.doc(`companies/${cid}/tills/${m.tillId}`).get()]);
    if (!co.exists || !td.exists) return fail('Payment not found.');
    const t = td.data(); const comp = co.data(); const name = clean((comp.invoice && comp.invoice.legalName) || comp.name);
    if (t.status !== 'paid') return fail('This payment hasn’t been paid.');
    if (!t.email || t.email.toLowerCase() !== String(m.to).toLowerCase()) return fail('The email address doesn’t match the payment.');
    if (!t.receipt || !t.receipt.path || !t.receipt.path.startsWith(`companies/${cid}/receipts/`)) return fail('The receipt PDF isn’t ready.');
    const [buf] = await admin.storage().bucket().file(t.receipt.path).download();
    const office = companyInbox(comp);
    const first = clean(t.clientName).split(' ')[0] || 'there';
    const what = t.ref && t.ref.kind === 'quote' ? `deposit on quote ${clean(t.ref.label, 40).replace(/^Deposit · /, '')}` : 'payment';
    const id = await resend({ from: `${clean(comp.name)} <receipts@siteto.fit>`, to: [t.email], ...(office && office.toLowerCase() !== t.email.toLowerCase() ? { cc: [office] } : {}), ...(office ? { reply_to: office } : {}),
      subject: `Receipt ${clean(t.no, 30)} from ${name}`,
      text: `Hi ${first},\n\nThank you for your ${what} of ${euro2(t.total)}, received by ${clean(t.method === 'card' ? 'card' : t.method === 'cash' ? 'cash' : 'bank transfer', 20)}.\n\nYour receipt ${clean(t.no, 30)} is attached as a PDF.\n\nIf you have any questions, reply to this email.\n\n${name}\n\nSent with SiteToFit`,
      attachments: [{ filename: `Receipt ${clean(t.no, 30)}.pdf`, content: buf.toString('base64') }] });
    return ref.update({ status: 'sent', sentAt: Date.now(), providerId: id, cc: office || '' });
  } catch (e) { await fail(e.message || e); }
});

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
// Accounts made the older way (Accounts v1). Kept so companies connected before the change keep working.
const stripeState = (a) => ({ accountId: a.id, chargesEnabled: !!a.charges_enabled, payoutsEnabled: !!a.payouts_enabled, detailsSubmitted: !!a.details_submitted, country: a.country || '', checkedAt: Date.now(), v: 1 });
// Accounts made the way Stripe now asks for (Accounts v2).
function stripeState2(a, country) {
  const cap = (((a.configuration || {}).merchant || {}).capabilities || {}).card_payments || {};
  const due = ((a.requirements || {}).entries || []).filter((e) => e && e.awaiting_action_from === 'user').length;
  return { accountId: a.id, chargesEnabled: cap.status === 'active', payoutsEnabled: cap.status === 'active', detailsSubmitted: !due,
    country: (a.identity && a.identity.country) || country || '', checkedAt: Date.now(), v: 2 };
}

// The owner connects (or finishes connecting) the company's Stripe account. Returns Stripe's set-up page.
// Turns a Stripe error into something the person reading the screen can act on.
function stripeFail(e, what) {
  const msg = (e && (e.raw && e.raw.message)) || (e && e.message) || '';
  console.error('stripe ' + what, e && e.type, msg);
  if (e && (e.type === 'StripeAuthenticationError' || (e.statusCode === 401))) {
    throw new HttpsError('failed-precondition', 'Stripe refused the key saved on the server. Set STRIPE_SECRET again and deploy.');
  }
  if (e && e.type === 'StripePermissionError') {
    throw new HttpsError('failed-precondition', 'Stripe says this account can’t do that yet: ' + (msg || 'permission denied') + '.');
  }
  throw new HttpsError('failed-precondition', msg ? 'Stripe says: ' + String(msg).slice(0, 300) : 'Stripe couldn’t be reached. Try again in a minute.');
}

exports.stripeConnect = onCall({ region: 'europe-west1', secrets: [STRIPE_SECRET] }, async (req) => {
  const { cid, country } = req.data || {};
  await staffOf(req, cid, ['owner']);
  const stripe = stripeClient(); const db = admin.firestore();
  const cref = db.doc(`companies/${cid}`); const co = (await cref.get()).data() || {};
  const land = ['MT', 'IE', 'GB'].includes(country) ? country : 'MT';
  let accountId = co.stripe && co.stripe.accountId;
  const old = !!accountId && co.stripe.v !== 2; // connected before the change
  if (!accountId) {
    // The company is its own merchant: their name on the client's statement, Stripe takes its fee from their
    // payment, and Stripe carries the loss on a bad payment. They get the full Stripe dashboard.
    let acct;
    try {
      acct = await stripe.v2.core.accounts.create({
        display_name: clean(co.name, 100) || undefined,
        contact_email: clean((co.invoice && co.invoice.email) || (co.contact && co.contact.email), 120) || undefined,
        dashboard: 'full',
        identity: { country: land },
        defaults: { currency: 'eur', responsibilities: { fees_collector: 'stripe', losses_collector: 'stripe' } },
        configuration: { merchant: { capabilities: { card_payments: { requested: true } } } },
        include: ['configuration.merchant', 'requirements', 'identity'],
        metadata: { cid },
      });
    } catch (e) { stripeFail(e, 'v2.accounts.create'); }
    accountId = acct.id;
    await cref.update({ stripe: stripeState2(acct, land) });
  }
  try {
    if (old) {
      const link = await stripe.accountLinks.create({ account: accountId, type: 'account_onboarding', refresh_url: `${SITE}/app/#/pos`, return_url: `${SITE}/app/#/pos` });
      return { url: link.url };
    }
    const link = await stripe.v2.core.accountLinks.create({
      account: accountId,
      use_case: { type: 'account_onboarding', account_onboarding: { refresh_url: `${SITE}/app/#/pos`, return_url: `${SITE}/app/#/pos` } },
    });
    return { url: link.url };
  } catch (e) { return stripeFail(e, 'accountLinks.create'); }
});

// Checks whether the company's Stripe account can take card payments yet.
exports.stripeStatus = onCall({ region: 'europe-west1', secrets: [STRIPE_SECRET] }, async (req) => {
  const { cid } = req.data || {};
  await staffOf(req, cid, ['owner', 'office']);
  const cref = admin.firestore().doc(`companies/${cid}`); const co = (await cref.get()).data() || {};
  if (!co.stripe || !co.stripe.accountId) return { chargesEnabled: false };
  try {
    let s;
    if (co.stripe.v === 2) {
      const acct = await stripeClient().v2.core.accounts.retrieve(co.stripe.accountId, { include: ['configuration.merchant', 'requirements', 'identity'] });
      s = stripeState2(acct, co.stripe.country);
    } else {
      s = stripeState(await stripeClient().accounts.retrieve(co.stripe.accountId));
    }
    await cref.update({ stripe: s });
    return { chargesEnabled: s.chargesEnabled };
  } catch (e) { return stripeFail(e, 'accounts.retrieve'); }
});

// Creates the Stripe payment page for one POS payment, on the company's own Stripe account.
exports.posCheckout = onCall({ region: 'europe-west1', secrets: [STRIPE_SECRET] }, async (req) => {
  // Stripe problems come back in plain words; see stripeFail.
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
  let session;
  try {
    session = await stripeClient().checkout.sessions.create({
      mode: 'payment',
      line_items: [{ quantity: 1, price_data: { currency: 'eur', unit_amount: cents, product_data: { name: `${name} · ${clean(t.no, 20)}`, description: clean((t.ref && t.ref.label) || 'Payment', 120) } } }],
      customer_email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t.email || '') ? t.email : undefined,
      payment_intent_data: { description: `${name} ${clean(t.no, 20)}`, metadata: { cid, tillId } },
      metadata: { cid, tillId },
      success_url: `${SITE}/paid/?c=${encodeURIComponent(name)}`,
      cancel_url: `${SITE}/paid/?c=${encodeURIComponent(name)}&cancel=1`,
    }, { stripeAccount: acct.accountId });
  } catch (e) { return stripeFail(e, 'checkout.sessions.create'); }
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

// ---------------------------------------------------------------------------
// Missed calls pack. The company gets a SiteToFit number. A call to it rings their own phone first, exactly as
// before. Only if nobody answers does the caller get a text, and the assistant carries on by message.
// Everything here is inert until a Twilio account is connected and the two secrets are set.
// ---------------------------------------------------------------------------
const TWILIO_SID = defineSecret('TWILIO_SID');
const TWILIO_TOKEN = defineSecret('TWILIO_TOKEN');
const crypto = require('crypto');

const e164 = (p) => { let d = String(p || '').replace(/[^\d+]/g, ''); if (!d.startsWith('+')) d = (d.length === 8 ? '+356' : '+') + d; return d; };
const xml = (body) => `<?xml version="1.0" encoding="UTF-8"?><Response>${body}</Response>`;
const xmlEsc = (t) => String(t || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
const twiml = (res, body) => { res.set('Content-Type', 'text/xml').status(200).send(xml(body)); };

// Twilio signs every request with the account's auth token. Without a valid signature we answer nothing:
// these are public URLs, and the whole pack runs on the company's money.
function fromTwilio(req, name) {
  const sig = req.get('X-Twilio-Signature');
  if (!sig) return false;
  const body = req.body || {};
  const tail = Object.keys(body).sort().map((k) => k + body[k]).join('');
  const host = req.get('x-forwarded-host') || req.hostname;
  const path = req.originalUrl || '/';
  // Cloud Run rewrites the path, so try the shapes Twilio may have signed rather than guessing one.
  const urls = [
    `https://${host}${path}`,
    `https://${host}/${name}`,
    `https://${host}${path === '/' ? '/' + name : path}`,
    `https://europe-west1-${process.env.GCLOUD_PROJECT || 'sitetofit'}.cloudfunctions.net/${name}`,
  ];
  return urls.some((u) => {
    const mine = crypto.createHmac('sha1', TWILIO_TOKEN.value()).update(Buffer.from(u + tail, 'utf-8')).digest('base64');
    try { return crypto.timingSafeEqual(Buffer.from(mine), Buffer.from(sig)); } catch (e) { return false; }
  });
}

// Which company owns the number that was dialled. The number lives on the company record, set by us.
async function companyForNumber(num) {
  const db = admin.firestore();
  const want = e164(num);
  const snap = await db.collection('companies').where('callNumber', '==', want).limit(1).get();
  if (snap.empty) return null;
  const comp = { id: snap.docs[0].id, ...snap.docs[0].data() };
  if (!comp.features || !comp.features.aicall) return null;
  const set = (await db.doc(`companies/${comp.id}/callSettings/main`).get()).data() || {};
  if (set.active === false) return null;
  return { comp, set };
}

const openNow = (hours) => {
  // Deliberately simple: the company writes their hours in their own words, so we only use this to pick which
  // of their two messages goes out. Monday to Friday, 8 to 5, Malta time, unless they say otherwise.
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Malta' }));
  const h = now.getHours(); const d = now.getDay();
  const m = String(hours || '').match(/(\d{1,2})\s*(?:am|:00)?\s*(?:to|-|–)\s*(\d{1,2})\s*(am|pm)?/i);
  let from = 8; let to = 17;
  if (m) { from = Number(m[1]); to = Number(m[2]); if (to <= 12 && (m[3] || '').toLowerCase() !== 'am') to += 12; }
  return d >= 1 && d <= 5 && h >= from && h < to;
};

// A call comes in: ring the company's own phone first. Nothing is sent yet.
exports.callIn = onRequest({ region: 'europe-west1', secrets: [TWILIO_TOKEN], cors: false }, async (req, res) => {
  try {
    if (!fromTwilio(req, 'callIn')) return res.status(403).send('no');
    const found = await companyForNumber(req.body.To);
    if (!found) return twiml(res, '<Say voice="alice">Sorry, this number is not in service.</Say>');
    const { set } = found;
    const to = e164(set.forwardTo);
    if (!to || to.length < 8) return twiml(res, `<Say voice="alice">Sorry, we cannot take your call right now.</Say>`);
    const secs = Math.max(10, Math.min(45, Number(set.ringSeconds) || 20));
    // callerId stays the real caller's number, so the company sees who is ringing on their own phone.
    twiml(res, `<Dial timeout="${secs}" action="/callDone" method="POST" callerId="${xmlEsc(e164(req.body.From))}"><Number>${xmlEsc(to)}</Number></Dial>`);
  } catch (e) { console.error('callIn', e); twiml(res, '<Say voice="alice">Sorry, something went wrong.</Say>'); }
});

// The call is over. If nobody picked it up, text the caller — once — and open the thread.
exports.callDone = onRequest({ region: 'europe-west1', secrets: [TWILIO_SID, TWILIO_TOKEN, ANTHROPIC_KEY], cors: false }, async (req, res) => {
  try {
    if (!fromTwilio(req, 'callDone')) return res.status(403).send('no');
    const status = String(req.body.DialCallStatus || '');
    if (status === 'completed') return twiml(res, '');
    const found = await companyForNumber(req.body.To);
    if (!found) return twiml(res, '');
    const { comp, set } = found;
    const caller = e164(req.body.From);
    if (!caller || caller.length < 8) return twiml(res, '');

    const db = admin.firestore();
    const chatId = crypto.createHash('sha256').update(comp.id + ':' + caller).digest('hex').slice(0, 32);
    const ref = db.doc(`callChats/${chatId}`);
    const chat = (await ref.get()).data() || null;
    // One text per call, and never two within ten minutes however many times they redial.
    if (chat && Date.now() - (chat.textedAt || 0) < 10 * 60 * 1000) return twiml(res, '');

    const know = (await db.doc(`companies/${comp.id}/askSettings/main`).get()).data() || {};
    const text = clean(openNow(know.hours) ? set.text : (set.afterHoursText || set.text), 320)
      || 'Sorry we missed your call. What can we help you with?';
    await sendText(comp, set, caller, text);
    await ref.set({
      cid: comp.id, phone: caller, at: (chat && chat.at) || Date.now(), textedAt: Date.now(), replied: !!(chat && chat.replied),
      status: (chat && chat.status) || 'new', name: (chat && chat.name) || '', what: (chat && chat.what) || '',
      messages: [...((chat && chat.messages) || []), { role: 'assistant', text, at: Date.now() }].slice(-40), updatedAt: Date.now(),
    }, { merge: true });
    if (set.officeAlert !== false) await officeMissedCall(comp, caller);
    twiml(res, '');
  } catch (e) { console.error('callDone', e); twiml(res, ''); }
});

// They replied to the text. The same assistant as the "Ask us" page answers, and books if it can.
exports.smsIn = onRequest({ region: 'europe-west1', secrets: [TWILIO_SID, TWILIO_TOKEN, ANTHROPIC_KEY], cors: false }, async (req, res) => {
  try {
    if (!fromTwilio(req, 'smsIn')) return res.status(403).send('no');
    const found = await companyForNumber(String(req.body.To || '').replace(/^whatsapp:/, ''));
    if (!found) return twiml(res, '');
    const { comp, set } = found;
    const caller = e164(String(req.body.From || '').replace(/^whatsapp:/, ''));
    const said = String(req.body.Body || '').slice(0, 800).trim();
    if (!said) return twiml(res, '');

    const db = admin.firestore();
    const chatId = crypto.createHash('sha256').update(comp.id + ':' + caller).digest('hex').slice(0, 32);
    const ref = db.doc(`callChats/${chatId}`);
    const chat = (await ref.get()).data() || null;
    const history = [...((chat && chat.messages) || []), { role: 'user', text: said }];
    const msgs = shapeMessages(history);
    if (msgs.filter((m) => m.role === 'user').length > 25) {
      return twiml(res, `<Message>${xmlEsc('Easier if we talk — give us a ring on ' + clean((comp.contact || {}).phone, 40) + ' and we’ll sort it.')}</Message>`);
    }
    if (await dayBudget(comp.id) > 400) return twiml(res, '');

    const know = (await db.doc(`companies/${comp.id}/askSettings/main`).get()).data() || {};
    const out = await runAssistant({
      db, cid: comp.id, comp, set: know, msgs, chatRef: ref, chat, chatId,
      source: 'Missed call', idKey: 'callChatId', where: 'text', knownPhone: caller,
      extra: { phone: caller, replied: true, textedAt: (chat && chat.textedAt) || Date.now() },
    });
    twiml(res, `<Message>${xmlEsc(out.reply)}</Message>`);
  } catch (e) { console.error('smsIn', e); twiml(res, ''); }
});

// Sending a message out (used for the text-back; the replies go back down the webhook as TwiML).
async function sendText(comp, set, to, body) {
  const wa = !!set.byWhatsApp;
  const from = (wa ? 'whatsapp:' : '') + e164(comp.callNumber);
  const form = new URLSearchParams({ From: from, To: (wa ? 'whatsapp:' : '') + to, Body: body });
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID.value()}/Messages.json`, {
    method: 'POST',
    headers: { Authorization: 'Basic ' + Buffer.from(TWILIO_SID.value() + ':' + TWILIO_TOKEN.value()).toString('base64'), 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,
  });
  if (!r.ok) console.error('twilio send', r.status, await r.text().catch(() => ''));
  return r.ok;
}

// A quiet nudge to the office that a call was missed, so somebody can ring back even if the text goes unanswered.
async function officeMissedCall(comp, caller) {
  try {
    const to = companyInbox(comp);
    if (!to) return;
    await resend({
      from: 'SiteToFit <alerts@siteto.fit>', to: [to],
      subject: 'Missed call from ' + clean(caller, 40),
      text: 'Somebody rang ' + clean(comp.name, 60) + ' on your SiteToFit number and nobody could get to it.\n\nTheir number: ' + clean(caller, 40)
        + '\n\nThey have been texted already. Open SiteToFit and tap "Missed calls" to see what they say.\n\n' + SITE + '/app/',
    });
  } catch (e) { console.error('missed call alert', e); }
}
