import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getPokemons(req: Request, res: Response) {

  const pokemons = await pokemonService.getPokemons(res.locals.id);
  if(pokemons) return res.send(pokemons);
  return res.sendStatus(500);
}
