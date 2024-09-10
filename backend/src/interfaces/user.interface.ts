import { UserRole } from '../enums';
import { InvestorProfile } from './investorProfile.interface';
import { Organization } from './organization.interface';
import { Profile } from './profile.interface';
import { SocialMediaLink } from './socialMediaLink.interface';
import { Startup } from './startup.interface';
import { Transaction } from './transaction.interface';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  isActivated: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  profile?: Profile;
  organization?: Organization;
  startup?: Startup;
  investorProfile?: InvestorProfile;
  transactions: Transaction[];
  SocialMediaLink: SocialMediaLink[];
}
