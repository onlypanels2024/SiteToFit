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

PHONES
- Installer team ("My jobs"): each team sees only its jobs: address with "Directions", work to do, materials, note from the office, photo boxes. Add at least one photo, then "Job done"; the office gets an alert. "Record a payment" for payment on the day (cash, cheque with a photo, bank transfer or Revolut, card) and send the client the invoice.
- Salesperson: My leads, Site visits, My sales.
- Store keeper: Store.

THINGS THE ASSISTANT CANNOT DO (send to SiteToFit support)
- Anything needing a change on SiteToFit's side: logins, switching parts on/off, logo or colours, billing, trial, data exports, deleted or missing data, something that looks like a fault or error message, a payment or payslip figure that looks wrong, emails not arriving, questions about the company's own clients or figures, and feature requests.
`;
