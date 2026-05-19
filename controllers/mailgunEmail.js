import formData from 'form-data';
import Mailgun from 'mailgun.js';

export const sendEmail = async (req, res) => {
    const mailgun = new Mailgun(formData);
    const client = mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY,
    });

    try {
        const data = await client.messages.create(process.env.MAILGUN_DOMAIN, {
            from: 'Fullname <hello@yourdomain.com>', // sender email address here
            to: ['receipient email address'], // recepient email address here
            subject: 'Hello!',
            html: '<strong>It works!</strong>',
            text: 'It works!', // plain text fallback
        });

        res.status(200).json({
            status: 200,
            message: 'Email sent successfully',
            data,
            timeStamp: new Date().toLocaleString()
        });
    } catch (error) {
        console.error('Full error:', JSON.stringify(error?.response?.body, null, 2));
        res.status(500).json({
            status: 500,
            message: error.message,
            timeStamp: new Date().toLocaleString()
        });
    }
}