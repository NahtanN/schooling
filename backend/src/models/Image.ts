import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Publication from './Publication';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    // @Column()
    // publication_id: number;

    @OneToOne(() => Publication, pb => pb.image)
    @JoinColumn({ name: 'publication_id' })
    publication: Publication;
}