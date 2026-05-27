import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "mail.axene.io",
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: "936ee4dc@hantar.indevs.in",
        pass: "jgmghSf7frZWQjuG-QBB8lhTjoVee5fK",
    },
});

await transporter.sendMail({
    from: '"Emailler" <hello@yourdomain.com>',
    to: "eugyneehunter@gmail.com",
    subject: "Welcome aboard",
    html: "<h1>Welcome!</h1><p>Thanks for signing up.</p>",
    text: "Welcome!\n\nThanks for signing up.",
});