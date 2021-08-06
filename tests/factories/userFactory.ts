import { getRepository } from "typeorm";
import faker from 'faker'
import bcrypt from "bcrypt";

import User from "../../src/entities/User";

export async function signUpUser () {
  const user = await getRepository(User).create({
    email: "email@gmail.com",
    password: bcrypt.hashSync("123456", 10)
  });

  await getRepository(User).save(user);

  return user;
}

export async function signInUser () {
  const user = await getRepository(User).create({
    email: "email@gmail.com",
    password: bcrypt.hashSync("123456", 10)
  });

  await getRepository(User).save(user);

  return user;
}

const bodySignUp = {
  email: faker.internet.email(),
  password: "123456",
  confirmPassword: "123456"
}

const bodySignIn = {
  email: "email@gmail.com",
  password: "123456",
}

export { bodySignUp, bodySignIn }
