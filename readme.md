# DelDOT-Team3

Frontend starter (Vite + React) with a simple file upload UI using @tanstack/react-query.

Files added by the starter:

- `package.json` - project manifest and scripts
- `index.html` - Vite entry
- `src/main.jsx` - app bootstrap (QueryClientProvider)
- `src/App.jsx` - UI with file input and upload logic using `useMutation`
- `src/api/upload.js` - small axios-based upload helper (configurable URL)
- `src/styles.css` - minimal styles

Quick start

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

Notes

- Default upload URL is `https://httpbin.org/post`. Replace it in `src/api/upload.js` or set the environment variable `VITE_UPLOAD_URL` in an `.env` file (Vite-style) to point to your backend.
- The UI shows per-file progress using axios `onUploadProgress` and uses TanStack Query's `useMutation` for request management.

If you want, I can run `npm install` and start the dev server for you now, or change the upload target to a local API endpoint.
yo
