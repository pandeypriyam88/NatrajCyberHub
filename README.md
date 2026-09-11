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

1. Customer fills in First Name, Last Name, Phone, optional Service, and Requirement in the **Raise a Request** form.
2. On submit, `validateRequestForm()` (in `src/lib/validation.ts`) checks all required fields and that the phone number looks like a valid Indian mobile number.
3. If valid, `generateWhatsAppMessage()` (in `src/lib/whatsapp.ts`) builds a formatted message, e.g.:

   ```
   Hello Natraj Cyber Hub,

   I have a service request.

   Name: Rahul Kumar
   Phone: 9876543210
   Service: Passport Application Assistance

   Requirement:
   I need help with passport application.

   Please contact me regarding this request.

   Thank you.
   ```

4. `openWhatsApp()` builds a `wa.me` link with the message URL-encoded and opens it in a new tab — this opens the WhatsApp app on mobile, or WhatsApp Web on desktop.
5. The site then shows: **"Your request is ready to send on WhatsApp. Please tap Send to share it with Natraj Cyber Hub."** — it never claims the message was already delivered, since only WhatsApp itself can confirm that once the customer presses Send.
6. If the browser blocks the popup, a fallback shows **Call Us** and **WhatsApp Us** buttons instead.

Tapping any service shortcut (Quick Service Finder or a service card) scrolls to the request form and pre-selects that service in the dropdown — the customer can still change it.

## 10. Deployment

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

## 11. Future Improvements (not built into this MVP, but the code is structured to support them)

- Storing and tracking customer requests (order/status tracking) via a backend + database
- Admin dashboard for managing requests
- Document upload for applications
- Online payments (Razorpay) — see note below
- Appointment booking calendar
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

## 12. Notes on Wording

Per the business's request, the site never claims to be an official government, railway, airline, bus, hotel, or CMC Vellore representative. Services are described as "Application Assistance," "Booking Assistance," or "Online Service Assistance" for this reason.
