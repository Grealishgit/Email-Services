// webhookController.js
import crypto from "crypto";

export const registerWebhook = async (req, res) => {
    try {
        const { url, events } = req.body;

        if (!url || !events?.length) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: url, events",
            });
        }

        const response = await fetch("https://mail.axene.io/v1/webhooks/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.AXENE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, events }),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: data.message || "Failed to register webhook",
                error: data,
            });
        }

        return res.status(201).json({
            success: true,
            message: "Webhook registered. Save the secret in your .env",
            webhookId: data.id,
            secret: data.secret,
            data,
        });

    } catch (error) {
        console.error("Error registering webhook:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// helper function to verify signature


function verifySignature(body, signature, secret) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex"); // no sha256= prefix, just raw hex

  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}

export const handleWebhookEvent = (req, res) => {
  try {
    const signature = req.headers["x-webhook-signature"]; // ← changed

    if (!signature) {
      return res.status(400).json({ success: false, message: "Missing signature header" });
    }

    if (!process.env.AXENE_WEBHOOK_SECRET) {
      return res.status(500).json({ success: false, message: "Webhook secret not configured" });
    }

    if (!verifySignature(req.body, signature, process.env.AXENE_WEBHOOK_SECRET)) {
      return res.status(401).json({ success: false, message: "Invalid signature" });
    }

    const { event, email_id, recipient, timestamp, metadata } = JSON.parse(req.body); // ← event not type

    switch (event) { // ← event not type
      case "email.sent":
        console.log(`Email ${email_id} sent to ${recipient}`);
        break;
      case "email.delivered":
        console.log(`Email ${email_id} delivered to ${recipient}`);
        break;
      case "email.bounced":
        console.log(`Email ${email_id} bounced`, metadata);
        break;
      case "email.opened":
        console.log(`Email ${email_id} opened by ${recipient}`);
        break;
      case "email.clicked":
        console.log(`Email ${email_id} link clicked`, metadata?.url);
        break;
      case "email.failed":
        console.log(`Email ${email_id} failed`, metadata?.error);
        break;
      case "email.complained":
        console.log(`Email ${email_id} complained by ${recipient}`);
        break;
      case "email.unsubscribed":
        console.log(`Email ${email_id} unsubscribed by ${recipient}`);
        break;
      default:
        console.log(`Unhandled event: ${event}`);
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("Webhook handling error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



