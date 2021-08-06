import { getRepository } from "typeorm";
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt'

import User from "../entities/User";
import Session from "../entities/Sessions"
import * as schemes from '../aux/schemes'

export async function signIn(userBody: UserBody) {

  try {
    const userBodyScheme: boolean = await schemes.signInBodyScheme.validateAsync(userBody)
  } catch (e) {
    console.log(e)
    return false
  }

  const user = await getRepository(User).findOne({ where: { email: userBody.email } })
  if(!user) return undefined
  if (!bcrypt.compareSync(userBody.password, user.password)) return undefined
  const token = uuid()
  const session = await getRepository(Session).insert({ userId: user.id, token })
  if (session.generatedMaps[0].id) return {token}
}

interface UserBody {
  email: string,
  password: string,
  confirmPassword: string
}
