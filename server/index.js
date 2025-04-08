const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/send-sms', async (req, res) => {
    try {
        const result = await client.messages.create({
            body: '🚨 Alert: Your budget limit has been exceeded! Keep your spending in check 💸',
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '+918949728687', // <-- hardcoded number
        });

        res.json({ success: true, sid: result.sid });
    } catch (error) {
        console.error('SMS failed:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
