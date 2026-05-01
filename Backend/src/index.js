import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// --- 1. Global Middleware ---
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Allows cookies to be sent across origins
}));

// --- 2. Health Check Route ---
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Task Manager API is running perfectly.' });
});

// --- 3. Mount Routers ---
import authRouter from './routers/auth.router.js';
import teamRouter from './routers/team.router.js';
import projectRouter from './routers/project.router.js';
import taskRouter from './routers/task.router.js';
import dashboardRouter from './routers/dashboard.router.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/teams', teamRouter);
app.use('/api/v1', projectRouter); 
app.use('/api/v1', taskRouter);    
app.use('/api/v1/dashboard', dashboardRouter);

// --- 4. Global Error Handler (MUST BE LAST) ---
app.use(errorHandler);

// --- 5. Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});