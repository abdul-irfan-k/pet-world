import type {
  IUserService,
  ICreateAddressDTO,
  IGetAddressesByUserIdDTO,
  IGetAddressByIdDTO,
  IUpdateAddressDTO,
  IDeleteAddressDTO,
  ICreatePetAdopterProfileDTO,
  IGetPetAdopterProfileStatusDTO,
  IGetPetAdopterPublicProfileDTO,
  IUpdatePetAdopterProfileDTO,
  ICheckUserNameExistsDTO,
} from '@/services/interfaces/IUserService';

import { prisma } from '@/config';
import { HttpStatusCode } from '@/constants';
import { Location } from '@/types/Location';
import { PetAdopter } from '@/types/User';
import { HttpError } from '@/utils';

export class UserService implements IUserService {
  public async checkUserNameExists(
    data: ICheckUserNameExistsDTO,
  ): Promise<{ exists: boolean; availableUsername?: string }> {
    const { userName } = data;
    const existingUser = await prisma.user.findUnique({
      where: { userName },
    });

    if (existingUser) {
      return { exists: true };
    }

    return { exists: false };
  }

  public async addAddress(data: ICreateAddressDTO): Promise<{ location: Location }> {
    const { userId, ...addressData } = data;

    if (addressData.isDefault) {
      await prisma.location.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    const location = await prisma.location.create({
      data: {
        ...addressData,
        userId,
      },
    });
    return { location };
  }

  public async getAddressesByUserId(data: IGetAddressesByUserIdDTO): Promise<{ locations: Location[] }> {
    const { userId } = data;
    const locations = await prisma.location.findMany({
      where: { userId, isDeleted: false },
      orderBy: {
        isDefault: 'desc',
      },
    });
    return { locations };
  }

  public async getAddressById(data: IGetAddressByIdDTO): Promise<{ location: Location | null }> {
    const { userId, id: addressId } = data;
    const location = await prisma.location.findUnique({
      where: { id: addressId, userId, isDeleted: false },
    });
    return { location };
  }

  public async updateAddress(data: IUpdateAddressDTO): Promise<{ location: Location | null }> {
    const { id: addressId, userId, ...updateData } = data;
    const existingLocation = await prisma.location.findUnique({
      where: { id: addressId, userId },
    });

    if (!existingLocation) {
      return { location: null };
    }

    if (updateData.isDefault === true) {
      await prisma.location.updateMany({
        where: { userId, isDefault: true, NOT: { id: addressId } },
        data: { isDefault: false },
      });
    }

    const updatedLocation = await prisma.location.update({
      where: { id: addressId },
      data: updateData,
    });
    return { location: updatedLocation };
  }

  public async deleteAddress(data: IDeleteAddressDTO): Promise<{ location: Location | null }> {
    const { userId, id: addressId } = data;
    const existingLocation = await prisma.location.findUnique({
      where: { id: addressId, userId, isDeleted: false },
    });

    if (!existingLocation) {
      return { location: null };
    }

    const deletedLocation = await prisma.location.update({
      where: { id: addressId },
      data: { isDeleted: true },
    });
    return { location: deletedLocation };
  }

  public async createPetAdopterProfile(data: ICreatePetAdopterProfileDTO): Promise<{ petAdopter: PetAdopter }> {
    const { userId, ...profileData } = data;

    const existingProfile = await prisma.pet_Adopter.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      throw new Error('Pet adopter profile already exists for this user.');
    }

    const petAdopterProfile = await prisma.pet_Adopter.create({
      //eslint-disable-next-line
      //@ts-ignore
      data: {
        ...profileData,
        yearOfExperience: Number(profileData.yearOfExperience),
        userId,
      },
    });

    return { petAdopter: petAdopterProfile as PetAdopter };
  }

  public async getPetAdopterProfileStatus(data: IGetPetAdopterProfileStatusDTO): Promise<{ exists: boolean }> {
    const { userId } = data;
    const profile = await prisma.pet_Adopter.findUnique({ where: { userId, isDeleted: false } });
    return { exists: !!profile };
  }

  public async getPetAdopterProfile(data: IGetPetAdopterPublicProfileDTO): Promise<{ petAdopter: PetAdopter | null }> {
    const { userId, id } = data;
    let profile = null;
    if (userId) {
      profile = await prisma.pet_Adopter.findUnique({
        where: { userId, isDeleted: false },
      });
    } else if (id) {
      profile = await prisma.pet_Adopter.findUnique({
        where: { id, isDeleted: false },
      });
    }

    if (!profile) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: 'Pet adopter profile not found.',
      });
    }
    return { petAdopter: profile as PetAdopter };
  }

  public async getPetAdopterPublicProfile(
    data: IGetPetAdopterPublicProfileDTO,
  ): Promise<{ petAdopter: PetAdopter | null }> {
    const { userId, id } = data;
    let profile = null;
    if (userId) {
      profile = await prisma.pet_Adopter.findFirst({
        where: { userId, isDeleted: false },
        include: { user: { select: { id: true, name: true, email: true } } },
      });
    } else if (id) {
      profile = await prisma.pet_Adopter.findFirst({
        where: { id, isDeleted: false },
        include: { user: { select: { id: true, name: true, email: true } } },
      });
    }

    if (!profile) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: 'Pet adopter profile not found.',
      });
    }
    return { petAdopter: profile as PetAdopter };
  }

  public async updatePetAdopterProfile(data: IUpdatePetAdopterProfileDTO): Promise<{ petAdopter: PetAdopter | null }> {
    const { userId, ...updateData } = data;
    const existingProfile = await prisma.pet_Adopter.findUnique({ where: { userId, isDeleted: false } });
    if (!existingProfile) {
      throw new HttpError({ statusCode: HttpStatusCode.NOT_FOUND, message: 'Pet adopter profile not found.' });
    }

    const updatedProfile = await prisma.pet_Adopter.update({
      where: { userId },
      //eslint-disable-next-line
      //@ts-ignore
      data: updateData,
    });
    return { petAdopter: updatedProfile as PetAdopter };
  }
}
