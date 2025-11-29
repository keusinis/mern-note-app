import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js'
import {connectDB} from './config/db.js';
import {rateLimiter} from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(
    cors({
        origin: "http://localhost:5173/",
    })
);            // allows to access api from frontend
app.use(express.json());    // parse JSON bodies: req.body
app.use(rateLimiter);       // upstash redis ratelimit

app.get('/favicon.ico', (req, res) => {
    res.sendFile('./favicon/icons8-favicon.gif');
});

app.use('/api/notes', notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT:${PORT}`);
    });
});