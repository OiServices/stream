import sendMail from '../email.service';
import { EmailOptions } from '../interfaces/email.interface';
import { Organization } from '../../interfaces/user.interface';
import logger from '../../config/logger.config';

/**
 * Function to send verification email to the organization
 * @param organization 
 */
export const sendVerificationEmail = async (organization: Organization) => {
  const emailOptions: EmailOptions = {
    email: organization.userId, // Assuming userId corresponds to email in the database
    subject: 'Your Organization is Verified',
    template: 'verified',
    body: {
      organizationName: organization.name,
    },
  };

  try {
    await sendMail(emailOptions);
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to send verification email:', err.message || err);
  }
};