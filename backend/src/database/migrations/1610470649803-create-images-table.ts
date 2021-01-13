import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImagesTable1610470649803 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
                    type: 'varchar',
                    isNullable: false                    
                },
                {
                    name: 'publication_id',
                    type: 'integer',
                    isNullable: false
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
    }

}
