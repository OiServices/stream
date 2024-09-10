import { Project } from "./project.interface";

export interface Startup {
    id: string;
    userId: string;
    name: string;
    description: string;
    website?: string;
    project?: Project;
    createdAt: Date;
    updatedAt: Date;
}
  