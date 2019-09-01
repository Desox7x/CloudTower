const DB = require('../database');

module.exports = {

    async getAllUsers() {
        let data = await DB.query('SELECT fullname, telefono, correo, direccion FROM entidad');
        //console.log(data);
        return data;
    },

    async getUserById(id) {
        let data = await DB.query('SELECT idEntidad, fullname, telefono, correo, direccion, idImg FROM entidad WHERE idEntidad = ? LIMIT 1', [id]);
        //console.log(data);
        return await data;
    },

    async updateUserImg(img, id){
        console.log(img,id)
        let data = await DB.query("UPDATE entidad SET idImg = ? WHERE idEntidad = ? ", [img,id]);
        console.log(data)
    }


}