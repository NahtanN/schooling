import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Publication from './Publication';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @Column({
        select: false
    })
    publication_id: number;

    @ManyToOne(() => Publication, pl => pl.image)
    @JoinColumn({ name: 'publication_id' })
    publication: Publication;
}