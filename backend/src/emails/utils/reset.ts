import sendMail from '../email.service';
import { EmailOptions } from '../interfaces/email.interface';
import logger from '../../config/logger.config';

/**
 * Function
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
    logger.info(`Reset password email sent to ${email}`);
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to send reset password email:', err.message || err);
  }
};
