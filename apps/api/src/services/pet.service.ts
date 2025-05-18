import {
  ICreatePetDTO,
  IDeletePetDTO,
  IGetPetByIdDTO,
  IGetPetsQueryDTO,
  IPetService,
  IUpdatePetDTO,
} from './interfaces/IPetService';

import type { Prisma } from '../../generated/prisma';

import { prisma } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';
import { Pet } from '@/types/Pet';
import { HttpError } from '@/utils';

export class PetService implements IPetService {
  public async createPet(data: ICreatePetDTO): Promise<{ pet: Pet }> {
    const newPet = await prisma.pet.create({
      data: {
        ...data,
        profile: data.profile as Prisma.InputJsonValue,
      },
    });
    return { pet: newPet as Pet };
  }

  public async updatePet(data: IUpdatePetDTO): Promise<{ pet: Pet }> {
    const { id, ...updateData } = data;
    const existingPet = await prisma.pet.findUnique({ where: { id } });

    if (!existingPet) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_NOT_FOUND,
      });
    }

    if (existingPet.ownerId !== data.ownerId) {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.UNAUTHORIZED_PET_UPDATE,
      });
    }

    const updatedPet = await prisma.pet.update({
      where: { id },
      data: {
        ...(updateData as Omit<typeof updateData, 'profile'>),
        profile: updateData.profile as Prisma.InputJsonValue,
      },
    });
    return { pet: updatedPet as Pet };
  }

  public async getPetById(data: IGetPetByIdDTO): Promise<{ pet: Pet | null }> {
    const pet = await prisma.pet.findUnique({
      where: { id: data.id },
    });
    return { pet: pet as Pet | null };
  }

  public async deletePet(data: IDeletePetDTO): Promise<void> {
    const existingPet = await prisma.pet.findUnique({ where: { id: data.id } });

    if (!existingPet) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_NOT_FOUND,
      });
    }

    if (existingPet.ownerId !== data.ownerId) {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.UNAUTHORIZED_PET_DELETION,
      });
    }

    await prisma.pet.delete({
      where: { id: data.id },
    });
  }

  public async listPets(query?: IGetPetsQueryDTO): Promise<{ pets: Pet[] }> {
    const whereClause: Prisma.PetWhereInput = {};

    if (query?.species) {
      whereClause.species = query.species;
    }
    if (query?.breed) {
      whereClause.breed = query.breed;
    }
    if (query?.ageRange) {
      whereClause.age = {
        gte: query.ageRange[0],
        lte: query.ageRange[1],
      };
    }

    const pets = await prisma.pet.findMany({
      where: whereClause,
    });
    return { pets: pets as Pet[] };
  }
}
