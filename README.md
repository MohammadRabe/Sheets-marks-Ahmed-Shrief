# بوابة درجات الطلاب

React/Vite application for looking up student marks from three separate Google Sheets files.

## Project structure

```text
.
├── index.html
├── src/
│   ├── App.jsx              # routing only
│   ├── components/
│   │   ├── PharaohMark.jsx
│   │   ├── Portrait.jsx
│   │   ├── Results.jsx
│   │   ├── StageButton.jsx
│   │   └── Status.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── LookupPage.jsx
│   ├── utils/
│   │   ├── grades.js
│   │   └── schedules.js
│   ├── config.js
│   ├── main.jsx
│   └── styles.css
├── public/images/
├── gs/
│   ├── Code_Primary.gs
│   ├── Code_Preparatory.gs
│   ├── Code_Secondary.gs
│   └── Schedules.gs
├── package.json
└── vite.config.js
```

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Google Sheets setup

The dropdown levels are fixed in `src/config.js`, so the page does not request them from Google Sheets. Each Google Sheets file still needs the matching three tabs:

- `درجات ابتدائي`: `الرابع`, `الخامس`, `السادس`
- `درجات إعدادي`: `أولى إعدادي`, `تانية إعدادي`, `تالتة إعدادي`
- `درجات ثانوي`: `أولى ثانوي`, `تانية ثانوي`, `تالتة ثانوي`

Every tab uses the same structure. The first row should contain `Code`, `Name`, then mark columns such as `sheet=15` or `exam=20`. The Apps Script files in `gs/` return the tab names and student fields.

Deploy each `.gs` file as a Web App and update the three `apiUrl` values in `src/config.js`. Each URL must end with `/exec`.

## Schedule Google Sheet setup

The schedules page expects one separate Google Sheets file with these three tabs:

- `ابتدائي`
- `إعدادي`
- `ثانوي`

Deploy `gs/Schedules.gs` as a Web App attached to that spreadsheet. It accepts the tab name through the `level` query parameter and returns the tab rows as JSON. The current deployment URL is configured in `src/config.js`. You can override it locally with `.env.local` if needed:

```env
VITE_SCHEDULES_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

The schedule page requests each tab as `?level=ابتدائي`, `?level=إعدادي`, and `?level=ثانوي`. Until this URL is configured, the page shows themed placeholder rows.
