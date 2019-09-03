const DB = require('../database');

module.exports = {

    async getAllUsers() {
        let data = await DB.query('SELECT fullname, telefono, correo, direccion, descripcion FROM entidad');
        //console.log(data);
        return data;
    },

    async getUserById(id) {
        let data = await DB.query('SELECT idEntidad, fullname, telefono, correo, direccion, idImg, descripcion FROM entidad WHERE idEntidad = ? LIMIT 1', [id]);
        //console.log(data);
        return await data;
    },

    async updateUserImg(img, id){
        console.log(img,id)
        let data = await DB.query("UPDATE entidad SET idImg = ? WHERE idEntidad = ? ", [img,id]);
        console.log(data)
    },

    async updateUserInfo(name,desc,tel, dir, id) {
        console.log(name,desc,tel,dir,id);
        let data = await DB.query("UPDATE entidad SET fullname = ?, descripcion = ?, telefono = ?, direccion = ? WHERE idEntidad = ? ", [name,desc,tel,dir,id]);
        console.log(data);
    }


}