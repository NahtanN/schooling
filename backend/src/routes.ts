import { Router } from 'express';
import multer from 'multer';

import config from './config/upload';
import IndexController from './controllers/IndexController';
import ShowController from './controllers/ShowController';
import UploadController from './controllers/UploadController';

const routes = Router();
const upload = multer(config);

routes.get('/', IndexController.index);
routes.get('/article/:id', ShowController.show);
routes.post('/upload', upload.array('images'), UploadController.saveArticle);

export default routes;