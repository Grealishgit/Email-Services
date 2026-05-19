import sgMail from '@sendgrid/mail'


export const sendEmail = async (req, res) => {
    const API_KEY = process.env.SENDGRID_API_KEY
    sgMail.setApiKey(API_KEY);

    // console.log(API_KEY)
    // sgMail.setDataResidency('eu'); 
    // uncomment the above line if you are sending mail using a regional EU subuser

    try {
        const msg = {
            to: '', // recepient email address here
            from: '', // recepient email address here
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail
        const response = await sgMail.send(msg)
        console.log(response)
        res.status(200).json({
            status: 200,
            message: "Email sent successfully",
            timeStamp: new Date().toLocaleString()
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
            timeStamp: new Date().toLocaleString()
        })
        console.error('Full error body:', JSON.stringify(error.response?.body, null, 2))
    }

}
