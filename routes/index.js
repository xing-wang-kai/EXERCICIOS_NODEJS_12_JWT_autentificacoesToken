import UsuariosRoutes from './users/usuarios.rotas.js';
import PostRouters from './posts/posts.rotas.js'
import express from 'express';

const app = express();
app.use(express.json());

app.use(UsuariosRoutes)
app.use(PostRouters)


export default app;

