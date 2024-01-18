import express from 'express';
import verify from '../middlewares/verifyToken.js';
import budgetController from "../controllers/budget.controller.js"
import  budgetStatsController  from "../controllers/chart.controller.js"

const router = express.Router();

const { getAllBudgets, getOneBudget, createBudget, updateBudget, deleteBudget } = budgetController;
const { getCategoryStats, getDateStats} = budgetStatsController;

//GETTING ALL THE BUDGETS
router.get('/', verify, getAllBudgets);

//GETTING ONE BUDGET
router.get('/:id', verify, getOneBudget);

// CATEGORY CHART
router.get('/category-chart', verify, getCategoryStats);

// DATE CHART
router.get('/date-chart', verify, getDateStats);

//CREATING ONE BUDGET
router.post('/', verify, createBudget);

//UPDATING ONE BUDGET
router.patch('/:id', verify, updateBudget);

//DELETING ONE BUDGET
router.delete('/:id', verify, deleteBudget);

export default router;
