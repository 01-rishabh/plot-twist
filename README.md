# Plot Twist

Landing page with a sign-up form. Entries are saved to a Google Sheet, which is the admin portal.

- Frontend: React + Vite + Tailwind CSS v4 + Motion (animations)
- Storage: Google Sheets, written by a small Google Apps Script web app
- Hosting: Netlify (free tier)
- Cost: free

```
Visitor fills form  ->  Netlify site (React)  ->  Apps Script web app  ->  Google Sheet  <-  Admin
```

## 1. Run it locally

```bash
npm install
npm run dev
```

Opens on http://localhost:5180. Without a sheet URL the form runs in demo mode: it shows the success screen but saves nothing.

## 2. Connect the Google Sheet (about 10 minutes, once)

1. Go to https://sheets.new and name the sheet, for example `Plot Twist Registrations`.
2. In the sheet: **Extensions > Apps Script**.
3. Delete the sample code, paste everything from [apps-script/Code.gs](apps-script/Code.gs), click **Save**.
   - Optional: set `NOTIFY_EMAIL` to an address that should get an email for every entry.
4. Click **Deploy > New deployment**. Click the gear icon, pick **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**.
5. Google asks for permission. Pick your account. On "Google hasn't verified this app" click **Advanced > Go to (project name)** and **Allow**. This warning appears for every personal script; the script only touches this one sheet.
6. Copy the **Web app URL** (ends in `/exec`). Open it in a browser. You should see `{"ok":true,...}`.
7. Create a file named `.env` in this folder (copy `.env.example`) and paste the URL:
   ```
   VITE_SHEET_URL=https://script.google.com/macros/s/XXXX/exec
   ```
8. Restart `npm run dev`, submit the form, and check the sheet. A `Responses` tab appears with one column per question.

**Changing the script later:** use **Deploy > Manage deployments > pencil icon > Version: New version > Deploy**. This keeps the same URL. "New deployment" creates a new URL that the site does not know about.

## 3. Deploy to Netlify

`netlify.toml` already sets the build command (`npm run build`) and output folder (`dist`).

**Option A: from GitHub (auto-deploys on every push)**

1. Push this folder to a GitHub repo.
2. In Netlify: **Add new site > Import an existing project**, pick the repo. The build settings fill in from `netlify.toml`.
3. **Site configuration > Environment variables > Add a variable**: key `VITE_SHEET_URL`, value = your `/exec` URL.
4. **Deploys > Trigger deploy > Deploy site**.

**Option B: drag and drop (no Git)**

1. Make sure `.env` has `VITE_SHEET_URL`.
2. Run `npm run build`.
3. Drag the `dist` folder onto https://app.netlify.com/drop.

`VITE_SHEET_URL` is built into the site at build time. After changing it, redeploy.

If the live site is built without `VITE_SHEET_URL`, the form shows an error instead of pretending to save.

## 4. Change the questions or text

Edit [src/content.js](src/content.js). Each field's `label` is its column header in the sheet. Adding a field adds a column automatically. Renaming a label starts a new column, and the old one stays with past answers.

## Limits on the free setup

- Google Sheets holds up to 10 million cells, which is hundreds of thousands of entries for this form.
- Email notifications from a free Gmail account are capped at 100 per day.
- The `/exec` URL is visible in the site's code, so anyone could post to it. The script caps field counts and lengths, and the form has a hidden bot trap. If spam appears, add a CAPTCHA or a shared-secret check.

## Files

| Path | What it is |
|---|---|
| `src/content.js` | All page text and form fields |
| `src/components/` | Page sections: Nav, Hero, CardStack, Manifesto, Register (form), Field, Footer |
| `src/lib/submit.js` | Sends an entry to the sheet |
| `src/lib/validate.js` | Form checks and sheet column mapping |
| `apps-script/Code.gs` | Google Apps Script that writes rows to the sheet |
| `ADMIN_GUIDE.md` | Guide for the person who reads the entries |
| `netlify.toml` | Netlify build settings |
