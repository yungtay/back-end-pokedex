import { Request, Response } from "express";

import * as userService from "../services/userService";

export async function getUsers(req: Request, res: Response) {
  const users = await userService.getUsers();
  res.send(users);
}


export async function getUser(req: Request, res: Response) {
  const { email } = req.params
  if(!email) return res.sendStatus(400)
  const user = await userService.getUser(email);
  res.send(user);

}

export async function signUpUsers(req: Request, res: Response) {

  const { email, password, confirmPassword } = req.body
  if (!email || !password || !confirmPassword) return res.sendStatus(400)
  const users = await userService.signUpUsers(req.body);

  if (users) {
    return res.sendStatus(201);
  } else if (users === undefined) {
    return res.sendStatus(409)
  } else if (users === false) {
    return res.sendStatus(400)

  }
}
