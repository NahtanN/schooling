import { json, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Publication from '../models/Publication';
import publicationView from '../views/publication_view';

const render = async (param: string) => {
    const publicationsRepository = getRepository(Publication);

    const publication = publicationsRepository.findOneOrFail({
        where: {
            id: param
        },

        relations: ['publicationConnection']        
    });

    return publication;
}

export default {
    show(req: Request, res: Response) {
        render(req.params.id)
            .then(publication => {                
                return res.status(200).json(publicationView.render(publication));
            }).catch(err => res.json({ error: "Could not find publication" }))
    }
}