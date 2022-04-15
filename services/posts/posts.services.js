import Posts from '../../models/post/post.models.js'

class PostsServices{

    static buscar = async ( ) => {
            return await Posts.findAll();
    }
    static criar = async ( valores )=>{
        return await Posts.create(valores);
    }
    static bucarUm = async ( id ) => {
        return await Posts.findOne({where: {id: id}})
    }
    static update = async (valores, id) => {
        return await Posts.update(valores, {where: {id: id}})
    }
    static apagar = async (id) => {
        return await Posts.destroy( { where: { id: id } } );
    }
    
}

export default PostsServices;