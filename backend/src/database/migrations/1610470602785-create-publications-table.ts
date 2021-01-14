import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPublicationsTable1610470602785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'publications',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'                    
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'content',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'author_id',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'thumbnailTag_id',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'month',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'day',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'year',
                    type: 'integer',
                    isNullable: false
                },
            ],
            foreignKeys: [
                {
                    name: 'fk_publications_1',
                    columnNames: ['author_id'],
                    referencedTableName: 'authors',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'fk_publications_2',
                    columnNames: ['thumbnailTag_id'],
                    referencedTableName: 'tags',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('publications');
    }

}
