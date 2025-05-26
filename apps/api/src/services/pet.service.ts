import {
  ICreatePetDTO,
  IDeletePetDTO,
  IGetPetByIdDTO,
  IGetPetsQueryDTO,
  IPetService,
  IUpdatePetDTO,
  IAddPetToFavoritesDTO,
  IRemovePetFromFavoritesDTO,
  IGetFavoritePetsByUserIdDTO,
  IIsPetFavoritedByUserDTO,
} from './interfaces/IPetService';

import type { Prisma } from '../../generated/prisma';

import { prisma } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';
import { Pet, FavoritePet } from '@/types/Pet';
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

  public async listPets(data?: IGetPetsQueryDTO): Promise<{ pets: Pet[] }> {
    const whereClause: Prisma.PetWhereInput = {};

    if (data?.species) {
      whereClause.species = data.species;
    }
    if (data?.breed) {
      whereClause.breed = data.breed;
    }
    if (data?.ageRange) {
      whereClause.age = {
        gte: data.ageRange[0],
        lte: data.ageRange[1],
      };
    }

    let pets = await prisma.pet.findMany({
      where: whereClause,
    });

    if (data?.userId) {
      const favoritePets = await this.getFavoritePetsByUserId({
        userId: data.userId,
      });
      const favoritedPetIds = new Set(favoritePets.pets.map(pet => pet.id));
      pets = pets.map(pet => ({
        ...pet,
        isFavorited: favoritedPetIds.has(pet.id),
      }));

      return { pets: pets as Pet[] };
    }

    return { pets: pets as Pet[] };
  }

  public async getMyPets(ownerId: string): Promise<{ pets: Pet[] }> {
    const pets = await prisma.pet.findMany({
      where: { ownerId },
    });
    return { pets: pets as Pet[] };
  }

  public async addPetToFavorites(
    data: IAddPetToFavoritesDTO,
  ): Promise<{ pet: FavoritePet }> {
    const { userId, petId } = data;
    const existingFavorite = await prisma.favoritePet.findUnique({
      where: {
        userId_petId: {
          userId,
          petId,
        },
      },
    });

    if (existingFavorite) {
      throw new HttpError({
        statusCode: HttpStatusCode.CONFLICT,
        message: ResponseMessages.PET_ALREADY_FAVORITED,
      });
    }

    const favoritePet = await prisma.favoritePet.create({
      data: {
        userId,
        petId,
      },
    });
    return { pet: favoritePet as FavoritePet };
  }

  public async removePetFromFavorites(
    data: IRemovePetFromFavoritesDTO,
  ): Promise<void> {
    const { userId, petId } = data;
    const existingFavorite = await prisma.favoritePet.findUnique({
      where: {
        userId_petId: {
          userId,
          petId,
        },
      },
    });

    if (!existingFavorite) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_NOT_IN_FAVORITES,
      });
    }

    await prisma.favoritePet.delete({
      where: {
        userId_petId: {
          userId,
          petId,
        },
      },
    });
  }

  public async getFavoritePetsByUserId(
    data: IGetFavoritePetsByUserIdDTO,
  ): Promise<{ pets: Pet[] }> {
    const { userId } = data;
    const favoritePets = await prisma.favoritePet.findMany({
      where: { userId },
      include: { pet: true },
    });
    const pets = favoritePets.map(fav => fav.pet);
    return { pets: pets as Pet[] };
  }

  public async isPetFavoritedByUser(
    data: IIsPetFavoritedByUserDTO,
  ): Promise<{ isFavorited: { status: boolean } }> {
    const { userId, petId } = data;
    const favoritePet = await prisma.favoritePet.findUnique({
      where: {
        userId_petId: {
          userId,
          petId,
        },
      },
    });
    return { isFavorited: { status: !!favoritePet } };
  }
}
