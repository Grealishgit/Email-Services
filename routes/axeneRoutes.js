import express from 'express';
import { sendEmail, sendBulkEmails } from '../controllers/axeneController.js';
import { registerWebhook, handleWebhookEvent } from '../webhooks/axeneWebhook.js'
import { verifySignature } from '../helper/helper.js';

const router = express.Router();

// POST /api/emails/send-email - Send a single email
router.post('/send-email', sendEmail);


// Webhooks
// router.post("/register", registerWebhook);

// Raw body required for signature verification
router.post("/events", express.raw({
    type: "application/json"
}), handleWebhookEvent);

// POST /api/emails/send-bulk - Send multiple emails
router.post('/send-bulk', sendBulkEmails);

export default router;


// json request example
// {
//     "from": {
//         "email": "",
//             "name": ""
//     },
//     "to": [
//         {
//             "email": "",
//             "name": ""
//         }
//     ],
//         "subject": "Your order has shipped",
//             "html": "<h1>Order Shipped</h1><p>Your package is on the way.</p>",
//                 "text": "Order Shipped\n\nYour package is on the way.",
//                     "tags": ["transactional", "order-updates"]
// }

// or

// {
//   "from": { "email": "" },
//   "to": "",
//   "subject": "Your order has shipped"
// }