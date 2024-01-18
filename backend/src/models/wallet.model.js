import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalBalance: {
        type: Number,
        default: 0,
        required: true
    },
    totalUsed: {
        type: Number,
        default: 0,
        required: true
    },
    currency: {
        type: String,
        default: 'RWF',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;