import { BrevoClient } from '@getbrevo/brevo';

export const sendEmail = async (req, res) => {
    const client = new BrevoClient({
        apiKey: process.env.BREVO_API_KEY,
    });

    // console.log(process.env.BREVO_API_KEY);

    try {
        const data = await client.transactionalEmails.sendTransacEmail({
            to: [{ email: 'receipient', name: 'Name' }], // recepient email address here
            sender: { email: 'hello@yourdomain.com', name: 'Hantar Dev' }, // sender email address here
            subject: 'Hello!',
            htmlContent: '<strong>It works!</strong>',
            textContent: 'It works!',
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