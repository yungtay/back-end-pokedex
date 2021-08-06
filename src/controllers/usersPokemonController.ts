import { Request, Response } from "express";

import * as usersPokemonService from "../services/usersPokemonService";

export async function addMyPokemons(req: Request, res: Response) {
  const { id } = req.params
  if(!parseInt(id)) return res.sendStatus(400)
  const addPokemons = await usersPokemonService.addMyPokemons(res.locals.id, parseInt(id));
  if(addPokemons) return res.sendStatus(200);
  return res.sendStatus(500);
}

export async function removeMyPokemons(req: Request, res: Response) {
  const { id } = req.params
  if(!parseInt(id)) return res.sendStatus(400)
  const addPokemons = await usersPokemonService.removeMyPokemons(res.locals.id, parseInt(id));
  if(addPokemons) return res.sendStatus(200);
  return res.sendStatus(500);
}
