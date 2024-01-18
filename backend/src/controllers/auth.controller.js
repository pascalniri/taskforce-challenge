import dotenv from 'dotenv';
import User from '../models/user.model.js';  // Note: You'll need to add .js extension
import { registerValidation, loginValidation } from '../validation.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import EHttpStatus from '../enums/EHttpStatus.js';
import { initializeWallet } from './wallet.controller.js';

const { BAD_REQUEST, UNAUTHORIZED, OK, INTERNAL_SERVER_ERROR, CREATED } = EHttpStatus;

dotenv.config();

export const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(BAD_REQUEST).json({
      status: 'failed',
      message: error.details[0]?.message
    });
  }

  try {
    // password hashing using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Creating new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    // Create and assign token
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
    const userWithoutPassword = _.omit(savedUser.toObject(), ['password']);

    await initializeWallet({ userId: savedUser._id, currency: 'USD' });

      // Initialize wallet with USD currency
    res.status(CREATED).json({
      status: 'success',
      message: 'User created successfully',
      data: {
      user: userWithoutPassword,
      token: token
      }
    });

  } catch (error) {
    console.error("Error saving user:", error);
    res.status(BAD_REQUEST).json({
      status: 'failed',
      message: 'An error occurred while saving user.'
    });
  }
};

//ROUTE FOR LOGGING IN THE EXISTING USER
export const login =  async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(BAD_REQUEST).json({
    status: 'failed',
    message: error.details[0]?.message
  });

  try {
    // Check if user exists in db
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(BAD_REQUEST).json(
      {
        status: 'failed',
        message: 'Email or password is wrong.'
      }
    )

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(UNAUTHORIZED).json({ status: 'failed', message: 'Email or password is wrong.' });

    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
    res.json({
      status: 'success',
      message: 'Logged in successfully',
      data: {
        status: "success",
        token: token
      }
    }).status(OK);

  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send('An error occurred during login.')
  }
};
