import type { IAdminController } from './interfaces/IAdminController';
import type { IAdminService } from '@/services/interfaces/IAdminService';
import type { NextFunction, Request, Response } from 'express';

import { HttpStatusCode, ResponseMessages } from '@/constants';
import { AdminService } from '@/services/admin.service';

export class AdminController implements IAdminController {
  private readonly _adminService: IAdminService;

  constructor(adminService: IAdminService = new AdminService()) {
    this._adminService = adminService;
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this._adminService.login(req.body);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.LOGIN_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this._adminService.logout(req.user?.id);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: ResponseMessages.LOGOUT_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAdminProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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

  public async getAllAdopters(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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

  public async getAdopterById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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

  public async verifyAdopterDocuments(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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

  public async updateAdopterDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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

  public async deleteAdopter(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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
}
