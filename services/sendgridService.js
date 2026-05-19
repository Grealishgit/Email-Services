const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey', // literally the string 'apikey'
        pass: process.env.SENDGRID_API_KEY // your SG API key
    }
});