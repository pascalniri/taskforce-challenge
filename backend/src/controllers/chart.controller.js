import Budget from '../models/budget.model.js';

// Utility functions
const groupByKey = (array, key) => 
  array.reduce((acc, item) => ({
    ...acc,
    [item[key]]: [...(acc[item[key]] || []), item]
  }), {});

const sumAmount = items => 
  items.reduce((sum, item) => sum + item.budgetAmount, 0);

const formatDate = date => 
  new Date(date).toISOString().split('T')[0];

// Pure function to process date-based statistics
const processBudgetDateStats = budgets => {
  const groupedByDate = groupByKey(budgets, 'formattedDate');
  
  return Object.entries(groupedByDate).map(([date, items]) => {
    const categoryBreakdown = Object.entries(groupByKey(items, 'budgetTitle'))
      .map(([category, categoryItems]) => ({
        category,
        amount: sumAmount(categoryItems),
        count: categoryItems.length
      }));

    return {
      date,
      totalAmount: sumAmount(items),
      categories: categoryBreakdown,
      count: items.length
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Pure function to process category-based statistics
const processBudgetCategoryStats = budgets => {
  const groupedByCategory = groupByKey(budgets, 'budgetTitle');
  
  return Object.entries(groupedByCategory).map(([category, items]) => ({
    category,
    totalAmount: sumAmount(items),
    count: items.length,
    averageAmount: sumAmount(items) / items.length,
    dates: items.map(item => formatDate(item.budgetDate))
  }))
  .sort((a, b) => b.totalAmount - a.totalAmount);
};

// Controller functions that use the pure functions
export const getBudgetDateStats = async (userId) => {
  try {
    const budgets = await Budget.find({ user: userId })
      .lean()
      .exec();

    const budgetsWithFormattedDate = budgets.map(budget => ({
      ...budget,
      formattedDate: formatDate(budget.budgetDate)
    }));

    return {
      status: 'success',
      data: processBudgetDateStats(budgetsWithFormattedDate)
    };
  } catch (error) {
    throw new Error(`Error getting budget date stats: ${error.message}`);
  }
};

export const getBudgetCategoryStats = async (userId) => {
  try {
    const budgets = await Budget.find({ user: userId })
      .lean()
      .exec();

    return {
      status: 'success',
      data: processBudgetCategoryStats(budgets)
    };
  } catch (error) {
    throw new Error(`Error getting budget category stats: ${error.message}`);
  }
};

// Example usage in an Express route handler
 const budgetStatsController = {
  async getDateStats(req, res) {
    try {
      const stats = await getBudgetDateStats(req.user._id);
      res.json(stats);
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: error.message
      });
    }
  },

  async getCategoryStats(req, res) {
    try {
      const stats = await getBudgetCategoryStats(req.user._id);
      res.json(stats);
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: error.message
      });
    }
  }
};

export default budgetStatsController;