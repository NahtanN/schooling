import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Publication from "./Publication";
import PublicationTag from './PublicationTag';

@Entity('tags')
export default class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string;

    @OneToMany(() => Publication, pb => pb.thumbnailTag)
    publications: Publication[];

    @OneToMany(() => PublicationTag, pt => pt.tag)
    tagConnection: PublicationTag[];
}