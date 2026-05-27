// generateTestSig.js
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();

const secret = 'your_webhook_secret_here'; // ← replace with your actual secret from the webhook registration response


const body = JSON.stringify({
  event: "email.delivered",  // ← event not type
  email_id: "test-123",
  recipient: "eugyneehunter@gmail.com",
  timestamp: new Date().toISOString(),
  metadata: {}
});

const signature = crypto
  .createHmac("sha256", secret)
  .update(body)
  .digest("hex"); // ← no sha256= prefix

console.log("Body:", body);
console.log("X-Webhook-Signature:", signature); // ← new header name