import { Project } from "./project.interface";
import { SocialMediaLink } from "./socialMediaLink.interface";

export interface Organization {
    id: string;
    userId: string;
    name: string;
    description: string;
    website?: string;
    logoUrl?: string;
    isVerified: boolean;
    isDeleted: boolean;
    socialMedia: SocialMediaLink[];
    projects: Project[];
    createdAt: Date;
    updatedAt: Date;
}
  