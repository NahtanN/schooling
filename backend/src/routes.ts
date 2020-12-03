import { Router } from 'express';
import multer from 'multer';

import config from './config/upload';
import UploadController from './controllers/UploadController';

const routes = Router();
const upload = multer(config);

routes.get('/',);
routes.post('/upload', upload.array('images'), UploadController.createArticle);

export default routes;