import {
  ICreatePetCareRequestDTO,
  IDeletePetCareRequestDTO,
  IGetPetCareRequestByIdDTO,
  IListPetCareRequestsQueryDTO,
  IUpdatePetCareRequestDTO,
  ICreatePetCareProposalDTO,
  IGetPetCareProposalByIdDTO,
  IUpdatePetCareProposalDTO,
  IDeletePetCareProposalDTO,
  IListPetCareProposalsByAdopterIdDTO,
  IListProposalsForPetCareRequestDTO,
} from './interfaces/IPetCareService';

import type { IPetCareService } from './interfaces/IPetCareService';
import type { Prisma } from '../../generated/prisma';
import type { PetCareProposal } from '@/types/PetCareProposal';

import { prisma, stripe } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';
import { PetCareRequest } from '@/types/PetCareRequest';
import { HttpError } from '@/utils';

export class PetCareService implements IPetCareService {
  public async createPetCareRequest(data: ICreatePetCareRequestDTO): Promise<{ petCareRequest: PetCareRequest }> {
    const newPetCareRequest = await prisma.petCareRequest.create({
      data: {
        ...data,
        questions: data.questions as Prisma.InputJsonValue,
      },
    });
    return { petCareRequest: newPetCareRequest as PetCareRequest };
  }

  public async updatePetCareRequest(data: IUpdatePetCareRequestDTO): Promise<{ petCareRequest: PetCareRequest }> {
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
        ...(updateData as Omit<typeof updateData, 'questions' | 'locationId' | 'petId'>),
        questions: updateData.questions as Prisma.InputJsonValue,
      },
    });
    return { petCareRequest: updatedPetCareRequest as PetCareRequest };
  }

  public async getPetCareRequestById(
    data: IGetPetCareRequestByIdDTO,
  ): Promise<{ petCareRequest: PetCareRequest | null }> {
    const petCareRequest = await prisma.petCareRequest.findUnique({
      where: { id: data.id, isDeleted: false },
    });
    return { petCareRequest: petCareRequest as PetCareRequest | null };
  }

  public async deletePetCareRequest(data: IDeletePetCareRequestDTO): Promise<void> {
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

    await prisma.petCareRequest.update({
      where: { id: data.id },
      data: { isDeleted: true },
    });
  }

  public async listPetCareRequests(
    query?: IListPetCareRequestsQueryDTO,
  ): Promise<{ petCareRequests: PetCareRequest[] }> {
    const whereClause: Prisma.PetCareRequestWhereInput = {
      isDeleted: false,
    };

    if (query?.status) {
      whereClause.status = query.status;
    }

    const petCareRequests = await prisma.petCareRequest.findMany({
      where: whereClause,
    });
    return { petCareRequests: petCareRequests as PetCareRequest[] };
  }

  public async listMyPetCareRequests(
    query?: IListPetCareRequestsQueryDTO,
  ): Promise<{ petCareRequests: PetCareRequest[] }> {
    const whereClause: Prisma.PetCareRequestWhereInput = {
      isDeleted: false,
    };

    if (query?.status) {
      whereClause.status = query.status;
    }

    if (query?.userId) {
      whereClause.ownerId = query.userId;
    }

    const petCareRequests = await prisma.petCareRequest.findMany({
      where: whereClause,
    });
    return { petCareRequests: petCareRequests as PetCareRequest[] };
  }

  public async createPetCareProposal(data: ICreatePetCareProposalDTO): Promise<{ petCareProposal: PetCareProposal }> {
    const { petCareRequestId, adopterId, message, proposedFee, answers } = data;
    const newProposal = await prisma.petCareProposal.create({
      data: {
        petCareRequestId,
        adopterId,
        message,
        proposedFee,
        //eslint-disable-next-line
        //@ts-ignore
        answers: answers ?? null,
      },
    });
    return { petCareProposal: newProposal as PetCareProposal };
  }

  public async getPetCareProposalById(
    data: IGetPetCareProposalByIdDTO,
  ): Promise<{ petCareProposal: PetCareProposal | null }> {
    const proposal = await prisma.petCareProposal.findUnique({
      where: { id: data.id, isDeleted: false },
      include: {
        petCareRequest: {
          include: {
            pet: true,
          },
        },
      },
    });

    if (!proposal) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_CARE_PROPOSAL_NOT_FOUND,
      });
    }

    const isRequestOwner = proposal.petCareRequest.ownerId === data.userId;
    const isProposalAdopter = proposal.adopterId === data.userId;
    if (!isRequestOwner && !isProposalAdopter) {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.UNAUTHORIZED_PET_CARE_PROPOSAL_UPDATE,
      });
    }

    return { petCareProposal: proposal as PetCareProposal | null };
  }

  public async updatePetCareProposal(data: IUpdatePetCareProposalDTO): Promise<{ petCareProposal: PetCareProposal }> {
    const { id, userId, ...updateData } = data;
    const existingProposal = await prisma.petCareProposal.findUnique({
      where: { id, isDeleted: false },
      include: { petCareRequest: true },
    });

    if (!existingProposal) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_CARE_PROPOSAL_NOT_FOUND,
      });
    }

    const isRequestOwner = existingProposal.petCareRequest.ownerId === userId;
    const isProposalAdopter = existingProposal.adopterId === userId;

    if (!isRequestOwner && !isProposalAdopter) {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.UNAUTHORIZED_PET_CARE_PROPOSAL_UPDATE,
      });
    }

    if (isProposalAdopter && updateData.status && existingProposal.status !== 'pending') {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.ADOPTER_CANNOT_CHANGE_STATUS,
      });
    }

    const updatedProposal = await prisma.petCareProposal.update({
      where: { id },
      data: {
        ...updateData,
        proposedFee: updateData.proposedFee,
      },
    });
    return { petCareProposal: updatedProposal as PetCareProposal };
  }

  public async deletePetCareProposal(data: IDeletePetCareProposalDTO): Promise<void> {
    const { id, userId } = data;
    const existingProposal = await prisma.petCareProposal.findUnique({
      where: { id },
    });

    if (!existingProposal) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_CARE_PROPOSAL_NOT_FOUND,
      });
    }

    if (existingProposal.adopterId !== userId) {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.UNAUTHORIZED_PET_CARE_PROPOSAL_DELETION,
      });
    }

    if (existingProposal.status !== 'pending') {
      throw new HttpError({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: ResponseMessages.CANNOT_DELETE_PROCESSED_PROPOSAL,
      });
    }

    await prisma.petCareProposal.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  public async listPetCareProposalsByAdopterId(
    data: IListPetCareProposalsByAdopterIdDTO,
  ): Promise<{ petCareProposals: PetCareProposal[] }> {
    const { adopterId } = data;
    const petCareProposals = await prisma.petCareProposal.findMany({
      where: {
        adopterId,
        isDeleted: false,
      },
      include: {
        petCareRequest: {
          include: {
            pet: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                userName: true,
              },
            },
          },
        },
      },
    });
    return { petCareProposals: petCareProposals as PetCareProposal[] };
  }

  public async listProposalsForPetCareRequest(
    data: IListProposalsForPetCareRequestDTO,
  ): Promise<{ petCareProposals: PetCareProposal[] }> {
    const { petCareRequestId, userId } = data;

    const petCareRequest = await prisma.petCareRequest.findUnique({
      where: { id: petCareRequestId },
    });

    if (!petCareRequest) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_CARE_REQUEST_NOT_FOUND,
      });
    }

    if (petCareRequest.ownerId !== userId) {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.UNAUTHORIZED_PET_CARE_PROPOSAL_ACCESS,
      });
    }

    const petCareProposals = await prisma.petCareProposal.findMany({
      where: {
        petCareRequestId,
        isDeleted: false,
      },
      include: {
        adopter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { petCareProposals: petCareProposals as PetCareProposal[] };
  }

  public async approvePetCareProposal(data: IGetPetCareProposalByIdDTO): Promise<{ petCareProposal: PetCareProposal }> {
    const { id, userId } = data;
    const existingProposal = await prisma.petCareProposal.findUnique({
      where: { id, isDeleted: false },
      include: { petCareRequest: true },
    });

    if (!existingProposal) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_CARE_PROPOSAL_NOT_FOUND,
      });
    }

    if (existingProposal.petCareRequest.ownerId !== userId) {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.UNAUTHORIZED_PROPOSAL_APPROVAL,
      });
    }

    const approvedProposal = await prisma.petCareProposal.update({
      where: { id },
      data: { status: 'approved' },
    });

    await prisma.petCareRequest.update({
      where: { id: existingProposal.petCareRequestId },
      data: { status: 'closed' },
    });

    await prisma.petCareProposal.updateMany({
      where: {
        petCareRequestId: existingProposal.petCareRequestId,
        id: { not: id },
        status: 'pending',
      },
      data: { status: 'rejected' },
    });

    return { petCareProposal: approvedProposal as PetCareProposal };
  }

  public async rejectPetCareProposal(data: IGetPetCareProposalByIdDTO): Promise<{ petCareProposal: any }> {
    const { id, userId } = data;
    const existingProposal = await prisma.petCareProposal.findUnique({
      where: { id, isDeleted: false },
      include: { petCareRequest: true },
    });

    if (!existingProposal) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_CARE_PROPOSAL_NOT_FOUND,
      });
    }

    if (existingProposal.petCareRequest.ownerId !== userId) {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.UNAUTHORIZED_PET_CARE_REQUEST_UPDATE,
      });
    }

    const rejectedProposal = await prisma.petCareProposal.update({
      where: { id },
      data: { status: 'rejected' },
    });

    return { petCareProposal: rejectedProposal as PetCareProposal };
  }
}
