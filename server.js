// Simple Express server for Railway deployment
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// Email configuration
let transporter = null;
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        console.log('✅ Email transporter configured');
    } catch (error) {
        console.warn('⚠️ Email configuration error:', error.message);
    }
} else {
    console.warn('⚠️ SMTP credentials not configured. Email sending will fail.');
}

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        port: PORT,
        nodeVersion: process.version
    });
});

// Email endpoint
app.post('/api/sendLead', async (req, res) => {
    try {
        const { name, phone, pageUrl } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ 
                success: false, 
                error: 'Name and phone are required' 
            });
        }

        if (!/\d/.test(phone)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Phone number must contain digits' 
            });
        }

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

// Serve index.html for all other routes
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('index.html not found');
    }
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('='.repeat(50));
    console.log('🚀 Server started successfully!');
    console.log(`📡 Listening on port: ${PORT}`);
    console.log(`📁 Directory: ${__dirname}`);
    console.log(`🔧 Node version: ${process.version}`);
    console.log(`📧 Email configured: ${!!transporter}`);
    console.log('='.repeat(50));
});

server.on('error', (err) => {
    console.error('❌ Server error:', err);
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down');
    server.close(() => process.exit(0));
});
