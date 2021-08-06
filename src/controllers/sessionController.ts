import { Request, Response } from "express";

import * as sessionService from "../services/sessionService";

export async function signIn(req: Request, res: Response) {

  const { email, password } = req.body
  if ( !email || !password ) return res.sendStatus(400)
  const token = await sessionService.signIn(req.body);
  

  if (token) {
    return res.send(token);
  } else if (token === undefined) {
    return res.sendStatus(401)
  } else if (token === false) {
    return res.sendStatus(400)

  }
}
