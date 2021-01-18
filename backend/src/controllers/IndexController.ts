import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Publication from '../models/Publication';
import headlineView from '../views/headline_view';

const render = async () => {
    const publicationRepository = getRepository(Publication);

    const publications = await publicationRepository.find({            
        order: {
            id: 'DESC'
        },
        
        relations: ['author', 'image', 'thumbnailTag', 'publicationConnection']
    });

    return publications;
}

export default {
    async index(req: Request, res: Response) {
        render()
            .then(publications => {                
                return res.status(200).json(headlineView.renderMany(publications));
            })        
    }
}