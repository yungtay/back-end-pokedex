import { getRepository } from "typeorm";
import faker from 'faker'

import User from "../../src/entities/User";

export async function signUpUser () {
  const user = await getRepository(User).create({
    email: "email@email.com",
    password: "123456"
  });

  await getRepository(User).save(user);

  return user;
}

const body = {
  email: faker.internet.email(),
  password: "123456",
  confirmPassword: "123456"
}

export { body }
