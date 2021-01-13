import { getConnection } from "typeorm"
import Image from "../models/Image"

export default {
    async saveImageToDatabase(imagePath: string, id: number) {
        await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Image)
                .values({
                    path: imagePath,
                    publication_id: id
                })
                .execute();
    }
}