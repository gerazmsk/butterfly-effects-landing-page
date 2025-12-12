const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Email configuration
// Use environment variables for email credentials
// Required: SMTP_USER, SMTP_PASS
// Optional: SMTP_HOST (default: smtp.gmail.com), SMTP_PORT (default: 587)
let transporter = null;

if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
} else {
    console.warn('Warning: SMTP credentials not configured. Email sending will fail.');
    console.warn('Please set SMTP_USER and SMTP_PASS environment variables in Railway.');
}

// Email endpoint
app.post('/api/sendLead', async (req, res) => {
    try {
        const { name, phone, pageUrl } = req.body;

        // Validate input
        if (!name || !phone) {
            return res.status(400).json({ 
                success: false, 
                error: 'Name and phone are required' 
            });
        }

        // Basic phone validation (contains digits)
        if (!/\d/.test(phone)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Phone number must contain digits' 
            });
        }

        // Check if email is configured
        if (!transporter) {
            return res.status(500).json({ 
                success: false, 
                error: 'Email service not configured' 
            });
        }

        const timestamp = new Date().toISOString();
        const emailBody = `New ABA lead from Deerfield Beach landing:
Name: ${name}
Phone: ${phone}
Page URL: ${pageUrl || 'Not provided'}
Time: ${timestamp}`;

        // Send email
        const mailOptions = {
            from: process.env.SMTP_USER || 'noreply@butterflyeffects.com',
            to: 'georgii.zalygin@butterflyeffects.com',
            subject: 'New ABA lead – Deerfield Beach landing',
            text: emailBody,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to send email' 
        });
    }
});

// Serve static files for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

