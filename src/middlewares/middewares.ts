import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Session from '../entities/Sessions'

export function errors(err: any, req: Request, res: Response, next: NextFunction){
    console.log(err);
    res.sendStatus(500)
}

export async function authorizationToken(req: Request, res: Response, next: NextFunction) {
      const authorization = req.headers["authorization"];
      if(!authorization) return res.sendStatus(401)
      const token = authorization.split("Bearer ")[1];
    
      const repository = getRepository(Session);
      const session = await repository.findOne({ token });
    
      if (!session) {
        return res.sendStatus(401);
      }
    
      res.locals.id = session.id;
      next();
  }