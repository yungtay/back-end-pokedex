import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as sessionController from "./controllers/sessionController"
import * as pokemonController from './controllers/pokemonController'
import * as usersPokemonController from './controllers/usersPokemonController'
import * as middleware from './middlewares/middewares'

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.errors)

app.post("/sign-up", userController.signUpUsers);
app.post("/sign-in", sessionController.signIn);
app.get("/pokemons",middleware.authorizationToken, pokemonController.getPokemons);
app.post("/my-pokemons/:id/add",middleware.authorizationToken, usersPokemonController.addMyPokemons);
app.post("/my-pokemons/:id/remove",middleware.authorizationToken, usersPokemonController.removeMyPokemons);

app.get("/users", userController.getUsers);
app.get("/users/:email", userController.getUser);



export async function init () {
  await connectDatabase();
}

export default app;
