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
  IInitiatePetCarePaymentDTO,
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
            user: true,
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

    // First, verify that the user is the owner of the pet care request
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
          // Assuming you want to include adopter details
          select: {
            id: true,
            name: true,
            email: true, // Add other fields as necessary
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Optional: order by creation date
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
        id: { not: id }, // Exclude the approved proposal
        status: 'pending',
      },
      data: { status: 'rejected' },
    });

    return { petCareProposal: approvedProposal as PetCareProposal };
  }

  public async initiatePetCarePayment(
    data: IInitiatePetCarePaymentDTO,
  ): Promise<{ paymentIntentClientSecret: string | null; petCareProposal: any; petCareRequestId: string }> {
    const { userId, petCareRequestId, petCareProposalId } = data;

    const petCareRequest = await prisma.petCareRequest.findFirst({
      where: {
        id: petCareRequestId,
      },
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
        message: ResponseMessages.UNAUTHORIZED,
      });
    }

    const petCareProposal = await prisma.petCareProposal.findFirst({
      where: {
        id: petCareProposalId,
      },
    });
    if (!petCareProposal) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_CARE_PROPOSAL_NOT_FOUND,
      });
    }

    const requestId = petCareRequest.id;
    const petOwnerId = petCareRequest.ownerId;
    const adopterId = petCareProposal.adopterId;
    const proposedFee = petCareProposal?.proposedFee ?? 0;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: petCareProposal?.proposedFee ?? 0,
      currency: 'usd',
      transfer_group: `care_request_${requestId}_${petOwnerId}_${adopterId}_${Date.now()}`,
      metadata: {
        platform_transaction_type: 'pet_care_payment',
        care_request_id: requestId,
        pet_owner_user_id: petOwnerId,
        pet_adopter_user_id: adopterId,
      },
    });

    return {
      paymentIntentClientSecret: paymentIntent.client_secret,
      petCareProposal: {
        ...petCareProposal,
        proposedFee,
      },
      petCareRequestId: petCareRequest.id,
    };
  }
}
