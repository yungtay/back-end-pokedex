import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../entities/User";
import * as schemes from '../aux/schemes'

export async function getUsers() {
  const users = await getRepository(User).find({});

  return users;
}

export async function getUser(email: string) {
  const users = await getRepository(User).findOne({
    where: {email}
  });

  return users;
}

export async function signUpUsers(userBody: UserBody) {
  
  try {
    const userBodyScheme: boolean = await schemes.userBodyScheme.validateAsync(userBody)
    userBody.password = bcrypt.hashSync(userBody.password, 10);
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
