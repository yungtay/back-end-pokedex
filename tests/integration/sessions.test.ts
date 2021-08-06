import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { bodySignIn, signUpUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";
import { getRepository } from "typeorm";
import Session from '../../src/entities/Sessions'
import faker from 'faker'

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-in", () => {
  it("should answer with status 200 and a token", async () => {

    await signUpUser()
    const response = await supertest(app).post("/sign-in").send(bodySignIn);

    expect(response.body).toEqual(
      expect.objectContaining({ token: expect.any(String)})
    );

    expect(response.status).toBe(200);
      });

  it("should respond with a 400 for invalid email", async () => {

    const body = {
      email: "test",
      password: "123456"
    }

    const response = await supertest(app).post("/sign-in").send(body);
    expect(response.status).toEqual(400)
  });

  it("should respond with a 400 if there is a missing field to register (email)", async () => {
    const body = {
      password: "123456",
    }
    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toBe(400);
  });

  it("should respond with a 400 if there is a missing field to register (password)", async () => {
    const body = {
      email: faker.internet.email(),
    }
    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toBe(400);
  });

  it("should respond with a 401 if the password don't match", async () => {
    const user = await signUpUser()
    delete user.id
    user.password = "wrong"
    const response = await supertest(app).post("/sign-in").send(user);

    expect(response.status).toBe(401);
  });

  it("should respond with a 401 if the email", async () => {
    const user = await signUpUser()
    delete user.id
    user.email = "wrong@gmail.com"
    const response = await supertest(app).post("/sign-in").send(user);

    expect(response.status).toBe(401);
  });

  it("after sign-in, must be able to verify the token", async () => {
    const user = await signUpUser()
    const { id } = user
    delete user.id
    const response = await supertest(app).post("/sign-in").send(bodySignIn);
    const responseAfter = await getRepository(Session).findOne({
      where: { userId: id }
    });

    console.log(responseAfter)
    expect(response.body.token).toBe(responseAfter.token);
  });

});
