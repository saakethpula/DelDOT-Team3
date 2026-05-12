# DelDOT DMV Complaint Case Management Tool

This repository contains a Turborepo application for the Delaware DMV Compliance and Investigations complaint workflow. It includes a public complaint intake form, a staff-facing search and review portal, a NestJS API, and a Prisma/PostgreSQL data layer.

## Project Status

The core complaint intake, complaint search, complaint updates, OCR mapping, and database-backed API routes are implemented. Notification providers are present, but production email and SMS delivery still require organization-owned provider accounts and environment configuration.

## Tech Stack

- Monorepo: Turborepo with npm workspaces
- Frontend: Vite, React, TanStack Router, TanStack Query, Tailwind CSS
- Backend: NestJS
- Database: PostgreSQL with Prisma
- OCR mapping: Google Gemini API
- Notifications: Nodemailer for email and Twilio for SMS
- Deployment targets: Firebase Hosting for the frontend and Render for the API

## Repository Structure

- `apps/web-start`: React staff portal and complaint intake frontend.
- `apps/api`: NestJS backend service exposing complaint, vehicle, document, user, link, OCR, and notification functionality.
- `apps/docs`: Next.js starter documentation app from the project template.
- `packages/database`: Prisma schema, Prisma client setup, and seed data.
- `packages/api`: Shared API utilities and DTO/entity types.
- `packages/ui`: Shared React UI components.
- `packages/eslint-config`, `packages/typescript-config`, `packages/jest-config`: Shared development tooling.
- `Dockerfile`: Production container definition for the API service.
- `render.yaml`: Render service configuration for API deployment.
- `docker-compose.yml`: Local PostgreSQL support. The reverse proxy service references nginx config files that are not currently included.

## Setup

Prerequisites:

- Node.js 18 or newer. Node 22 is recommended for local development.
- npm 10 or newer.
- PostgreSQL, either local or hosted.
- Optional provider accounts for Gemini, Twilio, and production email.

Install dependencies from the repository root:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Fill in database and provider values in `.env`. Do not commit real secret values.

Prepare the database:

```bash
npm run db:push
npm run db:seed
```

## Running Locally

Start all workspace development servers:

```bash
npm run dev
```

Common local URLs:

- API: `http://localhost:3000`
- Frontend: `http://localhost:3001`

You can also run each app separately:

```bash
npm run dev -w ./apps/api
npm run dev -w ./apps/web-start
```

Useful checks:

```bash
npm run build
npm run test
npm run lint
npm run check-types
```

## Environment Variables

Never commit real secrets. Use `.env.example` as the local template and configure production values in the deployment provider dashboard.

| Name                         | Used By                        | Required                       | Purpose                                                                        |
| ---------------------------- | ------------------------------ | ------------------------------ | ------------------------------------------------------------------------------ |
| `DATABASE_URL`               | API, Prisma                    | Yes                            | PostgreSQL connection string used by Prisma at runtime.                        |
| `DIRECT_URL`                 | Prisma                         | Yes for migrations             | Direct PostgreSQL connection string used by Prisma migrations.                 |
| `PORT`                       | API, deployed frontend preview | No                             | Service port. API defaults to `3000`; Render uses `10000`; Docker uses `8080`. |
| `HOST`                       | API                            | No                             | Bind host, commonly `0.0.0.0` in production containers.                        |
| `VITE_BACKEND_URL`           | Frontend                       | Yes                            | Base URL for API requests, such as `http://localhost:3000`.                    |
| `GEMINI_API_KEY`             | API OCR route                  | Yes for OCR                    | Google Gemini API key used by `/ocr/map`.                                      |
| `ENABLE_EMAIL_NOTIFICATIONS` | API notifications              | No                             | Set to `true` to send complaint confirmation emails.                           |
| `EMAIL_USER`                 | API notifications              | Required when email is enabled | Sender email account username/address.                                         |
| `EMAIL_PASS`                 | API notifications              | Required when email is enabled | Sender email password or app password.                                         |
| `ENABLE_SMS_NOTIFICATIONS`   | API notifications              | No                             | Set to `true` to send complaint confirmation SMS messages.                     |
| `TWILIO_ACCOUNT_SID`         | API notifications              | Required when SMS is enabled   | Twilio account SID.                                                            |
| `TWILIO_AUTH_TOKEN`          | API notifications              | Required when SMS is enabled   | Twilio auth token.                                                             |
| `TWILIO_PHONE_NUMBER`        | API notifications              | Required when SMS is enabled   | Twilio sender phone number.                                                    |

## High-Level Architecture

The frontend in `apps/web-start` provides the complaint form and staff search/update screens. It calls the NestJS API using `VITE_BACKEND_URL`.

The API in `apps/api` handles HTTP routes, delegates persistence to Prisma through `packages/database`, and sends optional notifications through the email and SMS providers. The OCR route sends extracted text to Gemini and returns structured complaint fields to the frontend.

PostgreSQL stores complaints, vehicles, documents, and users. The Prisma schema lives in `packages/database/prisma/schema.prisma`, with seed data under `packages/database/prisma/seed-data`.

## Main API Routes

- `GET /`: API health/root response.
- `POST /complaint`: Create a complaint.
- `GET /complaint`: List complaints.
- `GET /complaint/search`: Search complaints by query parameters.
- `GET /complaint/:id`: Fetch one complaint.
- `PATCH /complaint/:id`: Update complaint fields.
- `GET /vehicle` and `GET /vehicle/:id`: Read vehicle records.
- `GET /document` and `GET /document/:id`: Read document records.
- `GET /user` and `GET /user/:id`: Read user records.
- `POST /ocr/map`: Map OCR text into structured complaint fields.

## Deployment

Frontend deployment:

1. Set `VITE_BACKEND_URL` to the deployed API URL.
2. Build the frontend:

```bash
npm run build -w ./apps/web-start
```

3. Deploy to Firebase Hosting:

```bash
npm run deploy -w ./apps/web-start
```

API deployment on Render:

1. Create a Render web service from this repository.
2. Use the root directory `.`.
3. Configure the build and start commands from `render.yaml`.
4. Add production environment variables in the Render dashboard, especially `DATABASE_URL`, `DIRECT_URL`, `GEMINI_API_KEY`, and any notification provider settings.
5. Run Prisma migrations during deployment with `npx prisma migrate deploy`.

Docker API deployment:

```bash
docker build -t deldot-api .
docker run --env-file .env -p 8080:8080 deldot-api
```

## User and Stakeholder Notes

- Public users can submit complaint information through the complaint form.
- Staff users can search existing complaints and update complaint status/details through the staff portal.
- OCR support can help prefill complaint fields from complaint form text, but staff should review extracted values before saving.
- Complaint confirmation reminders are designed to use configured email and SMS providers when enabled.

## Known Bugs and Limitations

- The staff portal is not currently protected by authentication or authorization.
- Twilio SMS integration is implemented at the provider level and can be enabled through configuration, but it has not been verified with a live Twilio account.
- Email reminders currently depend on the configured `EMAIL_USER`; a dedicated production sender address still needs to be set up instead of using a student email account.
- OCR mapping depends on the exact complaint form text order and should be reviewed by staff before data is trusted.
- `docker-compose.yml` includes an nginx reverse proxy service that references config/certificate paths not present in this repository.
- Some generated build and coverage files are currently present in the repository; they are not required for normal development.

## Future Work

- Secure the staff portal with authentication and authorization before production use. Firebase Auth, an SSO provider, or another role-based access control approach would be appropriate.
- Finish production Twilio SMS setup by creating a Twilio account, verifying sender numbers, adding environment variables, and testing delivery.
- Configure a dedicated organizational email address or service account for reminder and confirmation emails.
- Add role-specific staff/admin workflows after authentication is added.
- Add stronger validation DTOs for complaint creation and updates.
- Add audit logging for staff updates to complaint records.
- Expand automated tests around complaint search, status updates, OCR mapping failures, and notification toggles.

## Development Notes

- Keep secrets in local `.env` files or deployment provider dashboards.
- Prefer workspace scripts from the root `package.json` for build, test, lint, and database tasks.
- Keep generated files such as coverage reports and build output out of future commits unless they are intentionally required.
