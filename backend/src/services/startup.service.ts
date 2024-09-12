import prisma from '../config/database.config';
import { Startup } from '../interfaces';
import { AppError } from '../middlewares/error.middleware';

// Helper function to map Prisma's Startup to your custom Startup interface
const mapPrismaStartupToCustomStartup = (prismaStartup: any): Startup => {
  return {
    id: prismaStartup.id,
    userId: prismaStartup.userId,
    name: prismaStartup.name,
    description: prismaStartup.description,
    website: prismaStartup.website,
    project: prismaStartup.project || null,
    createdAt: prismaStartup.createdAt,
    updatedAt: prismaStartup.updatedAt,
  };
};

// Create or Update Startup Profile (User)
export const upsertStartupProfile = async (
  userId: string,
  startupData: Partial<Startup>
): Promise<Startup | null> => {
  try {
    const existingStartup = await prisma.startup.findUnique({
      where: { userId },
      include: {
        project: true,
      },
    });

    let startup;

    if (existingStartup) {
      startup = await prisma.startup.update({
        where: { userId },
        data: {
          name: startupData.name,
          description: startupData.description,
          website: startupData.website,
        },
        include: {
          project: true,
        },
      });
    } else {
      startup = await prisma.startup.create({
        data: {
          userId,
          name: startupData.name!,
          description: startupData.description!,
          website: startupData.website,
        },
        include: {
          project: true,
        },
      });
    }

    return startup ? mapPrismaStartupToCustomStartup(startup) : null;
  } catch (error) {
    throw new AppError('Error creating or updating startup profile', 500);
  }
};

// Retrieve Startup Profiles and their Projects
export const getAllStartups = async (): Promise<Startup[]> => {
  try {
    const startups = await prisma.startup.findMany({
      include: {
        project: true,
      },
    });

    return startups.map(mapPrismaStartupToCustomStartup);
  } catch (error) {
    throw new AppError('Error retrieving startups', 500);
  }
};

// Get Startup by ID
export const getStartupById = async (userId: string): Promise<Startup | null> => {
  try {
    const startup = await prisma.startup.findUnique({
      where: { userId },
      include: {
        project: true,
      },
    });

    if (!startup) {
      throw new AppError('Startup not found', 404);
    }

    return mapPrismaStartupToCustomStartup(startup);
  } catch (error) {
    throw new AppError('Error retrieving startup', 500);
  }
};