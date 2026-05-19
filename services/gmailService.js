const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD // generate app password in Google account
    }
});