import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/conn.js';
import { notFound, errorHandler } from './middleware/error/ErrorMiddleware.js';
import AuthRouter from './routes/auth/AuthRoutes.js';
import Client from './routes/client/ClientRoutes.js'
import Appointment from './routes/Appointment/AppointmentRoutes.js'
connectDB();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ 
  origin: 'http://localhost:3000', 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();

// Define your routes
app.get('/', (req, res) => {
  res.send('This is server');
});

app.use('/api/UserRoutes', AuthRouter);
app.use('/api/ClientRoutes', Client);
app.use('/api/AppointmentRoutes', Appointment);

// Register the notFound and errorHandler middleware after defining routes
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});