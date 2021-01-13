import { Request, Response } from "express";

export default {
    async saveArticle(req: Request, res: Response) {
        return res.json({ message: 'saved successfully' })
    }
}