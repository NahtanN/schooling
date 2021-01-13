import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";

import ManageAuthor from './ManageAuthorController';
import ManageTagsController from './ManageTagsController';
import ManageImageController from './ManageImageController';

import Author from "../models/Author";
import Publication from "../models/Publication";

import Tag from "../models/Tag";
import PublicationTag from "../models/PublicationTag";

interface BodyType {
    author: string;
    title: string;
    content: string;
    tags: Array<string>;
}

interface DataType extends BodyType{
    image: string;
}

const getData = (body: BodyType, file: Express.Multer.File) => {
    return {
        author: body.author,
        title: body.title,
        content: body.content,
        tags: body.tags,
        image: file.filename
    }    
}

const saveAuthor = async (author: string) => {
    return await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Author)
            .onConflict("(author) DO NOTHING")
            .values({ author })
            .execute();
}

const savePublication = async (data: DataType) => {
    const tag = await ManageTagsController.findTag(
        typeof data.tags == "string" ? (data.tags) : data.tags.shift()
    )
    const authorId = await ManageAuthor.findAuthor(data.author)
    
    const publication = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Publication)
        .values({
            title: data.title,
            content: data.content,
            author: authorId,
            thumbnailTag: tag            
        })
        .execute();

    return publication.raw[0];
}

const saveOnePublicationTag = (tag: string, publicationId: number) => {
    const tagRepository = getRepository(Tag);

    tagRepository.findOne(
        {
            where:
            {
                tag: `${tag}`
            }
        }).then(identifier => {            
            getConnection()
                .createQueryBuilder()
                .insert()
                .into(PublicationTag)
                .values([
                    { publication_id: publicationId, tag_id: identifier?.id }
                ])
                .execute();
    });
}

const saveManyPublicationTags = (data: Array<string>, publicationId: number) => {
    data.forEach(tag => {
        saveOnePublicationTag(tag, publicationId);
    });
}

const savePublicationTags = (tags: Array<string>, publicationId: number) => {
    tags.length == 1 ? saveOnePublicationTag(tags[0], publicationId) 
        : saveManyPublicationTags(tags, publicationId);
}

export default {
    async saveArticle(req: Request, res: Response) { 
        const data = getData(req.body, req.file as Express.Multer.File);

        saveAuthor(data.author)
            .then(author => {
                savePublication(data)
                    .then(publicationID => {
                        ManageImageController.saveImageToDatabase(data.image, publicationID);
                        
                        if (typeof data.tags != "string") savePublicationTags(data.tags, publicationID)

                    })
            });

        return res.json({ message: 'saved successfully' });
    }
}