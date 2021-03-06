import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { bodySignUp } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";
import { getRepository } from "typeorm";
import User from '../../src/entities/User'
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

describe("POST /sign-up", () => {
  it("should answer with status 201", async () => {

    const response = await supertest(app).post("/sign-up").send(bodySignUp);

    expect(response.status).toBe(201);
  });

  it("after registering, must be able to verify the registered email", async () => {

    const response = await supertest(app).post("/sign-up").send(bodySignUp);
    const responseAfter = await getRepository(User).findOne({
      where: { email: bodySignUp.email }
    });

    expect(responseAfter).toEqual(
      expect.objectContaining({
        email: bodySignUp.email
      })
    );
  });

  it("should respond with a 400 if the email isn't valid", async () => {
    const body = {
      email: "test",
      password: "123456",
      confirmPassword: "123456"
    }
    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(400);
  });

  it("should respond with a 400 if there is a missing field to register (email)", async () => {
    const body = {
      password: "123456",
      confirmPassword: "123456"
    }
    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(400);
  });

  it("should respond with a 400 if there is a missing field to register (password)", async () => {
    const body = {
      email: faker.internet.email(),
      confirmPassword: "123456"
    }
    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(400);
  });

  it("should respond with a 400 if there is a missing field to register (confirmPassword)", async () => {
    const body = {
      email: faker.internet.email(),
      password: "123456",
    }
    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(400);
  });

  it("should respond with a 409 if the email is already registered", async () => {
    await supertest(app).post("/sign-up").send(bodySignUp);
    const response = await supertest(app).post("/sign-up").send(bodySignUp);

    expect(response.status).toBe(409);
  });

});
