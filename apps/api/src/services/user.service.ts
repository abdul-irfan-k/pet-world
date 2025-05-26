import type {
  IUserService,
  ICreateAddressDTO,
  IGetAddressesByUserIdDTO,
  IGetAddressByIdDTO,
  IUpdateAddressDTO,
  IDeleteAddressDTO,
} from '@/services/interfaces/IUserService';

import { prisma } from '@/config';
import { Location } from '@/types/Location';

export class UserService implements IUserService {
  public async addAddress(
    data: ICreateAddressDTO,
  ): Promise<{ location: Location }> {
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

  public async getAddressesByUserId(
    data: IGetAddressesByUserIdDTO,
  ): Promise<{ locations: Location[] }> {
    const { userId } = data;
    const locations = await prisma.location.findMany({
      where: { userId },
      orderBy: {
        isDefault: 'desc',
      },
    });
    return { locations };
  }

  public async getAddressById(
    data: IGetAddressByIdDTO,
  ): Promise<{ location: Location | null }> {
    const { userId, id: addressId } = data;
    const location = await prisma.location.findUnique({
      where: { id: addressId, userId },
    });
    return { location };
  }

  public async updateAddress(
    data: IUpdateAddressDTO,
  ): Promise<{ location: Location | null }> {
    const { id: addressId, userId, ...updateData } = data;
    const existingLocation = await prisma.location.findUnique({
      where: { id: addressId, userId },
    });

    if (!existingLocation) {
      return { location: null };
    }

    if (updateData.isDefault === true) {
      await prisma.location.updateMany({
        where: { userId, isDefault: true, NOT: { id: addressId } }, // Exclude the current address
        data: { isDefault: false },
      });
    }

    const updatedLocation = await prisma.location.update({
      where: { id: addressId },
      data: updateData,
    });
    return { location: updatedLocation };
  }

  public async deleteAddress(
    data: IDeleteAddressDTO,
  ): Promise<{ location: Location | null }> {
    const { userId, id: addressId } = data;
    const existingLocation = await prisma.location.findUnique({
      where: { id: addressId, userId },
    });

    if (!existingLocation) {
      return { location: null };
    }

    const deletedLocation = await prisma.location.delete({
      where: { id: addressId },
    });
    return { location: deletedLocation };
  }
}
