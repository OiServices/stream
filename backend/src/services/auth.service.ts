import prisma from '../config/database.config';
import { hash, compare } from 'bcrypt';
import { generateToken } from '../config/jwt.config';
import { UserRole } from '../enums';
import { AuthRequest } from '../middlewares';
import { User } from '../interfaces';

// Helper function to map Prisma's UserRole to the custom enum UserRole
const mapPrismaRoleToUserRole = (prismaRole: string): UserRole => {
  switch (prismaRole) {
    case 'ADMIN':
      return UserRole.ADMIN;
    case 'INVESTOR':
      return UserRole.INVESTOR;
    case 'ORGANIZATION':
      return UserRole.ORGANIZATION;
    case 'STARTUP':
      return UserRole.STARTUP;
    default:
      throw new Error('Invalid role');
  }
};

// Helper function to map Prisma's user to the custom User interface
const mapPrismaUserToCustomUser = (prismaUser: any): User => {
  return {
    id: prismaUser.id,
    email: prismaUser.email,
    password: prismaUser.password,
    role: mapPrismaRoleToUserRole(prismaUser.role),
    isActivated: prismaUser.isActivated,
    isDeleted: prismaUser.isDeleted,
    createdAt: prismaUser.createdAt,
    updatedAt: prismaUser.updatedAt,
    profile: prismaUser.profile || null,
    organization: prismaUser.organization || null,
    startup: prismaUser.startup || null,
    investorProfile: prismaUser.investorProfile || null,
    transactions: prismaUser.transactions || [],
    SocialMediaLink: prismaUser.SocialMediaLink || [],
  };
};

//Register User
export const registerUser = async (email: string, password: string, role: UserRole): Promise<User> => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      isActivated: true,
    },
    include: {
      profile: true,
      organization: true,
      startup: true,
      investorProfile: true,
      transactions: true,
      SocialMediaLink: true,
    },
  });

  return mapPrismaUserToCustomUser(newUser);
};

// Login User
export const loginUser = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
      organization: true,
      startup: true,
      investorProfile: true,
      transactions: true,
      SocialMediaLink: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.isActivated) {
    throw new Error('Account is not activated');
  }

  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id, mapPrismaRoleToUserRole(user.role));

  return {
    token,
    user: mapPrismaUserToCustomUser(user),
  };
};

// export const verifyAuthToken = (authRequest: AuthRequest): { userId: string; role: string } => {
//   if (!authRequest.user) {
//     throw new Error('Invalid token');
//   }

//   return authRequest.user;
// };
