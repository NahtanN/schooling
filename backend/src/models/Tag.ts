import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import PublicationTag from './PublicationTag';

@Entity('tags')
export default class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string;

    @OneToMany(() => PublicationTag, pt => pt.tag)
    tagConnection: PublicationTag[];
}