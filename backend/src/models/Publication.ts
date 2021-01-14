import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Author from './Author';
import PublicationTag from './PublicationTag';
import Image from "./Image";
import Tag from "./Tag";

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

    @ManyToOne(() => Tag, tag => tag.publications)
    @JoinColumn({ name: 'thumbnailTag_id' })
    thumbnailTag: Tag;

    @Column()
    month: string;

    @Column()
    day: number;

    @Column()
    year: number;

    @OneToMany(() => PublicationTag, pt => pt.publication)    
    publicationConnection: PublicationTag[];

    @OneToOne(() => Image, img => img.publication)
    image: Image;
}