import { getRepository } from "typeorm";

import UserPokemon from "../entities/UserPokemon";


export async function addMyPokemons(userId: number, pokemonId: number) {
  try {
    const pokemons = await getRepository(UserPokemon).insert( {userId, pokemonId } )
    return pokemons.generatedMaps[0];

  } catch(e) {
    console.log(e)
    return false
  }
}

export async function removeMyPokemons(userId: number, pokemonId: number) {
  try {
    const pokemons = await getRepository(UserPokemon).delete( {userId, pokemonId} )
    return pokemons.affected;
  } catch(e) {
    console.log(e)
    return false
  }
}
