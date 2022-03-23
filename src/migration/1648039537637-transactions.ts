import {MigrationInterface, QueryRunner} from "typeorm";

export class transactions1648039537637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`INSERT INTO transactions VALUES`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
