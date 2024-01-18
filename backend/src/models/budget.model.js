import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    budgetTitle: {
        type: String,
        required: true
    },
    budgetDescription: {
        type: String,
        required: true
    },
    budgetAmount: {
        type: Number,
        required: true
    },
    budgetDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Budget', budgetSchema);