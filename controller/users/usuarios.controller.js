import UsuariosServices from '../../services/users/usuareios.services.js';
import bcrypt from 'bcrypt';
import strategia from '../estratégias.auth.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config'

class UsuariosController {
    static buscar = async (req, res) => {
        try{
            const usuarios = await UsuariosServices.buscar();
            res.status(200).json({
                erro: false,
                dados: usuarios})
        }
        catch(err){
            res.status(400).json({message: `${err.message} -> Ocorreu um error!`})
        }
    }
    static criar = async (req, res) => {
        let { nome, email, password} = req.body;
        if(password){
            password = await bcrypt.hash(password, 12);
        }
        try{
            const usuario = await UsuariosServices.criar({nome, email, password});
            res.status(200).json({message: usuario})
        }
        catch(err){
            res.status(400).json({message: `${err.message} -> Ocorreu um error!`})
        }
    }
    static buscaUm = async (req, res) => {
        const { id } = req.params
        try{
            const usuario = await UsuariosServices.bucarUm(id);
            res.status(200).json({message: "usuário localizado", dados: usuario})
        }catch(err){
            res.status(400).json({message: `${err.message} -> Ocorreu um error!`})
        }
    }
    static upgrade = async (req, res) => {
        const { id } = req.params;
        const valores = req.body;
        if(valores.password){
            valores.password = await bcrypt.hash(valores.password, 12);
        }
        try{
            await UsuariosServices.update(valores, id);
            res.status(200).json({message: "usuário atualizado"})
        }catch(err){
            res.status(400).json({message: `${err.message} -> Ocorreu um error!`})
            
        }
    }
    static deletar = async (req, res) => {
        const { id } = req.params;
        try{
            await UsuariosServices.apagar(id);
            res.status(200).json({message: "usuário apagado"})
        }catch(err){
            res.status(400).json({message: `${err.message} -> Ocorreu um error em Controller!`})
        }
    }
    static login = async (req, res ) => {
        const valores = req.body
        const usuario = await UsuariosServices.buscarEmail(valores.email)
        const token = jwt.sign(usuario.id, process.env.JWT_KEY)
        res.set('Authorization', token)
        console.log(usuario)
        res.status(204).json(usuario)
    }
}

export default UsuariosController;