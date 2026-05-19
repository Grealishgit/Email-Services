import { Resend } from 'resend';


export const sendEmail = async (req, res) => {
    const API_KEY = process.env.RESEND_API_KEY
    const resend = new Resend(API_KEY);
    try {
        const { data, error } = await resend.emails.send({
            // from: 'hello@yourdomain.com',
            // from: 'noreply@yourdomain.com',
            from: 'Fname Lname <hello@yourdomain.com>', // sender email address here
            to: '', // recepient email address here
            subject: 'Hello!',
            html: '<strong>It works!</strong>',
        });

        if (error) return res.status(500).json({ error });

        res.status(200).json({
            status: 200,
            message: 'Email sent successfully',
            data,
            timeStamp: new Date().toLocaleString()
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
            timeStamp: new Date().toLocaleString()
        });
        console.error(error);
    }
}