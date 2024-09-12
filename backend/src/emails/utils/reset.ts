import sendMail from '../email.service';
import { EmailOptions } from '../interfaces/email.interface';
import logger from '../../config/logger.config';

/**
 * Function to send password reset email
 * @param email 
 * @param resetToken 
 */
export const sendResetPasswordEmail = async (email: string, resetToken: string) => {
  const resetLink = `https://example.com/reset-password?token=${resetToken}`;
  const emailOptions: EmailOptions = {
    email,
    subject: 'Reset Your Password',
    template: 'reset',
    body: {
      resetLink,
    },
  };

  try {
    await sendMail(emailOptions);
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to send password reset email:', err.message || err);
  }
};