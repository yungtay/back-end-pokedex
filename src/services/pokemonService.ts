import { getRepository } from "typeorm";

import Pokemon from "../entities/Pokemon";


export async function getPokemons(id: number) {

  const pokemons = await getRepository(Pokemon).find({ relations: ["usersPokemons", "usersPokemons.user"]})
  pokemons.forEach(pokemon => {
    if(pokemon.usersPokemons.length){
      pokemon.inMyPokemons = true
    } else {
      pokemon.inMyPokemons = false
    }
    delete pokemon.usersPokemons
  });
  return pokemons;

}
