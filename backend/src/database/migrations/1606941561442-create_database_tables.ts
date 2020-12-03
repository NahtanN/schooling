import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createDatabaseTables1606941561442 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'writers',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
            ]
        }));

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
                    name: 'writer_id',
                    type: 'integer',
                    isNullable: false
                },
            ],
            foreignKeys: [
                {
                    name: 'fk_publications_1',
                    columnNames: ['writer_id'],
                    referencedTableName: 'writers',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));

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
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
            ]
        }));
        
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
                    type: 'integer'
                },
                {
                    name: 'tag_id',
                    type: 'integer'
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

        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'publication_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'fk_images_1',
                    columnNames: ['publication_id'],
                    referencedTableName: 'publications',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
        await queryRunner.dropTable('publication_tags');
        await queryRunner.dropTable('tags');
        await queryRunner.dropTable('publications');
        await queryRunner.dropTable('writers');        
    }

}
