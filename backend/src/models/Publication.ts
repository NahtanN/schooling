import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Author from './Author';
import PublicationTag from './PublicationTag';
import Image from "./Image";

@Entity('publications')
export default class Publication {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => Author, author => author.publications)
    @JoinColumn({ name: 'author_id' })
    author: Author;

    @OneToMany(() => PublicationTag, pt => pt.publication)    
    publicationConnection: PublicationTag[];

    @OneToMany(() => Image, im => im.publication)
    image: Image[];
}