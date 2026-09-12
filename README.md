# Natraj Cyber Hub — Website

A fast, mobile-first website for Natraj Cyber Hub, a local digital service center in Katras, Jharkhand offering online form filling, ticket booking assistance, government documentation assistance, printing/Xerox, lamination, typing, resumes, school projects, custom stamps/name plates, and stationery.

## 1. Overview

Single-page site built for customers who mostly browse on Android phones. Core goal: let a customer quickly find their service and send a ready-made WhatsApp message to the shop, or call/get directions directly.

## 2. Technology Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- lucide-react (icons)

No backend, no database, no third-party form service. The only outbound action a customer takes is opening WhatsApp (`wa.me`) or the phone dialer (`tel:`).

## 3. Project Structure

```
src/
  components/       UI sections (Navbar, Hero, Services, ServiceRequestForm, etc.)
  config/
    business.ts     ALL business contact details live here — single source of truth
  data/
    services.ts      All services, categories, and quick-finder shortcuts
  lib/
    whatsapp.ts      Message generation + WhatsApp opening logic
    validation.ts     Form validation (incl. Indian mobile number check)
  App.tsx
  main.tsx
  index.css
```

## 4. Installation

```bash
npm install
```

## 5. Development

```bash
npm run dev
```

Opens a local dev server (usually `http://localhost:5173`).

## 6. Production Build

```bash
npm run build
```

Outputs static files to `dist/`.

## 7. Preview the Production Build

```bash
npm run preview
```

## 8. Configuring Business Details

Everything specific to the shop lives in **`src/config/business.ts`**. Nothing else in the codebase hardcodes a phone number, WhatsApp number, email, or address — update this one file and the whole site updates.

Currently configured:

| Field | Value |
|---|---|
| Business name | Natraj Cyber Hub |
| Phone | 8252101174 |
| WhatsApp | 8252101174 |
| Email | NatrajCyberKth@gmail.com |
| Address | Katras, Jharkhand 828116 |
| Opening hours | 9:00 AM – 9:00 PM, every day |
| Google Maps (share link) | configured |
| Google Maps **embed** URL | **not yet set** — see below |

### Setting the Google Maps embed URL

The "Find Us" section shows a placeholder until this is set, because a share link (`maps.app.goo.gl/...`) is not the same as an embeddable iframe URL.

To get it:
1. Open Google Maps and find/search the exact shop pin.
2. Click **Share** → **Embed a map**.
3. Copy the URL inside `src="..."` from the provided `<iframe>` code.
4. Paste it into `googleMapsEmbedUrl` in `src/config/business.ts`.

## 9. How the WhatsApp Request Flow Works

1. Customer fills in First Name, Last Name, Phone, optional Service, Requirement, and optionally picks a 15-minute time slot (see below) in the **Raise a Request** form.
2. On submit, `validateRequestForm()` (in `src/lib/validation.ts`) checks all required fields and that the phone number looks like a valid Indian mobile number.
3. If valid, `generateWhatsAppMessage()` (in `src/lib/whatsapp.ts`) builds a formatted message, e.g.:

   ```
   Hello Natraj Cyber Hub,

   I have a service request.

   Name: Rahul Kumar
   Phone: 9876543210
   Service: Passport Application Assistance
   Preferred slot: Tomorrow, 2:15 PM

   Requirement:
   I need help with passport application.

   Please contact me regarding this request.

   Thank you.
   ```

4. `openWhatsApp()` builds a `wa.me` link with the message URL-encoded and opens it in a new tab — this opens the WhatsApp app on mobile, or WhatsApp Web on desktop.
5. The site then shows: **"Your request is ready to send on WhatsApp. Please tap Send to share it with Natraj Cyber Hub."** — it never claims the message was already delivered, since only WhatsApp itself can confirm that once the customer presses Send. Note: WhatsApp's click-to-chat link does not support sending automatically without the customer pressing Send — this is a WhatsApp platform restriction (anti-spam/anti-abuse), not a limitation of this site, and there's no legitimate way around it short of the paid WhatsApp Business API.
6. If the browser blocks the popup, a fallback shows **Call Us** and **WhatsApp Us** buttons instead.
7. In parallel, the same details (plus service price and any picked slot) are sent to a Google Sheet for your records — see section 12 below.

Tapping any service shortcut (Quick Service Finder, a service card, or a flagship service tile) scrolls to the request form and pre-selects that service in the dropdown — the customer can still change it.

## 10. Time-Slot Booking

Below the Service and Requirement fields, customers can optionally check "Prefer a specific time?" to reveal:

- **Date chips** — Today plus the next few days (configurable via `bookingWindowDays` in `src/config/business.ts`, currently 4 days total).
- **A grid of 15-minute time slots** — generated from `businessHours` in the same config file (currently 9:00 AM–9:00 PM, so 48 slots/day). If "Today" is selected, slots that have already passed are automatically hidden.

This is a **request, not a guaranteed booking** — the site does not check whether a slot is already taken by someone else. It simply passes the requested date/time along in the WhatsApp message and the Sheet log, so you can confirm or reschedule directly with the customer. If you later want real availability checking (blocking already-booked slots), that would need the Apps Script to also read existing bookings back — let me know if you want that added.

To change the slot length from 15 minutes, or the business hours, edit `businessHours` in `src/config/business.ts` and the slot-generation logic in `src/lib/slots.ts`.

## 11. Pricing

Displayed as "From ₹X" on service cards and in the flagship services strip. Configured in **`src/data/pricing.ts`** — one file, keyed by service ID. Every service currently shows "Contact for pricing" as a placeholder; update the relevant entries with real starting prices whenever you have them. No other file needs to change.

## 12. Booking Records (Google Sheet)

Every request submitted through the form — with or without a picked time slot — is also logged to a Google Sheet you control, via a free Google Apps Script "Web App". This gives you a running spreadsheet of customer name, phone, service, price, requested date/slot, and requirement.

**Full setup walkthrough (about 5 minutes): see [`docs/google-sheets-setup.md`](./docs/google-sheets-setup.md).**

Until you complete that setup, `bookingSheetWebhookUrl` in `src/config/business.ts` stays blank and logging is silently skipped — the WhatsApp flow works exactly the same either way; logging is a bonus, not a dependency.

## 13. Deployment

**Recommended: GitHub Pages** — free, no extra account beyond GitHub, and this project already includes the setup for it.

### One-time setup

1. Push this project to a GitHub repository (see steps below).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.

That's it. The included workflow at `.github/workflows/deploy.yml` builds the site with `npm run build` and publishes the `dist/` folder automatically every time you push to `main`. You can also trigger it manually from the **Actions** tab.

### Pushing the code for the first time

```bash
git init
git add .
git commit -m "Initial commit: Natraj Cyber Hub website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/NatrajCyberHub.git
git push -u origin main
```

Once pushed, open the **Actions** tab on GitHub to watch the deploy run. When it finishes, your site is live at `https://YOUR_USERNAME.github.io/NatrajCyberHub/` (until the custom domain below is connected).

### Connecting natrajcyberhub.online to GitHub Pages

This project already includes a `public/CNAME` file containing `natrajcyberhub.online`, so GitHub Pages will pick it up automatically once you:

1. At your domain registrar (wherever you bought `natrajcyberhub.online`), add these DNS records:
   - **A records** for the root domain (`@`) pointing to GitHub Pages' IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Optionally, a **CNAME record** for `www` pointing to `YOUR_USERNAME.github.io`.
2. Back in **Settings → Pages** on GitHub, enter `natrajcyberhub.online` under **Custom domain** and save.
3. Wait for DNS to propagate (can take a few minutes to a few hours), then check **Enforce HTTPS** once GitHub shows the certificate is ready.

### Alternatives (also free, no code changes needed)

- **Netlify** — drag-and-drop the `dist/` folder after `npm run build`, or connect the GitHub repo for automatic deploys. Build command: `npm run build`, publish directory: `dist`.
- **Cloudflare Pages** — same idea: connect the GitHub repo, build command `npm run build`, output directory `dist`.
- **Vercel** — also works the same way if you'd prefer it later.

All asset paths in this project are relative (`base: './'` in `vite.config.ts`), so the built site works correctly regardless of which host or path it's served from.

## 14. Future Improvements (not built into this MVP, but the code is structured to support them)

- Storing and tracking customer requests (order/status tracking) via a backend + database
- Admin dashboard for managing requests
- Document upload for applications
- Online payments (Razorpay) — see note below
- Real-time slot availability (blocking already-booked times, not just logging requests)
- WhatsApp Business API for automated replies
- Email notifications
- Google Business Profile integration and customer reviews
- Hindi + English language toggle

### Note on payments

No payment processing is implemented yet. When Razorpay (or similar) is added:
- Never put secret/API keys in frontend code.
- Create orders on a server, not in the browser.
- Verify payment signatures server-side.
- Store payment status in a secure backend, not client-side state.

## 15. Notes on Wording

Per the business's request, the site never claims to be an official government, railway, airline, bus, hotel, or CMC Vellore representative. Services are described as "Application Assistance," "Booking Assistance," or "Online Service Assistance" for this reason.
