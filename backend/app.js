const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
require('dotenv').config();
const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL, 'https://your-production-domain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());

app.use('/api', routes);

module.exports = app;

