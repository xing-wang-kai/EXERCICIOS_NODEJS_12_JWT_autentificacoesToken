import { Router } from 'express';
import PostsController from '../../controller/posts/posts.controller.js';
import passport from 'passport';
import privateRouterBaerer from '../../controller/estratégias.auth.js'
const routes = Router();

routes.get('/posts', PostsController.buscar);
routes.post('/posts', passport.authenticate('bearer', {session: false}), PostsController.criar);
routes.get('/posts/:id', PostsController.buscaUm);
routes.put('/posts/:id', PostsController.upgrade);
routes.delete('/posts/:id', PostsController.deletar);

export default routes;