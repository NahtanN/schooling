import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPublicationTagsTable1610470634015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'publication_tags',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'publication_id',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'tag_id',
                    type: 'integer',
                    isNullable: false
                },
            ],
            foreignKeys: [
                {
                    name: 'fk_publication_tags_1',
                    columnNames: ['publication_id'],
                    referencedTableName: 'publications',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'fk_publication_tags_2',
                    columnNames: ['tag_id'],
                    referencedTableName: 'tags',
                    referencedColumnNames: ['id']
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('publication_tags');
    }

}
