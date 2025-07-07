import type { NextFunction, Request, Response } from 'express';

export interface IPetCareController {
  createPetCareRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  updatePetCareRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  getPetCareRequestById(req: Request, res: Response, next: NextFunction): Promise<void>;
  deletePetCareRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  listPetCareRequests(req: Request, res: Response, next: NextFunction): Promise<void>;
  createPetCareProposal(req: Request, res: Response, next: NextFunction): Promise<void>;
  getPetCareProposalById(req: Request, res: Response, next: NextFunction): Promise<void>;
  updatePetCareProposal(req: Request, res: Response, next: NextFunction): Promise<void>;
  deletePetCareProposal(req: Request, res: Response, next: NextFunction): Promise<void>;
  listPetCareProposalsByAdopterId(req: Request, res: Response, next: NextFunction): Promise<void>;
  listProposalsForPetCareRequest(req: Request, res: Response, next: NextFunction): Promise<void>;

  approvePetCareProposal(req: Request, res: Response, next: NextFunction): Promise<void>;
  rejectPetCareProposal(req: Request, res: Response, next: NextFunction): Promise<void>;
}
