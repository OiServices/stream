import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { UserRole } from '../enums/enums';
import { AppError } from '../middlewares/error.middleware';

// Helper function to handle errors
const handleControllerError = (error: any, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      error: error,
    });
  }
  next(error);
};

// Register User (Admin, Investor, Organization, Startup)
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role } = req.body;
    const userRole = role as UserRole;
    const user = await authService.registerUser(email, password, userRole);

    res.status(201).json({
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

// Login User
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser(email, password);

    res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};