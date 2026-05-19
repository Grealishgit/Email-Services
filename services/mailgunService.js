const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: 'postmaster@hantardev.tech', // mailgun SMTP user
        pass: process.env.MAILGUN_SMTP_PASSWORD
    }
});