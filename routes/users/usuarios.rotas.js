import { Router } from 'express';
import UsuariosController from '../../controller/users/usuarios.controller.js';
import passport from 'passport';
import { privateRouterLocal } from '../../controller/estratégias.auth.js';
const routes = Router();

routes.get('/usuarios', UsuariosController.buscar);
routes.post('/usuarios', UsuariosController.criar);
routes.get('/usuarios/:id', UsuariosController.buscaUm);
routes.put('/usuarios/:id', UsuariosController.upgrade);
routes.delete('/usuarios/:id', UsuariosController.deletar);

routes.post('/login', privateRouterLocal, UsuariosController.login)

export default routes;