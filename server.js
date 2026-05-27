import express from 'express';
import dotenv from 'dotenv';
import sendgrid from './routes/sendgridRoutes.js';
import resend from './routes/resendRoutes.js';
import brevo from './routes/brevoRoutes.js'
import axene from './routes/axeneRoutes.js'
import axeneWebhook from './routes/axeneRoutes.js'
dotenv.config();


const app = express();

app.use('/api/axene/webhook', axeneWebhook);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use('/api/sendgrid', sendgrid);
app.use('/api/resend', resend);
app.use('/api/brevo', brevo);
app.use('/api/axene', axene);



app.get('/', (req, res) => {
    res.json({
        status: 200,
        message: "Server Alive!",
        timeStamp: new Date().toLocaleString()
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

