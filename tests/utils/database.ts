import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import Sessions from "../../src/entities/Sessions"
import Pokemon from "../../src/entities/Pokemon"
import UserPokemon from "../../src/entities/UserPokemon"

export async function clearDatabase () {
  await getRepository(UserPokemon).delete({});
  await getRepository(User).delete({});
  await getRepository(Sessions).delete({});
  await getRepository(Pokemon).delete({});

}
