import postmark from 'postmark';

export const sendEmail = async (req, res) => {
    const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

    try {
        const data = await client.sendEmail({
            From: '',  // sender email address here
            To: '',  // recepient email address here
            Subject: 'Hello!',
            HtmlBody: '<strong>It works!</strong>',
            TextBody: 'It works!', // plain text fallback
            ReplyTo: '',  // support@yourdomain.com
            MessageStream: 'outbound' // default stream
        });

        res.status(200).json({
            status: 200,
            message: 'Email sent successfully',
            data,
            timeStamp: new Date().toLocaleString()
        });
    } catch (error) {
        console.error('Full error:', JSON.stringify(error, null, 2));
        res.status(500).json({
            status: 500,
            message: error.message,
            timeStamp: new Date().toLocaleString()
        });
    }
}