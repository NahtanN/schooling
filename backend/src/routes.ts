import { Router } from 'express';
import multer from 'multer';

import config from './config/upload';
import IndexController from './controllers/IndexController';
import ShowController from './controllers/ShowController';
import UploadController from './controllers/UploadController';
import ManageTagsController from './controllers/ManageTagsController';

const routes = Router();
const upload = multer(config);

routes.get('/', IndexController.index);

routes.get('/article/:id', ShowController.show);

routes.post('/upload', UploadController.saveArticle); // upload.array('images')

routes.post('/admin/manage-tags/create', ManageTagsController.createTag);
routes.delete('/admin/manage-tags/delete', ManageTagsController.deleteTag);

export default routes;