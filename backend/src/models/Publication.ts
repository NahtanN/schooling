import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Writer from './Writer';
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

    @ManyToOne(() => Writer, writer => writer.publications)
    @JoinColumn({ name: 'writer_id' })
    writer: Writer;

    @OneToMany(() => PublicationTag, pt => pt.publication)    
    publicationConnection: PublicationTag[];

    @OneToMany(() => Image, im => im.publication)
    image: Image[];
}