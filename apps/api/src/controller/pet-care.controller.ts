import type { IPetCareController } from './interfaces/IPetCareController';
import type { IPetCareService } from '@/services/interfaces/IPetCareService';
import type { NextFunction, Request, Response } from 'express';

import { HttpStatusCode, ResponseMessages } from '@/constants';
import { PetCareService } from '@/services';
import { HttpError } from '@/utils';

export class PetCareController implements IPetCareController {
  private readonly _petCareService: IPetCareService;

  constructor(petCareService: IPetCareService = new PetCareService()) {
    this._petCareService = petCareService;
  }

  public async createPetCareRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._petCareService.createPetCareRequest({
        ...req.body,
        ownerId: req.user!.id,
        amount: req.body.amount.toString(),
      });
      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        data: result,
        message: ResponseMessages.CREATED,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updatePetCareRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { requestId } = req.params;
      const result = await this._petCareService.updatePetCareRequest({
        id: requestId,
        userId: req.user!.id,
        ...req.body,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.UPDATED,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getPetCareRequestById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { requestId } = req.params;
      const result = await this._petCareService.getPetCareRequestById({
        id: requestId,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deletePetCareRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { requestId } = req.params;
      await this._petCareService.deletePetCareRequest({
        id: requestId,
        userId: req.user!.id,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: ResponseMessages.DELETED,
      });
    } catch (error) {
      next(error);
    }
  }

  public async listPetCareRequests(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._petCareService.listPetCareRequests({
        ...req.query,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async listMyPetCareRequests(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._petCareService.listMyPetCareRequests({
        userId: req.user!.id,
        ...req.query,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async createPetCareProposal(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._petCareService.createPetCareProposal({
        ...req.body,
        adopterId: req.user!.id,
      });
      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        data: result,
        message: ResponseMessages.CREATED,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getPetCareProposalById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { proposalId } = req.params;
      const result = await this._petCareService.getPetCareProposalById({
        id: proposalId,
        userId: req.user!.id,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updatePetCareProposal(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { proposalId } = req.params;
      const result = await this._petCareService.updatePetCareProposal({
        id: proposalId,
        userId: req.user!.id,
        ...req.body,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.UPDATED,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deletePetCareProposal(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { proposalId } = req.params;
      await this._petCareService.deletePetCareProposal({
        id: proposalId,
        userId: req.user!.id,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: ResponseMessages.DELETED,
      });
    } catch (error) {
      next(error);
    }
  }

  public async listPetCareProposalsByAdopterId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const adopterId = req.user!.id;
      const result = await this._petCareService.listPetCareProposalsByAdopterId({ adopterId });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async approvePetCareProposal(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { proposalId } = req.params;
      const result = await this._petCareService.approvePetCareProposal({
        id: proposalId,
        userId: req.user!.id,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async rejectPetCareProposal(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { proposalId } = req.params;
      const result = await this._petCareService.rejectPetCareProposal({
        id: proposalId,
        userId: req.user!.id,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async listProposalsForPetCareRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { requestId } = req.params;
      const result = await this._petCareService.listProposalsForPetCareRequest({
        petCareRequestId: requestId,
        userId: req.user!.id,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }
}
