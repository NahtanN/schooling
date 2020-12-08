import { Request, Response } from 'express';
import { Multer } from 'multer';
import { getRepository, IsNull } from 'typeorm';

import Author from '../models/Author';
import Image from '../models/Image';
import Publication from '../models/Publication';
import PublicationTag from '../models/PublicationTag';
import Tag from '../models/Tag';

interface BodyType {
    author: string;
    tag: Array<string>;
    title: string;
}

const getData = (body: BodyType, files: Express.Multer.File[]) => {
    const {
        author,
        tag,
        title
    } = body;

    const requestImages = files;
    
    const images = requestImages.map(image => {
        return image.filename
    });                            
    
    const data = {
        author,
        tag,
        title,
        images
    }
    
    return data;
}

export default {
    async createArticle(req: Request, res: Response) {
        // Extract the data from body request
        const data = getData(req.body, req.files as Express.Multer.File[]);
        
        const authorRepository = getRepository(Author);
        const publicationRepository = getRepository(Publication);
        const tagRepository = getRepository(Tag);
        const publicationTagRepository = getRepository(PublicationTag);
        const imageRepository = getRepository(Image);

        await authorRepository
            .createQueryBuilder()
            .insert()
            .into(Author)
            .values(data)
            .onConflict(`("author") DO NOTHING`)
            .execute();               
        
        data.tag.map(async tag => {                        
            await tagRepository
                .createQueryBuilder()
                .insert()
                .into(Tag)
                .values([{tag}])
                .onConflict(`("tag") DO NOTHING`)
                .execute();
        });

        return res.json({ message: 'success' });
    }
}