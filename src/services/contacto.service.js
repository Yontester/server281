import {Contacto, Usuario} from "../database/models"

export default {
    listarContacto: async () => {
        return await Contacto.findAll({
            include: [
                {model: Usuario}
            ]
        });
    },
    agregarContacto: async (nuevoContacto) => {      
        return await Contacto.create(nuevoContacto);
    },
    obtenerContacto: async (id) => {
        return await Contacto.findByPk(id, {
            include: [
                {model: Usuario}
            ]
        });
    },
    editarContacto: async (id, editContacto) => {
        const contacto = await Contacto.findByPk(id);
        if (!contacto) return false;
        await Contacto.update(editContacto,{
            where: {
                id_contacto: id
            },
        });
        return true;
    },
    borrarContacto: async (id) => {
        const contacto = await Contacto.findByPk(id);
        if (!contacto) return false;
        await Contacto.destroy({
            where: {
                id_contacto: id
            },
        });
        return true;
    },

    listarContactoUsuario: async (id) => {
        const datos = await Contacto.findAll({
            where: {
                id_usuario: id
            },
        });
        return datos;
    },
    
    borrarContactoUsuario: async (id_u, id_c) => {
        const datos = await Contacto.destroy({
            where: {
                id_usuario: id_u,
                id_contacto: id_c
            },
        });
        return datos > 0;
    },
    editarContactoUsuario: async (id_u, id_c, editContacto) => {
        const contacto = await Contacto.update(editContacto, {
            where: {
                id_usuario: id_u,
                id_contacto: id_c
            }
        });
        return true;
    }
};