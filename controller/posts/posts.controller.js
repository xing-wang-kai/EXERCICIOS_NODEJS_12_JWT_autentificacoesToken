import PostsServices from '../../services/posts/posts.services.js';
import passport from '../estratégias.auth.js'

class PostsController {
    static buscar = async (req, res) => {
        try{
            const posts = await PostsServices.buscar();
            res.status(200).json({
                erro: false,
                dados: posts})
        }
        catch(err){
            res.status(400).json({message: `${err.message} -> Ocorreu um error!`})
        }
    }
    static criar = async (req, res) => {
        let valores = req.body;
        
        try{
            const posts = await PostsServices.criar(valores);
            res.status(200).json({message: posts})
        }
        catch(err){
            res.status(400).json({message: `${err.message} -> Ocorreu um error!`})
        }
    }
    static buscaUm = async (req, res) => {
        const { id } = req.params
        try{
            const posts = await PostsServices.bucarUm(id);
            res.status(200).json({message: "Posts localizado", dados: posts})
        }catch(err){
            res.status(400).json({message: `${err.message} -> Ocorreu um error!`})
        }
    }
    static upgrade = async (req, res) => {
        const { id } = req.params;
        const valores = req.body;
        try{
            await PostsServices.update(valores, id);
            res.status(200).json({message: "Posts atualizado"})
        }catch(err){
            res.status(400).json({message: `${err.message} -> Ocorreu um error!`})
            
        }
    }
    static deletar = async (req, res) => {
        const { id } = req.params;
        try{
            await PostsServices.apagar(id);
            res.status(200).json({message: "Posts apagado"})
        }catch(err){
            res.status(400).json({message: `${err.message} -> Ocorreu um error em Controller!`})
        }
    }
}
export default PostsController;