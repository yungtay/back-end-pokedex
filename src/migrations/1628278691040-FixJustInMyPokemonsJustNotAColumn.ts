import {MigrationInterface, QueryRunner} from "typeorm";

export class FixJustInMyPokemonsJustNotAColumn1628278691040 implements MigrationInterface {
    name = 'FixJustInMyPokemonsJustNotAColumn1628278691040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "inMyPokemons"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "inMyPokemons" boolean NOT NULL`);
    }

}
