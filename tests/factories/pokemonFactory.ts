import { getRepository } from "typeorm";

import Pokemon from "../../src/entities/Pokemon";

export async function createPokemon () {
  const pokemon = await getRepository(Pokemon).create({
      name: "pokemon1",
      number: 1,
      image: "imagePokemon1",
      weight: 1,
      height: 1,
      baseExp: 1,
      description: "descriptionPokemon"
  });

  await getRepository(Pokemon).save(pokemon);
}
