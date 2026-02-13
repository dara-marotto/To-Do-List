import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1771005999352 implements MigrationInterface {
    name = 'CreateTasksTable1771005999352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "colorTag" TO "color_tag"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "color_tag" TO "colorTag"`);
    }

}
