import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateColumnInMyPokemons1628278389847 implements MigrationInterface {
    name = 'CreateColumnInMyPokemons1628278389847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "inMyPokemons" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "inMyPokemons"`);
    }

}
