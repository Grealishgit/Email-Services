const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: 'your-brevo-login-email',
        pass: process.env.BREVO_SMTP_KEY // xsmtpsib-... key
    }
});