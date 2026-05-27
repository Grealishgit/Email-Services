// import { Axene } from "axene";

// const axene = new Axene(process.env.AXENE_KEY);

// await axene.emails.send({
//     from: "support@hantar.indevs.in",
//     to: ["eugyneehunter@gmail.com"],
//     subject: "Test Mail",
//     html: "<p>This is a test mail</p>",
// });


// controllers/axeneEmailController.js

/**
 * Send email using Axene API
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const sendEmail = async (req, res) => {
    const { from, to, subject, html, text, tags = [] } = req.body;

    if (!from?.email || !to || !subject) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: from.email, to, subject",
        });
    }

    const emailData = {
        from_: { email: from.email, name: from.name || "" },
        to: Array.isArray(to) ? to : [{ email: to }],
        subject,
        html,
        text,
        tags,
    };

    try {
        const response = await fetch("https://mail.axene.io/v1/emails/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.AXENE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: data.message || "Failed to send email",
                error: data,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Email sent successfully",
            emailId: data.id,
            data,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};




/**
 * Send bulk emails using Axene API
 */
export const sendBulkEmails = async (req, res) => {
    try {
        const { emails } = req.body;

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Emails array is required'
            });
        }

        const results = [];
        const errors = [];

        // Send emails in parallel (or use Promise.all for better performance)
        for (const email of emails) {
            try {
                const response = await fetch("https://mail.axene.io/v1/emails/", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${process.env.AXENE_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from_: {
                            email: email.from?.email || 'hello@yourdomain.com',
                            name: email.from?.name || 'Your Company'
                        },
                        to: email.to,
                        subject: email.subject,
                        html: email.html,
                        text: email.text || '',
                        tags: email.tags || []
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    results.push({ success: true, emailId: data.id, recipient: email.to });
                } else {
                    errors.push({ success: false, error: data, recipient: email.to });
                }
            } catch (error) {
                errors.push({ success: false, error: error.message, recipient: email.to });
            }
        }

        return res.status(200).json({
            success: true,
            message: `${results.length} emails sent successfully, ${errors.length} failed`,
            results,
            errors
        });

    } catch (error) {
        console.error('Error sending bulk emails:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};