import Usuarios from '../../models/users/usuarios.models.js'

class UsuariosServices{

    static buscar = async ( ) => {
            return await Usuarios.findAll();
    }
    static criar = async ( valores )=>{
        return await Usuarios.create(valores);
    }
    static bucarUm = async ( id ) => {
        return await Usuarios.findOne({where: {id: id}})
    }
    static update = async (valores, id) => {
        return await Usuarios.update(valores, {where: {id: id}})
    }
    static apagar = async (id) => {
        return await Usuarios.destroy( { where: { id: id } } );
    }
    static buscarEmail = async (email) => {
        return await Usuarios.findOne({where: {email: email}})
    }
    
}

export default UsuariosServices;