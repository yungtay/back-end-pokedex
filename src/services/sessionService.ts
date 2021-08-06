import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "../entities/User";
import * as schemes from '../aux/schemes'

export async function signUpUsers(userBody: UserBody) {
  
  try {
    const userBodyScheme: boolean = await schemes.userBodyScheme.validateAsync(userBody)
  } catch (e) {
    console.log(e)
    return false
  }

  const users = await getRepository(User).createQueryBuilder()
    .insert()
    .into(User)
    .values(userBody)
    .onConflict(`("email") DO NOTHING`)
    .execute();

  return users.generatedMaps[0].id;
}

interface UserBody {
  email: string ,
  password: string ,
  confirmPassword: string
}
