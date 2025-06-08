import type { IAdminController } from './interfaces/IAdminController';
import type { IAdminService } from '@/services/interfaces/IAdminService';
import type { NextFunction, Request, Response } from 'express';

import { NODE_ENV } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';
import { AdminService } from '@/services/admin.service';

export class AdminController implements IAdminController {
  private readonly _adminService: IAdminService;

  constructor(adminService: IAdminService = new AdminService()) {
    this._adminService = adminService;
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._adminService.login(req.body);

      const isProduction = NODE_ENV === 'production';
      res.cookie('adminAccessToken', result.token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.LOGIN_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this._adminService.logout(req.user?.id);
      res.cookie('adminAccessToken', '');
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: ResponseMessages.LOGOUT_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAdminProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const adminId = req.user?.id;
      if (!adminId) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          status: 'error',
          message: 'Admin not authenticated',
        });
        return;
      }
      const result = await this._adminService.getAdminProfile(adminId);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAllAdopters(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._adminService.getAllAdopters();
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAdopterById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this._adminService.getAdopterById(id);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async verifyAdopterDocuments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { verified } = req.body;
      const result = await this._adminService.verifyAdopterDocuments({
        adopterId: id,
        verified,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: 'Adopter documents verification status updated',
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateAdopterDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this._adminService.updateAdopterDetails({
        id,
        ...req.body,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: 'Adopter details updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteAdopter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this._adminService.deleteAdopter({ adopterId: id });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: 'Adopter deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // Pet management
  public async getAllPets(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._adminService.getAllPets(req.query);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getPetById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { petId } = req.params;
      const result = await this._adminService.getPetById(petId);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deletePet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { petId } = req.params;
      await this._adminService.deletePet(petId);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: 'Pet deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  public async updatePetStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { petId } = req.params;
      const result = await this._adminService.updatePetStatus(petId, req.body);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: 'Pet status updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // Adoption request management
  public async getAllAdoptionRequests(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._adminService.getAllAdoptionRequests(req.query);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAdoptionRequestById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { requestId } = req.params;
      const result = await this._adminService.getAdoptionRequestById(requestId);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteAdoptionRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { requestId } = req.params;
      await this._adminService.deleteAdoptionRequest(requestId);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: 'Adoption request deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
