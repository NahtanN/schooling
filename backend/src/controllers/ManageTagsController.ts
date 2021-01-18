import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";

import Tag from "../models/Tag";


export default {
    createTag(req: Request, res: Response) {
        const tags = req.body.tags;

        tags.map(async (tag: string) => {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Tag)
                .values({ tag })
                .onConflict("(tag) DO NOTHING")
                .execute()
        });

        return res.json({ message: "Saved" })
    },

    async deleteTag(req: Request, res: Response) {
        const tags = req.body.tags        
        
        const tagsRepository = getRepository(Tag);

        tags.map(async (tag: string) => {
            await tagsRepository.findOne({
                where: 
                {
                    tag: `${tag}`
                }
            }).then(async identifier => {
                await tagsRepository
                    .createQueryBuilder()
                    .delete()
                    .from(Tag)
                    .where("id = :id", { id: identifier?.id })
                    .execute()
            });
        })
    
        return res.status(200).json({ message: "Removed sucessfully" })
    },

    async findTag(tag?: string) {
        const tagsRepository = getRepository(Tag);

        return await tagsRepository.findOne({
            where:
            {
                tag: `${tag}`
            }
        })
    }
}