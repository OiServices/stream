import { SocialMediaLink } from "./socialMediaLink.interface";

export interface InvestorProfile {
    id: string;
    userId: string;
    investmentBudget?: number;
    interests: string[];
    socialMedia: SocialMediaLink[];
    createdAt: Date;
    updatedAt: Date;
}
  