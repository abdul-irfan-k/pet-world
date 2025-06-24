import type { IUserService } from '@/services/interfaces/IUserService';
import type { NextFunction, Request, Response } from 'express';

import { HttpStatusCode, ResponseMessages } from '@/constants';
import { UserService } from '@/services';
import { HttpError } from '@/utils';

export class UserController {
  private readonly _userService: IUserService;

  constructor(userService: IUserService = new UserService()) {
    this._userService = userService;
  }

  // Address Methods
  public async addAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }

      const result = await this._userService.addAddress({
        ...req.body,
        userId,
      });
      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        data: result,
        message: 'Address added successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAddresses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }
      const result = await this._userService.getAddressesByUserId({ userId }); // Pass as DTO
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: 'Addresses retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAddressById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id: addressId } = req.params;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }
      const result = await this._userService.getAddressById({
        userId,
        id: addressId,
      });
      if (!result.location) {
        throw new HttpError({
          statusCode: HttpStatusCode.NOT_FOUND,
          message: 'Address not found',
        });
      }
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: 'Address retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id: addressId } = req.params;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }
      const result = await this._userService.updateAddress({
        userId,
        id: addressId,
        ...req.body,
      });
      if (!result.location) {
        throw new HttpError({
          statusCode: HttpStatusCode.NOT_FOUND,
          message: 'Address not found',
        });
      }
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: 'Address updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id: addressId } = req.params;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }
      const result = await this._userService.deleteAddress({
        userId,
        id: addressId,
      }); // Pass as DTO
      if (!result.location) {
        throw new HttpError({
          statusCode: HttpStatusCode.NOT_FOUND,
          message: 'Address not found',
        });
      }
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: 'Address deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async createPetAdopterProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }
      const result = await this._userService.createPetAdopterProfile({
        userId,
        ...req.body,
      });
      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        data: result,
        message: 'Pet adopter profile created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getPetAdopterProfileStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }
      const result = await this._userService.getPetAdopterProfileStatus({ userId });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: 'Pet adopter profile status fetched successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getPetAdopterPublicProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, id } = req.query;
      const result = await this._userService.getPetAdopterPublicProfile({ userId: userId as string, id: id as string });

      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: 'Pet adopter profile fetched successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePetAdopterProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }
      const result = await this._userService.updatePetAdopterProfile({
        userId,
        ...req.body,
      });

      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: 'Pet adopter profile updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
