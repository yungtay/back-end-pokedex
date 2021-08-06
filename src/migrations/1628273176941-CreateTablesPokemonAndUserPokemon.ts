import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTablesPokemonAndUserPokemon1628273176941 implements MigrationInterface {
    name = 'CreateTablesPokemonAndUserPokemon1628273176941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usersPokemons" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_22c159e555e32d279a7d03ad64f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" character varying NOT NULL, "height" character varying NOT NULL, "baseExp" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usersPokemons" ADD CONSTRAINT "FK_4f12b9aa2107d6a386961c800ce" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usersPokemons" ADD CONSTRAINT "FK_91a391605935699799f3192b1d7" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usersPokemons" DROP CONSTRAINT "FK_91a391605935699799f3192b1d7"`);
        await queryRunner.query(`ALTER TABLE "usersPokemons" DROP CONSTRAINT "FK_4f12b9aa2107d6a386961c800ce"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
        await queryRunner.query(`DROP TABLE "usersPokemons"`);
    }

}
