import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTagsTable1610470581957 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tags',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'                    
                },
                {
                    name: 'tag',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tags');
    }

}
