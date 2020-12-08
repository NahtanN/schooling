import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Publication from './Publication';

@Entity('authors')
export default class Author {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    author: string;

    @OneToMany(() => Publication, publication => publication.author)
    @JoinColumn({ name: 'author_id' })
    publications: Publication[];
}