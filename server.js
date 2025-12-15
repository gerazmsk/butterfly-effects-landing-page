// Minimal Express server for Railway
console.log('=== SERVER STARTING ===');
console.log('Node version:', process.version);
console.log('PORT env:', process.env.PORT);

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());
app.use(express.static(__dirname));

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        port: PORT,
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
    });
});

// Email endpoint (simplified - will add back if needed)
app.post('/api/sendLead', (req, res) => {
    console.log('Lead received:', req.body);
    // For now, just return success (email can be configured later)
    res.json({ 
        success: true, 
        message: 'Lead received (email not configured yet)' 
    });
});

// Serve index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
console.log('Starting server on port:', PORT);
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('========================================');
    console.log('✅ SERVER STARTED SUCCESSFULLY');
    console.log('📡 Port:', PORT);
    console.log('🌐 Server ready!');
    console.log('========================================');
});

server.on('error', (err) => {
    console.error('❌ SERVER ERROR:', err);
    process.exit(1);
});

// Keep process alive
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    server.close(() => process.exit(0));
});
