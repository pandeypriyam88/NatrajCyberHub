# Logging Bookings to a Google Sheet

Every time a customer submits the request form, the site sends the details (name, phone, service, price, requested date/time slot, and requirement) to a Google Sheet — so you have a running record you can open like a normal spreadsheet, sort, filter, or export.

This costs nothing and needs no server of your own — Google runs it for you via **Google Apps Script**.

## One-time setup (about 5 minutes)

1. **Create the Sheet.** Go to [sheets.google.com](https://sheets.google.com) → create a new blank spreadsheet. Name it something like "Natraj Cyber Hub — Bookings". In row 1, add these column headers (exact spelling matters for readability, not for the script):

   ```
   Submitted At | First Name | Last Name | Phone | Service | Price | Date | Time Slot | Requirement
   ```

2. **Open the script editor.** In the Sheet, go to **Extensions → Apps Script**. A new tab opens with a blank `Code.gs` file.

3. **Replace the default code** with the script below (delete whatever's there first, paste this in):

   ```javascript
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = JSON.parse(e.postData.contents);

     sheet.appendRow([
       data.submittedAt || new Date().toISOString(),
       data.firstName || '',
       data.lastName || '',
       data.phone || '',
       data.service || '',
       data.price || '',
       data.date || '',
       data.timeSlot || '',
       data.requirement || '',
     ]);

     return ContentService
       .createTextOutput(JSON.stringify({ status: 'ok' }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. **Save** the project (File → Save, or Ctrl/Cmd+S). Give it a name like "Booking Logger" when prompted.

5. **Deploy as a Web App:**
   - Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" → choose **Web app**.
   - **Description:** anything, e.g. "Booking logger v1".
   - **Execute as:** Me (your Google account).
   - **Who has access:** **Anyone** (this is required — the website needs to reach it without you being logged in. It only accepts data, it doesn't expose the Sheet's contents to the public).
   - Click **Deploy**.
   - Google will ask you to authorize the script the first time — click through the "Advanced" / "Go to Booking Logger (unsafe)" prompts. This warning is normal for your own scripts; you're not installing anything untrusted.
   - Copy the **Web app URL** it gives you (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

6. **Add the URL to the site.** Open `src/config/business.ts` and paste it in:

   ```ts
   bookingSheetWebhookUrl: 'https://script.google.com/macros/s/AKfycb.../exec',
   ```

7. **Rebuild and redeploy** the site (push to `main` — the GitHub Actions workflow handles the rest).

## Testing it

Submit a test request on the live site, then check the Google Sheet — a new row should appear within a few seconds. If nothing shows up:
- Double-check the URL was copied in full (including `/exec` at the end).
- Make sure "Who has access" was set to **Anyone**, not "Only myself".
- If you edit the script later, you must create a **new deployment version** (Deploy → Manage deployments → pencil icon → New version) — just saving the code doesn't update the live URL's behavior.

## Notes

- This logs *every* request, whether or not the customer picked a time slot. If no slot was picked, the "Date" and "Time Slot" columns are just left blank.
- Logging happens in the background and never blocks or delays the WhatsApp message — even if the Sheet is temporarily unreachable, the customer's WhatsApp flow still works normally.
- Since "Who has access" is set to Anyone, technically anyone with the exact URL could send data to this script. This is normal for this kind of free, no-backend setup — worst case, someone submits junk rows into your own private Sheet, which you can simply delete. If this ever becomes a real problem, the next step up is adding a shared secret key to the payload, which we can add later.
