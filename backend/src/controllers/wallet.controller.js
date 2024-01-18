import Wallet from '../models/wallet.model.js';

// Initialize/Create a new wallet
export const initializeWallet = async ({userId, currency}) => {
    try {
        // const { userId, currency = 'RWF' } = req.body;

        // Check if wallet already exists for user
        const existingWallet = await Wallet.findOne({ user: userId });
        if (existingWallet) {
            return res.status(400).json({
                status: 'error',
                message: 'Wallet already exists for this user'
            });
        }

        // Create new wallet
        const wallet = new Wallet({
            user: userId,
            currency
        });

        await wallet.save();

        return wallet;
    } catch (error) {
        return {
            status: 'error',
            message: error.message
        };
    }
};

// Deposit money into wallet
export const deposit = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user._id;

        if (amount <= 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Amount must be greater than 0'
            });
        }

        const wallet = await Wallet.findOne({ user: userId });
        if (!wallet) {
            return res.status(404).json({
                status: 'error',
                message: 'Wallet not found'
            });
        }

        wallet.totalBalance += amount;
        wallet.updatedAt = Date.now();
        await wallet.save();

        return res.status(200).json({
            status: 'success',
            message: 'Deposit successful',
            data: wallet
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update wallet (for spending)
export const updateWalletBalance = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        const wallet = await Wallet.findOne({ user: userId });
        if (!wallet) {
            return res.status(404).json({
                status: 'error',
                message: 'Wallet not found'
            });
        }

        if (wallet.totalBalance < amount) {
            return res.status(400).json({
                status: 'error',
                message: 'Insufficient funds'
            });
        }

        wallet.totalBalance -= amount;
        wallet.totalUsed += amount;
        wallet.updatedAt = Date.now();
        await wallet.save();

        return res.status(200).json({
            status: 'success',
            message: 'Balance updated successfully',
            data: wallet
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const getWalletBalanceByUserId = async (req, res) => {
    try {
        const userId = req.user._id;

        const wallet = await Wallet.findOne({ user: userId });
        if (!wallet) {
            return res.status(404).json({
                status: 'error',
                message: 'Wallet not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            data: {
                balance: wallet.totalBalance,
                currency: wallet.currency,
                totalUsed: wallet.totalUsed
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}