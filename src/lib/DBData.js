const DB = require('../database');


module.exports = {

    async getAllUsers() {
        let data = await DB.query('SELECT fullname, telefono, correo, direccion, descripcion, idTipoEntidad FROM entidad');
        //console.log(data);
        return data;
    },

    async getUserById(id) {
        let data = await DB.query('SELECT idEntidad, idTipoEntidad, fullname, telefono, correo, direccion, idImg, descripcion FROM entidad WHERE idEntidad = ? LIMIT 1', [id]);
        //console.log(data);
        return data;
    },

    async updateUserImg(img, id) {
        console.log(img, id)
        let data = await DB.query("UPDATE entidad SET idImg = ? WHERE idEntidad = ? ", [img, id]);
        console.log(data)
    },

    async updateUserInfo(name, desc, tel, dir, id) {
        console.log(name, desc, tel, dir, id);
        let data = await DB.query("UPDATE entidad SET fullname = ?, descripcion = ?, telefono = ?, direccion = ? WHERE idEntidad = ? ", [name, desc, tel, dir, id]);
        console.log(data);
    },

    async getUserTipoEntidad(id) {
        let data = await DB.query('SELECT idTipoEntidad FROM entidad WHERE idEntidad = ?', [id]);
        console.log(data);
        return data;
    },

    async getAllInmuebles() {
        let data = await DB.query('SELECT * FROM addInmueble i JOIN Entidad e ON i.idEntidad = e.idEntidad')
        return data;
    },
    async getAllInmueblesEntidad(id) {
        let data = await DB.query('SELECT * FROM addInmueble i JOIN Entidad e ON i.idEntidad = e.idEntidad WHERE i.idEntidad = ?',[id])
        console.log(data);
        return data;
    },

    async getInmueble(id){
        let data = await DB.query('SELECT * FROM addInmueble i JOIN Entidad e ON i.idEntidad = e.idEntidad WHERE idInm = ?', [id]);
        //console.log(data);
        return data;
    },

    async addInmueble(name, desc, ubic, tipo, img, compra,
     moneda, precio, metro, hab, bath, parqueo, lblanca, amueblado, idEntidad) {
        
        let data = await DB.query('INSERT INTO addInmueble SET nombre = ?, descr = ?, ubic = ?, tipoInm = ?, img = ?, compra = ?, moneda = ?, precio = ?, metro = ?, hab = ?, bano = ?, parqueo = ?, lBlanca = ?, amueblado = ?, idEntidad = ?', [name, desc, ubic, tipo, img, compra,
            moneda, precio, metro, hab, bath, parqueo, lblanca, amueblado, idEntidad]);
        console.log(data);
        
    },

    async updateInmo(nombre, descr, ubic, precio, id) {
        console.log(nombre, descr, ubic, precio, id);
        let data = await DB.query('UPDATE addInmueble SET nombre = ?, descr = ?, ubic = ?, precio = ? WHERE idInm = ? ', [nombre, descr, ubic, precio, id]);
        console.log(data);
    },

    async addContract(dir, typeP, dateCon, price, cur, nameC, mailC, telC, nameR, mailR, telR) {
        const newCon = {
            dir,
            typeP,
            dateCon,
            price,
            cur,
            nameC,
            mailC,
            telC,
            nameR,
            mailR,
            telR
        };
           
        let data = await DB.query('INSERT INTO addContract SET dir = ?, typeP = ?, dateCon = ?, price = ?, cur = ?, nameC = ?, mailC = ?, telC = ?, nameR = ?, mailR = ?, telR = ?', [dir, typeP, dateCon, price, cur, nameC,
            mailC, telC, nameR, mailR, telR]);
        console.log(data);
           
    },
    
    async deleteProperty(id) {
        let data = await DB.query('DELETE FROM addInmueble WHERE idInm = ?', [id]);
        console.log(data);
    },

    async searchInmueble(nombre){
        let data = await DB.query("Select * from addInmueble WHERE nombre LIKE CONCAT('%', ?,  '%')",[nombre]);
        return data;
    },

    async searchUser(nombre){
        let data = await DB.query("SELECT * from Entidad WHERE fullname LIKE CONCAT('%', ?,  '%')",[nombre]);
        return data;
    },

    async addReunion(fecha, tiempo, idInm, idEntidad){
        console.log(fecha, tiempo, idInm, idEntidad, "AGREGADO")
        let data = await DB.query("INSERT INTO reunion SET fecha = ?, tiempo = ?, idInm = ?, idEntidad = ?", [fecha, tiempo, idInm, idEntidad])
        return data;
    },

    async getReunionesEntidad(id){
        let data = await DB.query('SELECT * FROM reunion r JOIN addinmueble i ON r.idInm = i.idInm WHERE i.idEntidad = ?', [id]);
        return data;
    },

    async getAllReunionesEntidad(id) {
        let data = await DB.query('SELECT * FROM reunion r JOIN Entidad e ON r.idEntidad = e.idEntidad JOIN addInmueble i ON r.idInm = i.idInm WHERE i.idEntidad = ?', [id]);
        return data;
    },

    async deleteReunion(id) {
        let data = await DB.query('DELETE FROM reunion WHERE id = ?', [id]);
        console.log(data);
    },
    
    async getRepresentantesFromEntidad(id) {
        let data = await DB.query('SELECT * FROM Entidad e JOIN Representantes r ON e.idEntidad = r.idEntidad WHERE e.idEntidad = ?', [id]);
        return data;
    }



}