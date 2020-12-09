import { Request, Response } from 'express';
import { Multer } from 'multer';
import { getRepository } from 'typeorm';

import Author from '../models/Author';
import Image from '../models/Image';
import Publication from '../models/Publication';
import PublicationTag from '../models/PublicationTag';
import Tag from '../models/Tag';

interface BodyType {
    author: string;
    tags: Array<string>;
    title: string;
    content: string;
}

interface DataType {
    author: string;
    tags: Array<string>;
    title: string;
    content: string;
    images: Array<string>;
}

const getData = (body: BodyType, files: Express.Multer.File[]) => {    
    const {
        author,
        tags,
        title,
        content
    } = body;
    
    const images = files.map(image => {
        return image.filename
    });                            

    const data = {
        author,
        tags,
        title,
        content,
        images
    }
    
    return data;
}

const saveAuthor = async (data: DataType) => {
    const authorRepository = getRepository(Author);
    
    await authorRepository
        .createQueryBuilder()
        .insert()
        .into(Author)
        .values(data)
        .onConflict(`("author") DO NOTHING`)
        .execute();
}

const saveTags = async (data: DataType) => {
    const tagRepository = getRepository(Tag);
    
    data.tags.map(async tag => {                        
        await tagRepository
            .createQueryBuilder()
            .insert()
            .into(Tag)
            .values([{tag}])
            .onConflict(`("tag") DO NOTHING`)
            .execute();
    });  
}

const savePublication = async (data: DataType) => {
    const publicationRepository = getRepository(Publication);
    const authorRepository = getRepository(Author);
    
    const authorId = await authorRepository.findOne(
        {
            where: 
            {
                author: `${data.author}`
            }
        }
    );
    
    const publicationID = await publicationRepository.createQueryBuilder()
        .insert()
        .into(Publication)
        .values([
            { title: data.title, content: data.content, author: authorId }
        ])
        .execute();
    
    return publicationID.raw[0];
}

const saveImages = async (data: DataType, publicationId: number)  => {
    const imageRepository = getRepository(Image);
     
    data.images.map(async image => {
        await imageRepository.createQueryBuilder()
            .insert()
            .into(Image)
            .values([
                { path: image, publication_id: publicationId }
            ])
            .execute();
    });
}

const savePublicationTags = async (data: DataType, publicationId: number) => {
    const publicationTagRepository = getRepository(PublicationTag);
    const tagRepository = getRepository(Tag);
    
    data.tags.map(async tagId => {
        const identifier = await tagRepository.findOne(
            {
                where:
                {
                    tag: `${tagId}`
                }
            }
        );            

        await publicationTagRepository.createQueryBuilder()
            .insert()
            .into(PublicationTag)
            .values([
                { publication_id: publicationId, tag_id: identifier?.id }
            ])
            .execute();
    });

}

export default {    
    async saveToDatabase(req: Request, res: Response) {
        
        // Extract the data from body request
        const data = getData(req.body, req.files as Express.Multer.File[]);
        
        saveAuthor(data)
            .then(result => {
                savePublication(data)
                    .then(publicationId => {
                        saveImages(data, publicationId.id)
                        savePublicationTags(data, publicationId.id)
                    }); 
            });
        saveTags(data);

        return res.json({ message: true });
    }
}