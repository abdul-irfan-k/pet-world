import jwt from 'jsonwebtoken';

import type {
  IAdminService,
  IDeleteAdopterDTO,
  IGetAdminProfileResponse,
  IGetAdopterByIdResponse,
  IGetAllAdoptersResponse,
  ILoginAdminDTO,
  ILoginAdminResponse,
  IUpdateAdopterDetailsDTO,
  IUpdateAdopterDetailsResponse,
  IVerifyAdopterDocumentsDTO,
  IVerifyAdopterDocumentsResponse,
} from './interfaces/IAdminService';

import { Prisma } from '@/../generated/prisma';
import { prisma, env } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';
import { PetAdopter } from '@/types/User';
import { HttpError, verifyPassword } from '@/utils';

export class AdminService implements IAdminService {
  public async login(data: ILoginAdminDTO): Promise<ILoginAdminResponse> {
    const admin = await prisma.admin.findUnique({
      where: { email: data.email },
    });

    if (!admin) {
      throw new HttpError({
        statusCode: HttpStatusCode.UNAUTHORIZED,
        message: ResponseMessages.INVALID_CREDENTIALS,
      });
    }

    const isPasswordValid = await verifyPassword(data.password, admin.password);
    if (!isPasswordValid) {
      throw new HttpError({
        statusCode: HttpStatusCode.UNAUTHORIZED,
        message: ResponseMessages.INVALID_CREDENTIALS,
      });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d',
      },
    );

    const { password, ...adminWithoutPassword } = admin;
    return { token, admin: adminWithoutPassword };
  }

  public async logout(adminId: string | undefined): Promise<void> {
    console.log(`Admin with ID: ${adminId} logged out.`);
    return Promise.resolve();
  }

  public async getAdminProfile(
    adminId: string,
  ): Promise<IGetAdminProfileResponse> {
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, email: true, createdAt: true, updatedAt: true },
    });

    if (!admin) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.USER_NOT_FOUND,
      });
    }
    return { admin };
  }

  public async getAllAdopters(): Promise<IGetAllAdoptersResponse> {
    const adopters = (await prisma.pet_Adopter.findMany({
      include: { user: true },
    })) as PetAdopter[];
    return { adopters };
  }

  public async getAdopterById(
    adopterId: string,
  ): Promise<IGetAdopterByIdResponse> {
    const adopter = (await prisma.pet_Adopter.findUnique({
      where: { id: adopterId },
      include: { user: true },
    })) as PetAdopter | null;

    if (!adopter) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.USER_NOT_FOUND,
      });
    }
    return { adopter };
  }

  public async verifyAdopterDocuments(
    data: IVerifyAdopterDocumentsDTO,
  ): Promise<IVerifyAdopterDocumentsResponse> {
    const { adopterId, verified } = data;
    const existingAdopter = await prisma.pet_Adopter.findUnique({
      where: { id: adopterId },
    });

    if (!existingAdopter) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.USER_NOT_FOUND,
      });
    }

    let updatedDocuments: Prisma.InputJsonValue | undefined =
      existingAdopter.documents ?? undefined;
    if (typeof updatedDocuments === 'object' && updatedDocuments !== null) {
      updatedDocuments = {
        ...(updatedDocuments as object),
        adminVerified: verified,
      };
    } else {
      updatedDocuments = { adminVerified: verified };
    }

    const adopter = await prisma.pet_Adopter.update({
      where: { id: adopterId },
      data: {
        documents: updatedDocuments,
        updatedAt: new Date(),
      },
    });
    return { adopter: adopter as PetAdopter };
  }

  public async updateAdopterDetails(
    data: IUpdateAdopterDetailsDTO,
  ): Promise<IUpdateAdopterDetailsResponse> {
    const { id, userId, ...updateData } = data;

    if (userId) {
      console.warn(`Attempt to update userId for adopter ${id} was ignored.`);
    }

    const existingAdopter = await prisma.pet_Adopter.findUnique({
      where: { id },
    });
    if (!existingAdopter) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.USER_NOT_FOUND,
      });
    }

    const dataToUpdate: Prisma.Pet_AdopterUpdateInput = {};

    if (updateData.adharNumber !== undefined)
      dataToUpdate.adharNumber = updateData.adharNumber;
    if (updateData.documents !== undefined) {
      //eslint-disable-next-line
      //@ts-ignore
      dataToUpdate.documents =
        updateData.documents === null ? Prisma.DbNull : updateData.documents;
    }
    if (updateData.yearOfExperience !== undefined)
      dataToUpdate.yearOfExperience = updateData.yearOfExperience;
    if (updateData.certifications !== undefined)
      dataToUpdate.certifications = updateData.certifications;
    if (updateData.overview !== undefined) {
      //eslint-disable-next-line
      //@ts-ignore
      dataToUpdate.overview =
        updateData.overview === null ? Prisma.DbNull : updateData.overview;
    }
    dataToUpdate.updatedAt = new Date();

    const adopter = await prisma.pet_Adopter.update({
      where: { id },
      data: dataToUpdate,
    });
    return { adopter: adopter as PetAdopter };
  }

  public async deleteAdopter(data: IDeleteAdopterDTO): Promise<void> {
    const { adopterId } = data;
    const existingAdopter = await prisma.pet_Adopter.findUnique({
      where: { id: adopterId },
    });

    if (!existingAdopter) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.USER_NOT_FOUND,
      });
    }

    await prisma.pet_Adopter.delete({ where: { id: adopterId } });
  }
}
