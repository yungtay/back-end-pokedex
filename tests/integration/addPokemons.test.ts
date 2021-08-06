import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { bodySignIn, signUpUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";
import { getRepository } from "typeorm";
import { createPokemon } from "../factories/pokemonFactory";
import UserPokemon from '../../src/entities/UserPokemon'
import Pokemon from '../../src/entities/Pokemon'
import Sessions from '../../src/entities/Sessions'

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /my-pokemons/:id/add", () => {
  it("should answer with status 200 and an array of pokemons", async () => {

    await signUpUser()
    const pokemon = await createPokemon()
    const response = await supertest(app).post("/sign-in").send(bodySignIn);
    const responseIdUser = await getRepository(Sessions).findOne({
      where: { token: response.body.token }
    });
    const addPokemon = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('Authorization', `Bearer ${response.body.token}`)
    const responseAfter = await supertest(app).get(`/pokemons`).set('Authorization', `Bearer ${response.body.token}`)

    expect(responseAfter.body).toStrictEqual(expect.arrayContaining([expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      number: expect.any(Number),
      image: expect.any(String),
      weight: expect.any(Number),
      height: expect.any(Number),
      baseExp: expect.any(Number),
      description: expect.any(String),
      inMyPokemons: true

    })]))
    
    expect(addPokemon.status).toBe(200) 
  })

  it("should answer with status 401 if authorization isn't present", async () => {

    await signUpUser()
    const pokemon = await createPokemon()
    const response = await supertest(app).post("/sign-in").send(bodySignIn);
    const responseIdUser = await getRepository(Sessions).findOne({
      where: { token: response.body.token }
    });
    const addPokemon = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('Authorization', `Bearer ${response.body.token}`)
    const responseAfter = await supertest(app).get(`/pokemons`).set('Authorization', `Bearer ${response.body.token}`)
    const pokemons = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`)

    expect(pokemons.status).toBe(401)    
  })

  it("should answer with status 401 if authorization isn't valid", async () => {

    await signUpUser()
    const pokemon = await createPokemon()
    const response = await supertest(app).post("/sign-in").send(bodySignIn);
    const responseIdUser = await getRepository(Sessions).findOne({
      where: { token: response.body.token }
    });
    const addPokemon = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('Authorization', `Bearer ${response.body.token}`)
    const responseAfter = await supertest(app).get(`/pokemons`).set('Authorization', `Bearer ${response.body.token}`)
    const pokemons = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('Authorization', `Bearer 123`)

    expect(pokemons.status).toBe(401)    
  })
})

