import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { bodySignIn, signUpUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";
import { getRepository } from "typeorm";
import { createPokemon } from "../factories/pokemonFactory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /pokemons", () => {
  it("should answer with status 200 and an array of pokemons", async () => {

    await signUpUser()
    await createPokemon()
    const response = await supertest(app).post("/sign-in").send(bodySignIn);
    const pokemons = await supertest(app).get("/pokemons").set('Authorization', `Bearer ${response.body.token}`)

    expect(pokemons.body).toStrictEqual(expect.arrayContaining([expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      number: expect.any(Number),
      image: expect.any(String),
      weight: expect.any(Number),
      height: expect.any(Number),
      baseExp: expect.any(Number),
      description: expect.any(String),
      inMyPokemons: expect.any(Boolean)

    })]))    
  })

  it("should answer with status 401 if authorization isn't present", async () => {

    await signUpUser()
    await createPokemon()
    const response = await supertest(app).post("/sign-in").send(bodySignIn);
    const pokemons = await supertest(app).get("/pokemons")

    expect(pokemons.status).toBe(401)    
  })

  it("should answer with status 401 if authorization isn't present", async () => {

    await signUpUser()
    await createPokemon()
    const response = await supertest(app).post("/sign-in").send(bodySignIn);
    const pokemons = await supertest(app).get("/pokemons").set('Authorization', `Bearer 123`)

    expect(pokemons.status).toBe(401)    
  })
})
