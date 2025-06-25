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
  IGetAdoptionRequestedPetsDTO,
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
      include: {
        adoptionRequests: true,
      },
    });
    return { pet: pet as Pet | null };
  }

  public async deletePet(data: IDeletePetDTO): Promise<void> {
    const existingPet = await prisma.pet.findUnique({
      where: { id: data.id, isDeleted: false },
    });

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

    await prisma.pet.update({
      where: { id: data.id },
      data: { isDeleted: true },
    });
  }

  public async listPets(data?: IGetPetsQueryDTO): Promise<{ pets: Pet[] }> {
    const whereClause: Prisma.PetWhereInput = { isDeleted: false };

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
      where: { ownerId, isDeleted: false },
    });
    return { pets: pets as Pet[] };
  }

  public async getAdoptionRequestedPets(args: IGetAdoptionRequestedPetsDTO): Promise<{ pets: any }> {
    const { skip = 0, take = 10, adoptionStartDate, adoptionEndDate, ageRange, breed, species } = args;

    const whereClause: Prisma.PetCareRequestWhereInput = {
      isDeleted: false,
      status: 'pending',
    };

    if (adoptionStartDate) {
      whereClause.startDate = { gte: adoptionStartDate };
    }

    if (adoptionEndDate) {
      whereClause.endDate = { lte: adoptionEndDate };
    }

    const petFilter: Prisma.PetWhereInput = {};
    if (ageRange) {
      petFilter.age = { gte: ageRange[0], lte: ageRange[1] };
    }
    if (breed) petFilter.breed = breed;
    if (species) {
      const capitalized = species.map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());
      petFilter.species = {
        in: capitalized,
      };
    }
    if (Object.keys(petFilter).length > 0) {
      whereClause.pet = petFilter;
    }

    const petCareRequests = await prisma.petCareRequest.findMany({
      where: whereClause,
      skip,
      take,
      include: {
        pet: true,
        location: {
          select: {
            name: true,
            apt: true,
            city: true,
            state: true,
            country: true,
          },
        },
      },
    });

    const pets = petCareRequests.map(req => ({
      ...req.pet,
      adoptionRequest: {
        id: req.id,
        startDate: req.startDate,
        endDate: req.endDate,
        amount: req.amount,
        location: req.location,
      },
    }));

    return { pets };
  }

  public async addPetToFavorites(data: IAddPetToFavoritesDTO): Promise<{ pet: FavoritePet }> {
    const { userId, petId } = data;
    const existingFavorite = await prisma.favoritePet.findUnique({
      where: {
        userId_petId: {
          userId,
          petId,
        },
        isDeleted: false,
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

  public async removePetFromFavorites(data: IRemovePetFromFavoritesDTO): Promise<void> {
    const { userId, petId } = data;
    const existingFavorite = await prisma.favoritePet.findUnique({
      where: {
        userId_petId: {
          userId,
          petId,
        },
        isDeleted: false,
      },
    });

    if (!existingFavorite) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_NOT_IN_FAVORITES,
      });
    }

    await prisma.favoritePet.update({
      where: {
        userId_petId: {
          userId,
          petId,
        },
      },
      data: { isDeleted: true },
    });
  }

  public async getFavoritePetsByUserId(data: IGetFavoritePetsByUserIdDTO): Promise<{ pets: Pet[] }> {
    const { userId } = data;
    const favoritePets = await prisma.favoritePet.findMany({
      where: { userId, isDeleted: false },
      include: { pet: true },
    });
    const pets = favoritePets.map(fav => fav.pet) as Pet[];
    return { pets };
  }

  public async isPetFavoritedByUser(data: IIsPetFavoritedByUserDTO): Promise<{ isFavorited: { status: boolean } }> {
    const { userId, petId } = data;
    const favoritePet = await prisma.favoritePet.findUnique({
      where: {
        userId_petId: {
          userId,
          petId,
        },
        isDeleted: false,
      },
    });
    return { isFavorited: { status: !!favoritePet } };
  }
}
