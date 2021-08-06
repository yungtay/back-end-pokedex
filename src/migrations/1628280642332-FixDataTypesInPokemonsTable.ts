import {MigrationInterface, QueryRunner} from "typeorm";

export class FixDataTypesInPokemonsTable1628280642332 implements MigrationInterface {
    name = 'FixDataTypesInPokemonsTable1628280642332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "weight" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "height" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "baseExp"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "baseExp" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "baseExp"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "baseExp" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "height" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "weight" character varying NOT NULL`);
    }

}
