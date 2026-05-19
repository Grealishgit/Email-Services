const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 587,
    auth: {
        user: 'resend', // literally the string 'resend'
        pass: process.env.RESEND_API_KEY // re_... key
    }
});