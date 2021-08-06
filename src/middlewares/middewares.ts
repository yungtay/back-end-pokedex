import { NextFunction, Request, Response } from 'express'

export function errors(err: any, req: Request, res: Response, next: NextFunction){
    console.log(err);
    res.sendStatus(500)
}