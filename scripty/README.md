# Google Form Auto-Submit

Automatically submit a Google Form on a schedule **using your logged-in Google account** (so responses show your email if the form collects it). You can change the automated responses and how often it runs.

## How to run it (in your browser)

### 1. Install Tampermonkey

- **Chrome:** [Tampermonkey in Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Edge:** [Tampermonkey in Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- **Firefox:** [Tampermonkey on addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

### 2. Install the script

1. Open Tampermonkey → **Dashboard** (or “Create new script”).
2. Delete any default code in the editor.
3. Copy the **entire** contents of `google-form-auto-submit.user.js` and paste it in.
4. Save (Ctrl+S). Tampermonkey will list the script as enabled.

### 3. Use it on a form

1. **Log in to Google** in the same browser (so submissions are from your account).
2. Open the **form’s “Fill out” link** (the `.../viewform` URL), e.g.  
   `https://docs.google.com/forms/d/e/xxxxx/viewform`
3. A **“Form Auto-Submit”** panel appears on the right.
4. **Set your responses:**
   - Either fill the form manually once, then click **“Save & use current form values”**,  
   - Or in the text area use one line per answer:  
     `entry.123456789 = Your answer`  
     (You can find entry IDs by inspecting the form or saving once from current values.)
5. **Set the interval** (e.g. `5` = every 5 minutes).
6. Click **“Start auto-submit”**.

Submissions will then happen on the schedule you set, on behalf of your logged-in email. Use **“Stop”** to pause, and **−** to minimize the panel.

## Changing the automated response

- **From current form:** Fill the form as you want it, then click **“Save & use current form values”**.
- **Manual edit:** In the “Responses” text area use lines like:
  - `entry.123456 = Short answer text`
  - `entry.789012 = Option 1`   (for multiple choice, use the exact option text)
- **Frequency:** Change the “Interval (minutes)” number and click **“Start auto-submit”** again; the new interval is used from then on.

## Notes

- The script only runs on **viewform** URLs (the page where you fill the form), not on the edit page.
- Settings (answers and interval) are saved **per form URL** so you can use different settings for different forms.
- Keep the form tab open (and the browser running) for auto-submit to continue; minimizing the window is fine.
- If the form layout or question IDs change, update the responses in the panel and save again.
