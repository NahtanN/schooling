import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Publication from './Publication';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    publication_id: number;

    @ManyToOne(() => Publication, pl => pl.image)
    @JoinColumn({ name: 'publication_id' })
    publication: Publication;
}