import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Publication from './Publication';

@Entity('writers')
export default class Writer {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Publication, publication => publication.writer)
    publications: Publication[];
}