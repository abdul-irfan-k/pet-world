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
  IListPetCareProposalsByAdopterIdDTO, // Added this line
} from './interfaces/IPetCareService';

import type { IPetCareService } from './interfaces/IPetCareService';
import type { Prisma } from '../../generated/prisma';
import type { PetCareProposal } from '@/types/PetCareProposal';

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

  public async createPetCareProposal(
    data: ICreatePetCareProposalDTO,
  ): Promise<{ petCareProposal: PetCareProposal }> {
    const { petCareRequestId, adopterId, message, proposedFee } = data;
    const newProposal = await prisma.petCareProposal.create({
      data: {
        petCareRequestId,
        adopterId,
        message,
        proposedFee,
      },
    });
    return { petCareProposal: newProposal as PetCareProposal };
  }

  public async getPetCareProposalById(
    data: IGetPetCareProposalByIdDTO,
  ): Promise<{ petCareProposal: PetCareProposal | null }> {
    const proposal = await prisma.petCareProposal.findUnique({
      where: { id: data.id },
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

  public async updatePetCareProposal(
    data: IUpdatePetCareProposalDTO,
  ): Promise<{ petCareProposal: PetCareProposal }> {
    const { id, userId, ...updateData } = data;

    const existingProposal = await prisma.petCareProposal.findUnique({
      where: { id },
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

    if (
      isProposalAdopter &&
      updateData.status &&
      existingProposal.status !== 'pending'
    ) {
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

  public async deletePetCareProposal(
    data: IDeletePetCareProposalDTO,
  ): Promise<void> {
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

    await prisma.petCareProposal.delete({ where: { id } });
  }

  public async listPetCareProposalsByAdopterId(
    data: IListPetCareProposalsByAdopterIdDTO,
  ): Promise<{ petCareProposals: PetCareProposal[] }> {
    const petCareProposals = await prisma.petCareProposal.findMany({
      where: { adopterId: data.adopterId },
      include: {
        petCareRequest: {
          include: {
            pet: true,
          },
        },
      },
    });
    return { petCareProposals: petCareProposals as PetCareProposal[] };
  }

  public async approvePetCareProposal(
    data: IGetPetCareProposalByIdDTO,
  ): Promise<{ petCareProposal: PetCareProposal }> {
    const { id, userId } = data;

    const existingProposal = await prisma.petCareProposal.findUnique({
      where: { id },
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
        id: { not: id }, // Exclude the approved proposal
        status: 'pending',
      },
      data: { status: 'rejected' },
    });

    return { petCareProposal: approvedProposal as PetCareProposal };
  }
}
