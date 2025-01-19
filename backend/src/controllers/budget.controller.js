import Budget from '../models/budget.model.js';
import Wallet from '../models/wallet.model.js';

class BudgetController {
    // Get all budgets
    static async getAllBudgets(req, res) {
        try {
            const budgets = await Budget.find({ user: req.user._id });
            res.json(
                {
                    status: "success",
                    data: budgets
                }
            );
        } catch (error) {
            res.status(500).json({ 
                status: "failed",
                message: error.message
            });
        }
    }

    // Get one budget
    static async getOneBudget(req, res) {
        try {
            const budget = await Budget.findById(req.params.id);
            if (budget == null) {
                return res.status(404).json({ message: 'Cannot find the transaction.' });
            }
            res.json({
                status: "success",
                data: budget
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message
             });
        }
    }

    // Create budget
    static async createBudget(req, res) {
        try {
            // First check user's wallet balance
            const wallet = await Wallet.findOne({ user: req.user._id });
            if (!wallet) {
                return res.status(404).json({
                    status: "failed",
                    message: "Wallet not found"
                });
            }

            console.log(wallet);

            if (wallet.totalBalance < req.body.budgetAmount) {
                return res.status(400).json({
                    status: "failed",
                    message: "Insufficient wallet balance for this budget, click on recharge to top up your wallet"
                });
            }

            const budget = new Budget({
                budgetTitle: req.body.budgetTitle,
                budgetDescription: req.body.budgetDescription,
                budgetAmount: req.body.budgetAmount,
                budgetDate: req.body.budgetDate,
                user: req.user._id
            });

            const newBudget = await budget.save();

            // Update wallet balance after budget creation
            wallet.totalBalance -= req.body.budgetAmount;
            await wallet.save();

            res.status(201).json({
                status: "success",
                message: "Budget created successfully",
                data: newBudget
            });
            
        } catch (error) {
            res.status(400).json({ 
                status: "failed",
                message: error.message
            });
        }
    }

    // Update budget
    static async updateBudget(req, res) {
        try {
            const budget = await Budget.findById(req.params.id);
            if (budget == null) {
                return res.status(404).json({ message: 'Cannot find the transaction.' });
            }

            const updateFields = {
                budgetTitle: req.body.budgetTitle,
                budgetDescription: req.body.budgetDescription,
                budgetAmount: req.body.budgetAmount,
                budgetDate: req.body.budgetDate
            };

            Object.keys(updateFields).forEach(key => {
                if (updateFields[key] != null) {
                    budget[key] = updateFields[key];
                }
            });

            const updatedBudget = await budget.save();

            const wallet = await Wallet.findOne({ user: req.user._id });
            if (!wallet) {
                return res.status(404).json({
                    status: "failed",
                    message: "Wallet not found"
                });
            }

            wallet.totalBalance += (req.body.budgetAmount - budget.budgetAmount);
            await wallet.save();

            res.status(201).json(
                {
                    status: "success",
                    message: "Budget updated successfully",
                    data: updatedBudget
                }
            );
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message
             });
        }
    }

    // Delete budget
    static async deleteBudget(req, res) {
        try {
            const budget = await Budget.findById(req.params.id);
            if (budget == null) {
                return res.status(404).json(
                    {
                        status: "failed",
                        message: 'Cannot find the transaction.'
                    }
                );
            }
            const wallet = await Wallet.findOne({ user: req.user._id });
            if (!wallet) {
                return res.status(404).json({
                    status: "failed",
                    message: "Wallet not found"
                });
            }

            wallet.totalBalance += budget.budgetAmount;
            await wallet.save();
            
            await budget.deleteOne();
            res.json({ message: 'Deleted transaction successfully' });
        } catch (error) {
            res.status(500).json({ 
                status: "failed",
                message: error.message
             });
        }
    }

}

export default BudgetController;
