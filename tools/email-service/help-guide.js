// What the in-app Help assistant knows. It must only answer from this. Edit here to change its knowledge.
exports.GUIDE = `
SITETOFIT APP GUIDE (for people who use SiteToFit at their company)

GENERAL
- SiteToFit works in any phone or computer browser at the company's own page (siteto.fit/c/company-name) or siteto.fit/app. On Android it can be added to the home screen (browser menu, "Add to Home screen"). There is no Play Store or App Store app.
- Each person has their own login and sees only what their role needs. Roles: Owner / manager, Office, Salesperson, Store keeper, Installer team (one login per team), Staff.
- Forgot password: on the sign-in page tap "Forgot your password?" and enter your email; a reset link is emailed. Check spam if it doesn't arrive.
- New logins, removing a login, a login switched off, or a person who left: only SiteToFit can add or remove logins. This needs SiteToFit support.
- Company settings (owner only, menu "Settings"): invoice and company details, payment reminder text and bank details (bank name, IBAN, account name), installer teams (one per line), job types and photo boxes (one job type per line: name, a colon, then the photo boxes separated by commas). Press "Save settings".
- Logo, colours, page address, switching optional parts on or off, trial and billing: done by SiteToFit. This needs SiteToFit support.
- Data is stored with Google Firebase in the European Union. Each company only sees its own data.

OWNER AND OFFICE MENU
- Dashboard: overview; a red number means installed jobs waiting for the office to check.
- Leads & calendar: "New enquiry" adds an enquiry. Each enquiry has a next step and date ("Next step"), can be marked Lost, or "Book site visit". The calendar shows visits and installations; use ‹ › to change week, "This week" to come back.
- Site visits: "New site visit", "Edit notes" (measurements, notes, photos or drawings), "Mark visit done". Pending and Done lists. From a visit you can create a job.
- Installations: "New job" or "Create job for a team": pick the team, date, job type, price, materials and (with the Store) items from the store, which are kept aside for the job. The job appears on the team's phone. When the team finishes, "Check photos"; then "Installed - close the job", or "Send back to the team" if something is missing. "Download all photos" gives every photo of the job in one file.
- Clients: every client with phone, email, visits, jobs, photos, payments, and signed contracts if that pack is on. "New client", "Edit".
- Money to collect: every balance still owed. "Record a payment", "WhatsApp reminder" sends a polite reminder with the bank details. "Waiting for your confirmation": payments recorded by teams; press "Confirm, money received" when the money arrives, or "Not received".
- Invoices: numbered PDF invoices with logo, VAT breakdown and bank details. "Share the PDF (WhatsApp, Gmail…)". "Make it again with the latest payments" updates it.

OPTIONAL PARTS (only if the company has them switched on)
- Sales app: "Log a sale" (owner/office see "Sales", salespeople see "My sales").
- Store: for the store keeper. Stock in (scan barcodes; appliances one by one by serial number, fixings counted; "Add to stock"), "Scan out" for each job, stock search by serial number, "To order" (items short for booked jobs or below their warning level), stock take ("Save count", "Start again"), "New product". Works with a barcode scanner or the phone camera ("Camera").
- Targets & report: "Set targets" per salesperson; monthly one-page report, "Print or save as PDF".
- Rota & payroll pack:
  - Staff rota: add people ("Add a person"), staff tick when they can work, "Make the draft" (or "Redo the draft"), tap a cell to change a shift, then "Approve & send to staff". "Change it" reopens an approved week.
  - My rota / Clock & rota: see your shifts, tick your availability, clock in and out on the phone.
  - Hours: clock times per week; "Add missing times" or "Fix", then "Approve the week's hours". "Undo approval" reopens it.
  - Leave: staff "Ask for leave" or "Report sick"; managers see "Waiting for you" and approve or "Decline"; "Add leave for someone". Full-time entitlement is 216 hours vacation leave and 80 hours sick leave a year, pro-rata for part-time. Sickness benefit is deducted from sick-leave pay from the fourth day.
  - Payroll: monthly Maltese payroll (FSS tax, Class 1 social security, bonuses, leave). "Settings" / "Pay settings for everyone" for rates, tax status and part-time tax option. "Extras" for overtime or one-off amounts. "Finalise", then "Approve & send all" (emails every payslip as a PDF) or "Approve only" and send each person's with "Send". "Back to draft" to correct. Staff open their payslips with "Open PDF".
- Digital contracts pack:
  - When a salesperson logs a sale, the client's email, ID card number and the sales order or quote number are required.
  - Then choose "Sign here now" (client reads the contract and company policy, ticks both boxes, signs with a finger; salesperson countersigns; "Sign & send") or "Email a signing link" (valid 7 days; "Resend link" gives 7 more days; "Sign here instead" cancels the link). After the client signs a link, the salesperson countersigns (red number on My sales).
  - The signed PDF is emailed to the client and the company's copies email, and saved on the client's record.
  - Owner/office menu "Contracts": write the contract in the app and tap fields to insert them (Date, Company, Client name, ID card, Address, Order / quote no., Sales order no., Quote no., System, Total price, Salesperson), or "Upload PDF (AI converts)", then "Review" and approve. Editing the company policy saves a new version; each signed contract keeps the version its client accepted. Set the email that receives signed copies.
- Quotes pack (owner and office, menu "Quotes"):
  - "New quote": pick or type the client (a saved client fills in phone, address and email), quote date, "Valid until", subject, salesperson, the company's own extra fields (e.g. System size kWp), then the items (item, description, qty, rate including VAT). Discount in € or %. "Save as draft" or "Save and send".
  - Sending: "Email it" (the client gets the PDF and a link), "Send by WhatsApp", or "Copy the link". On the link the client can download the PDF and "Accept" (types their name) or decline with a reason. The quote shows Sent, Viewed by client, Accepted, Declined or Expired, with a history on the right.
  - "Convert" (on an accepted quote, or under "More"): make a sale (Sales page and targets, quote PDF attached), an invoice (next invoice number, every line copied), or both. "More" also has Mark as accepted/declined, Duplicate and Delete.
  - "Quote settings": number prefix, how many days quotes are valid, the company's own fields (name and unit), default notes and terms. The red number on Quotes is accepted quotes not converted yet.
- POS pack (owner and office, menu "Take payment"; switched on per company):
  - "New payment": choose "A job’s balance" (pick the job; the amount can be a part payment) or "Quick sale" (quick product buttons from POS settings, or typed lines; client optional). Then Card, Cash or Bank transfer.
  - Card: SiteToFit shows a QR code and a link (send by WhatsApp or copy). The client pays on a secure Stripe page on their phone; the screen turns green by itself and the payment is added to the job. Cash and bank transfer are recorded straight away.
  - After payment: "Receipt PDF" or "Send receipt by WhatsApp". SiteToFit’s receipt confirms payment; in Malta the fiscal receipt must come from the company’s approved fiscal cash register, so the screen asks them to issue it there and type its number into "Fiscal receipt no.".
  - "Takings": totals for a day by card, cash and transfer, and which payments still need a fiscal receipt number; compare with the register’s Z report.
  - Deposit on a quote: in Quote settings the owner sets the deposit percentage (e.g. 30%), and every new quote starts with it ticked. The deposit and the balance print on the quote and the PDF. On the quote, "Take the deposit" takes it by card (QR code or link), or records cash or a bank transfer — those two need a photo of the proof. A receipt PDF is emailed to the client with the office copied in, and can also go by WhatsApp. Once the deposit is paid the quote is locked: only the owner and office can change it, and only they can enter the fiscal receipt number.
  - The rest of the money on a quote: after the deposit, the quote shows what has been paid and what is left, each payment with its receipt and proof photo. "Take a payment" takes the whole balance or any part of it, the same three ways. Only the owner and office can take these, because the quote is locked to them once the deposit is paid. A quote with no deposit can still be paid this way.
  - The client's own app shows a "Payments" page: what they still owe, every payment they have made, and the receipt for each one. It updates by itself when the office records a payment.
  - Salespeople and quotes: if the Quotes feature is on, a salesperson sees "My quotes" — their own quotes only. They can write, send and take the deposit on their own quotes. Converting a quote into a sale or an invoice, deleting one, and quote settings stay with the owner and office.
  - "POS settings": the owner connects the company’s own Stripe account (Connect Stripe, then finish Stripe’s set-up pages); quick products with prices. Stripe fees are charged by Stripe per payment.
  - Connecting Stripe: the owner opens POS settings, picks the country and presses Connect Stripe. Stripe's own pages ask for the business details and the bank account. Back in the app, "I've finished, check again" switches card payments on. The money goes straight to the company's Stripe account and then to their bank; Stripe takes its fee per payment and SiteToFit never holds the money.
  - Tap to Pay (contactless on the phone itself): only inside the SiteToFit Android app, and only once Stripe has switched Tap to Pay on for that account. The payment screen then shows "Take €… with Tap to Pay" above the QR code; the client holds their card, phone or watch against the back of the staff phone. It needs the business address under "Tap to Pay" in POS settings, a phone with NFC on Android 13 or newer, and the location permission (a Stripe requirement). If it fails, the QR code and link still work.
- Client app pack (owner and office, menu "Client requests"; switched on per company):
  - On a client's page, "Give <name> the app" makes their private app link; "Send the app link" sends it by WhatsApp or email. No password: the link opens the app. They can add it to their home screen. "Turn off" stops the link working.
  - In the app the client sees their appointments (site visits and jobs) and can tap "Confirm" or "Ask for another day", report a fault (type, description, up to 4 photos), book a service from the company's extras list, send a message, and see their quotes, invoices, signed contracts and photos of the finished job.
  - "Client requests" lists faults, bookings, date changes and messages (tabs New, In progress, Done, Confirmations). "Reply" sends an answer the client sees in their app; "In progress" and "Done" change the status; bookings can become a quote with "Make a quote". "Coming up" shows which clients confirmed.
  - "Client app settings": welcome message, phone/WhatsApp the client sees, the extras they can book (name, from price, description) and the fault types. The client's app updates within seconds while the office app is open.

PHONES
- Installer team ("My jobs"): each team sees only its jobs: address with "Directions", work to do, materials, note from the office, photo boxes. Add at least one photo, then "Job done"; the office gets an alert. "Record a payment" for payment on the day (cash, cheque with a photo, bank transfer or Revolut, card) and send the client the invoice.
- Salesperson: My leads, Site visits, My sales.
- Store keeper: Store.

THINGS THE ASSISTANT CANNOT DO (send to SiteToFit support)
- Anything needing a change on SiteToFit's side: logins, switching parts on/off, logo or colours, billing, trial, data exports, deleted or missing data, something that looks like a fault or error message, a payment or payslip figure that looks wrong, emails not arriving, questions about the company's own clients or figures, and feature requests.
`;
