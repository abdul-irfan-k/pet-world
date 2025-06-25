import { Router } from 'express';

import { PetCareController } from '@/controller';
import { authMiddleware } from '@/middleware';

export class PetCareRoutes {
  private readonly _petCareController: PetCareController;

  constructor() {
    this._petCareController = new PetCareController();
  }

  public getRoutes(): Router {
    const router = Router();

    router.post(
      '/requests',
      authMiddleware,
      this._petCareController.createPetCareRequest.bind(this._petCareController),
    );

    router.get('/requests', this._petCareController.listPetCareRequests.bind(this._petCareController));

    router.get(
      '/my-requests',
      authMiddleware,
      this._petCareController.listMyPetCareRequests.bind(this._petCareController),
    );

    router.get('/requests/:requestId', this._petCareController.getPetCareRequestById.bind(this._petCareController));

    router.put(
      '/requests/:requestId',
      authMiddleware,
      this._petCareController.updatePetCareRequest.bind(this._petCareController),
    );

    router.delete(
      '/requests/:requestId',
      authMiddleware,
      this._petCareController.deletePetCareRequest.bind(this._petCareController),
    );

    router.post(
      '/proposals',
      authMiddleware,
      this._petCareController.createPetCareProposal.bind(this._petCareController),
    );

    router.get(
      '/proposals',
      authMiddleware,
      this._petCareController.listPetCareProposalsByAdopterId.bind(this._petCareController),
    );

    router.get('/proposals/:proposalId', this._petCareController.getPetCareProposalById.bind(this._petCareController));

    router.put(
      '/proposals/:proposalId',
      authMiddleware,
      this._petCareController.updatePetCareProposal.bind(this._petCareController),
    );

    router.put(
      '/proposals/:proposalId/approve',
      authMiddleware,
      this._petCareController.approvePetCareProposal.bind(this._petCareController),
    );

    router.put(
      '/proposals/:proposalId/reject',
      authMiddleware,
      this._petCareController.rejectPetCareProposal.bind(this._petCareController),
    );

    router.delete(
      '/proposals/:proposalId',
      authMiddleware,
      this._petCareController.deletePetCareProposal.bind(this._petCareController),
    );

    router.get(
      '/requests/:requestId/proposals',
      authMiddleware,
      this._petCareController.listProposalsForPetCareRequest.bind(this._petCareController),
    );

    router.post(
      '/requests/:requestId/initiate-payment',
      authMiddleware,
      this._petCareController.initiatePetCarePayment.bind(this._petCareController),
    );
    return router;
  }
}
