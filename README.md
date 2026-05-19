# Email Services

Email Services is a Node.js and Express API for testing and sending transactional emails through multiple email providers. The currently wired HTTP routes support SendGrid, Resend, and Brevo. The repository also includes controller or SMTP examples for Mailgun, Postmark, and Nodemailer-based provider setups.

## What It Does

- Starts an Express server with JSON request parsing.
- Provides provider-specific email sending endpoints.
- Loads API keys and server configuration from environment variables.
- Keeps each provider's email sending logic in a separate controller file.
- Includes example service files showing SMTP transporter settings for common email providers.

## Tech Stack

- Node.js
- Express
- dotenv
- SendGrid SDK
- Resend SDK
- Brevo SDK
- Mailgun SDK
- Postmark SDK
- Nodemailer

## Project Structure

```text
.
+-- controllers/       # Email sending logic for each provider
+-- routes/            # Express routes for active provider endpoints
+-- services/          # SMTP transporter examples
+-- server.js          # Express app entry point
+-- package.json       # Scripts and dependencies
+-- .env.example       # Example environment variables
`-- README.md
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root. You can start by copying `.env.example`:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Update `.env` with your real provider keys:

```env
PORT=4000

SENDGRID_API_KEY=your-sendgrid-api-key
RESEND_API_KEY=your-resend-api-key
BREVO_API_KEY=your-brevo-api-key
MAILGUN_API_KEY=your-mailgun-api-key
POSTMARK_API_KEY=your-postmark-api-key
```

Do not commit `.env`. It is already ignored by `.gitignore`.

### 3. Update Email Details

Before sending real emails, update the placeholder sender and recipient values in the provider controller you want to use:

- `controllers/sendgridEmail.js`
- `controllers/resendEmail.js`
- `controllers/brevoEmail.js`
- `controllers/mailgunEmail.js`
- `controllers/postmarkEmail.js`

For example, replace placeholder values such as `hello@yourdomain.com`, empty `to` fields, and sample recipient strings with verified sender and recipient email addresses supported by your provider account.

### 4. Start the Server

For production-style startup:

```bash
npm start
```

For development with automatic restarts:

```bash
npm run server
```

By default, the server runs on:

```text
http://localhost:4000
```

## API Endpoints

### Health Check

```http
GET /
```

Returns a basic JSON response showing that the server is running.

### SendGrid

```http
POST /api/sendgrid/send-email
```

Uses `SENDGRID_API_KEY` and the email details configured in `controllers/sendgridEmail.js`.

### Resend

```http
POST /api/resend/send-email
```

Uses `RESEND_API_KEY` and the email details configured in `controllers/resendEmail.js`.

### Brevo

```http
POST /api/brevo/send-email
```

Uses `BREVO_API_KEY` and the email details configured in `controllers/brevoEmail.js`.

## Example Request

The current controllers use hard-coded example email payloads, so the request body is not required yet.

```bash
curl -X POST http://localhost:4000/api/resend/send-email
```

If the provider key and email settings are valid, the server responds with a success message and provider response data where available.

## Available Scripts

```bash
npm start
```

Runs the server with Node.

```bash
npm run server
```

Runs the server with Nodemon for development.

```bash
npm test
```

Currently returns the default placeholder test error. No automated tests are configured yet.

## Notes

- SendGrid, Resend, and Brevo are currently connected to Express routes.
- Mailgun and Postmark controller files exist, but their routes are not currently mounted in `server.js`.
- Some files in `services/` are SMTP transporter examples and are not imported by the active server code.
- Most email providers require verified sender domains or sender addresses before they allow production email delivery.
