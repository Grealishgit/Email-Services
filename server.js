import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sendgrid from './routes/sendgridRoutes.js';
import resend from './routes/resendRoutes.js';
import brevo from './routes/brevoRoutes.js'

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use('/api/sendgrid', sendgrid);
app.use('/api/resend', resend);
app.use('/api/brevo', brevo);

app.get('/', (req, res) => {
    res.json({
        status: 400,
        message: "Server Alive!",
        timeStamp: new Date().toLocaleString()
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

