import { Router } from 'express';

import { schemaValidator } from '@/middleware';
import { signInSchema, signUpSchema } from '@/schemas';

export class AuthRoutes {
  public getRoutes(): Router {
    const router = Router();

    router.post('/signup', schemaValidator(signUpSchema));
    router.post('/signin', schemaValidator(signInSchema));

    return router;
  }
}
