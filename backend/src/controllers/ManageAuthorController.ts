import { getRepository } from "typeorm";
import Author from "../models/Author";

export default {
    async findAuthor(author: string) {
        const authorRepository = getRepository(Author);
        
        return await authorRepository.findOne({
            where:
            {
                author: `${author}`
            }
        });
    }
}