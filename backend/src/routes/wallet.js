import express from 'express';
import { 
    getWalletBalanceByUserId as getWalletBalance,
    deposit,
    updateWalletBalance
} from '../controllers/wallet.controller.js';
import verify from '../middlewares/verifyToken.js';

const router = express.Router();

// Get wallet balance
router.get('/balance', verify, getWalletBalance);

// Deposit wallet
router.post('/deposit', verify, deposit);

// Get transaction history
router.get('/', verify, updateWalletBalance);

export default router;