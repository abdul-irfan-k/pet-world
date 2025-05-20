import {
  ICreatePetCareRequestDTO,
  IDeletePetCareRequestDTO,
  IGetPetCareRequestByIdDTO,
  IListPetCareRequestsQueryDTO,
  IUpdatePetCareRequestDTO,
} from './interfaces/IPetCareService';

import type { IPetCareService } from './interfaces/IPetCareService';
import type { Prisma } from '../../generated/prisma';

import { prisma } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';
import { PetCareRequest } from '@/types/PetCareRequest';
import { HttpError } from '@/utils';

export class PetCareService implements IPetCareService {
  public async createPetCareRequest(
    data: ICreatePetCareRequestDTO,
  ): Promise<{ petCareRequest: PetCareRequest }> {
    const newPetCareRequest = await prisma.petCareRequest.create({
      data: {
        ...data,
        questions: data.questions as Prisma.InputJsonValue,
      },
    });
    return { petCareRequest: newPetCareRequest as PetCareRequest };
  }

  public async updatePetCareRequest(
    data: IUpdatePetCareRequestDTO,
  ): Promise<{ petCareRequest: PetCareRequest }> {
    const { id, ownerId, ...updateData } = data;
    const existingRequest = await prisma.petCareRequest.findUnique({
      where: { id },
    });

    if (!existingRequest) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_CARE_REQUEST_NOT_FOUND,
      });
    }

    if (existingRequest.ownerId !== ownerId) {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.UNAUTHORIZED_PET_CARE_REQUEST_UPDATE,
      });
    }

    const updatedPetCareRequest = await prisma.petCareRequest.update({
      where: { id },
      data: {
        ...(updateData as Omit<
          typeof updateData,
          'questions' | 'locationId' | 'petId'
        >),
        questions: updateData.questions as Prisma.InputJsonValue,
      },
    });
    return { petCareRequest: updatedPetCareRequest as PetCareRequest };
  }

  public async getPetCareRequestById(
    data: IGetPetCareRequestByIdDTO,
  ): Promise<{ petCareRequest: PetCareRequest | null }> {
    const petCareRequest = await prisma.petCareRequest.findUnique({
      where: { id: data.id },
    });
    return { petCareRequest: petCareRequest as PetCareRequest | null };
  }

  public async deletePetCareRequest(
    data: IDeletePetCareRequestDTO,
  ): Promise<void> {
    const existingRequest = await prisma.petCareRequest.findUnique({
      where: { id: data.id },
    });

    if (!existingRequest) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_CARE_REQUEST_NOT_FOUND,
      });
    }

    if (existingRequest.ownerId !== data.userId) {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.UNAUTHORIZED_PET_CARE_REQUEST_DELETION,
      });
    }
    // delete pet care request proposals

    await prisma.petCareRequest.delete({ where: { id: data.id } });
  }

  public async listPetCareRequests(
    query?: IListPetCareRequestsQueryDTO,
  ): Promise<{ petCareRequests: PetCareRequest[] }> {
    const whereClause: Prisma.PetCareRequestWhereInput = {};

    if (query?.status) {
      whereClause.status = query.status;
    }

    const petCareRequests = await prisma.petCareRequest.findMany({
      where: whereClause,
    });
    return { petCareRequests: petCareRequests as PetCareRequest[] };
  }
}
