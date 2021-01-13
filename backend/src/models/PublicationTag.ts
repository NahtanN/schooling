import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Publication from './Publication';
import Tag from "./Tag";

@Entity('publication_tags')
export default class PublicationTag {    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    publication_id: number;

    @Column()
    tag_id: number;

    @ManyToOne(() => Publication, publication => publication.publicationConnection)
    @JoinColumn({ name: 'publication_id' })
    publication: Publication;

    @ManyToOne(() => Tag, tag => tag.tagConnection)
    @JoinColumn({ name: 'tag_id' })
    tag: Tag;
}