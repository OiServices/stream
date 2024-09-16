import { Request, Response, NextFunction } from 'express';
import * as contactService from '../services/contact.service';
import { AppError } from '../middlewares/error.middleware';

export const submitContactForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, subject, message } = req.body;
    await contactService.submitContactForm(name, email, subject, message);
    
    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};