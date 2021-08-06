import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getPokemons(req: Request, res: Response) {

  const pokemons = await pokemonService.getPokemons(res.locals.id);

  return res.send(pokemons);

}
