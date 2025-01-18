const express = require('express');
const router = express.Router()
const Budget = require('../models/budget')
const verify = require('./verifyToken')

//GETTING ALL THE BUDGETS
router.get('/',verify, async (req, res) => {
   try {
    const budgets = await Budget.find()
    res.json(budgets);
     
   } catch (error) {
    res.status(500).json({ message: error.message })
   }
});

//GETTING ONE BUDGET
router.get('/:id',verify,getBudget, (req, res) => {
   res.json(req.budget)
});

//CREATING ONE BUDGET
router.post('/',verify, async (req, res) => {
   const budget = new Budget({
    budgetTitle: req.body.budgetTitle,
    budgetDescription:req.body.budgetDescription,
    budgetAmount: req.body.budgetAmount,
    budgetDate: req.body.budgetDate
   })

   try {
    const newBudget = await budget.save();
    res.status(201).json(newBudget);

   } catch (error) {
    res.status(400).json({ message: error.message })
   }
});

//UPDATING ONE BUDGET
router.patch('/:id',verify,getBudget, async(req, res) => {
    if(req.body.budgetTitle != null) {
        res.budget.budgetTitle = req.body.budgetTitle;
    }
    if(req.body.budgetDescription != null) {
        res.budget.budgetDescription = req.body.budgetDescription;
    }
    if(req.body.budgetAmount != null) {
        res.budget.budgetAmount = req.body.budgetAmount;
    }
    if(req.body.budgetDate != null) {
        res.budget.budgetDate = req.body.budgetDate;
    }

    try {
        const updatedBudget = await res.budget.save();
        res.status(201).json(updatedBudget);
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
});

//DELETING ONE BUDGET
router.delete('/:id',verify,getBudget, async (req, res) => {
      try {
        await res.budget.deleteOne();
        res.json({ message: 'Deleted transaction successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
});

async function getBudget (req, res, next) {
    let budget

    try {
        budget = await Budget.findById(req.params.id)

        if (budget == null) {
            return res.status(404).json({ message: 'Cannot find the transaction.' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.budget = budget;
    next();
}

module.exports = router