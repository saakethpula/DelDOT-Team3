# DelDOT API

NestJS backend for the DelDOT DMV complaint case management tool.

## Responsibilities

- Create, list, search, and update complaints.
- Read related vehicle, document, and user records.
- Map OCR text into complaint fields through the Gemini API.
- Send optional complaint confirmation emails and SMS messages when notification providers are configured and enabled.

## Local Development

From the repository root:

```bash
npm run dev -w ./apps/api
```

The API defaults to `http://localhost:3000`.

## Environment

See the root `README.md` and `.env.example` for the full environment variable list. The API needs `DATABASE_URL` for database access. OCR requires `GEMINI_API_KEY`. Email and SMS delivery are disabled unless `ENABLE_EMAIL_NOTIFICATIONS` or `ENABLE_SMS_NOTIFICATIONS` are set to `true`.

## Testing

```bash
npm run test -w ./apps/api
npm run test:e2e -w ./apps/api
```

## Important Routes

- `POST /complaint`
- `GET /complaint`
- `GET /complaint/search`
- `GET /complaint/:id`
- `PATCH /complaint/:id`
- `POST /ocr/map`
- `GET /vehicle`
- `GET /document`
- `GET /user`

## Current Limitations

- Staff-facing routes are not protected by authentication yet.
- Twilio SMS code is present but still needs a live Twilio account and verified production configuration.
- Email reminders should use a dedicated organizational sender address before production use.
