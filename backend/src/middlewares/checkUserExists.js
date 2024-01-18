// import EHttpStatus from "../enums/EHttpStatus";

// const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = EHttpStatus;
import User from '../models/user.model.js';

export const checkUserExists = async (req, res, next) => {
    try {
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) {
        return res.status(400).json({
          status: 'failed',
          message: 'Email already exists'
        })
      }
      next();
    } catch (error) {
      console.error("Error checking user existence:", error);
      res.status(500).json({
        status: 'failed',
        message: 'An error occurred while checking user existence.'
      });
    }
  };