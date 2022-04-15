import passport from 'passport';
import {Strategy as LocalStrategy } from 'passport-local';
import {Strategy as bearerStrategy } from 'passport-http-bearer'
import jwt from 'jsonwebtoken';
import bcrypt from  'bcrypt'
import Usuario from '../models/users/usuarios.models.js';
import 'dotenv/config'


const ObjVerificar = {
    usernameField: 'email',
    passordField: 'password',
    session: false
}
passport.use(new LocalStrategy(ObjVerificar, async (email, senha, done) => {
    try{
        const usuario = await Usuario.findOne({where: {email: email}})
        if(usuario){
            if(await bcrypt.compare(senha, usuario.password)){
                 done(null, usuario)
            }else{
                 done('A senha informada está incorreta')
            }
        }else{
             done("usuário não existe")
        }
    }catch(err){
         done(err)
    }
}))

passport.use( new bearerStrategy(async (token, done)=>{
    try{
        const Token = jwt.verify(token, process.env.JWT_KEY);
        const usuario = await Usuario.findOne({where: {id: Token}});
        done(null, usuario)
    }catch(err){
        done(`'${err}'-> Você não está logado`)
    }
}))
export const privateRouterLocal = (req, res, next) => {
    passport.authenticate('local', {session: false}, (erro, usuario, info)=>{
        if(erro){
            res.status(409).json({message: erro.message});
        }else{
            if(!usuario){
                res.status(401).json({message: `Usuário não localizado!`});
            }else{
                req.user = usuario;
                return next();
            }
        }
    })(req, res, next)
}
export const privateRouterBaerer = (req, res, next)=> {
    passport.authenticate('bearer', {session:false}, (erro, usuario, info)=>{
        if(erro){
            res.status(404).json({message: erro.message});
        }else{
            if(!usuario){
                res.status(401).json({message: `usuário não localizado`})
            }else{

                return next();
            }
        }
    })(req, res, next);
}

export default passport;


// const privateRouter = (req, res, next) => {
//     const athFunc = passport.authenticate('local', usuario, done){
//         return usuario ? done(): done({messagem: "error!"})
//     }
// }