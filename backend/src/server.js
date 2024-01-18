import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import budgetsRouter from './routes/budgets.js';
import authRoute from './routes/auth.js';
import walletRoute from './routes/wallet.js';

dotenv.config();

const app = express();

// Enable CORS for all requests
app.use(cors());

// CONNECTING TO THE DATABASE
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const PORT = process.env.PORT || 8000;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.get('/', (req, res) => {
  res.json({
    status: "success",
    message: "Wallet API is live"
  });
});

// MIDDLEWARES
app.use(express.json());

// Route middlewares
app.use("/api/v1/budget", budgetsRouter);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/wallet", walletRoute);

app.listen(PORT, () => console.log("Server Started on port " + PORT));
