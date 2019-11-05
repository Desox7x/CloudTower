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
        let data = await DB.query('SELECT * FROM addInmueble i JOIN Entidad e ON i.idEntidad = e.idEntidad WHERE i.idEntidad = ?', [id])
        console.log(data);
        return data;
    },

    async getInmueble(id) {
        let data = await DB.query('SELECT * FROM addInmueble i JOIN Entidad e ON i.idEntidad = e.idEntidad WHERE idInm = ?', [id]);
        //console.log(data);
        return data;
    },

    async addInmueble(name, estado, desc, ubic, tipo, compra, img,
        moneda, precio, metro, hab, bath, parqueo, lblanca, amueblado, idEntidad) {

        let data = await DB.query('INSERT INTO addInmueble SET nombre = ?, estado = ?, descr = ?, ubic = ?, tipoInm = ?, compra = ?, img = ?, moneda = ?, precio = ?, metro = ?, hab = ?, bano = ?, parqueo = ?, lBlanca = ?, amueblado = ?, idEntidad = ?', [name, estado, desc, ubic, tipo, compra,
            img, moneda, precio, metro, hab, bath, parqueo, lblanca, amueblado, idEntidad]);
        return data;

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

    async searchInmueble(nombre) {
        let data = await DB.query("Select * from addInmueble WHERE nombre LIKE CONCAT('%', ?,  '%')", [nombre]);
        return data;
    },

    async searchFilter(nombre, ubic, tipoInm, estado, compra) {
        console.log(nombre, ubic, tipoInm, estado, compra);
        let query = "SELECT * FROM addInmueble WHERE";
        if(nombre != undefined){
            query+=" nombre LIKE '%"+nombre+"%'"; 
        }
        if(ubic != undefined){
            if(nombre != undefined){query+=" AND "}
            query+=" ubic LIKE '%"+ubic+"%'"; 
        }
        if(tipoInm != undefined){
            if(nombre != undefined || ubic != undefined){query+=" AND "}
            query+=" tipoInm LIKE '%"+tipoInm+"%'"; 
        }
        if(estado != undefined){
            if(nombre != undefined || ubic != undefined || tipoInm != undefined){query+=" AND "}
            query+=" estado LIKE '%"+estado+"%'"; 
        }
        if(compra != undefined){
            if(nombre != undefined || ubic != undefined || tipoInm != undefined || estado != undefined){query+=" AND "}
            query+=" compra LIKE '%"+compra+"%'"; 
        }
        // let data = await DB.query("SELECT * FROM addInmueble WHERE nombre LIKE CONCAT('%', ?,  '%') AND ubic LIKE CONCAT('%', ?,  '%') AND tipoInm LIKE CONCAT('%', ?,  '%') AND estado LIKE CONCAT('%', ?,  '%') AND compra LIKE CONCAT('%', ?,  '%')", [nombre, ubic, tipoInm,
        // estado, compra]);
        let data = await DB.query(query);
        console.log(nombre, ubic, tipoInm, estado, compra);
        return data;
        
    },

    async searchUser(nombre) {
        let data = await DB.query("SELECT * from Entidad WHERE fullname LIKE CONCAT('%', ?,  '%')", [nombre]);
        return data;
    },

    async addReunion(fecha, tiempo, idInm, idEntidad) {
        console.log(fecha, tiempo, idInm, idEntidad, "AGREGADO")
        let data = await DB.query("INSERT INTO reunion SET fecha = ?, tiempo = ?, idInm = ?, idEntidad = ?", [fecha, tiempo, idInm, idEntidad])
        return data;
    },

    async getReunionesEntidad(id) {
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

    async getRepresentantesFromInmueble(id) {
        let data = await DB.query('SELECT * FROM RepInmueble ri JOIN Representantes r ON ri.idRep = r.idRep JOIN Entidad e ON r.idEntidad = e.idEntidad WHERE ri.idInm = ?', [id]);
        console.log(data)
        return data;
    },

    async getRepresentantesEntidad(id){
        let data = await DB.query('SELECT * FROM Representantes r JOIN Entidad e ON r.idEntidad = e.idEntidad WHERE r.idInm = ?', [id]);
        return data;
    },

    async repBelongInmobiliaria(idEntidad, idInm) {
        let data = await DB.query("SELECT * FROM Representantes WHERE idEntidad = ? AND idInm = ?", [idEntidad, idInm]);
        console.log(data);
        console.log(data!=null);
        return data!=null;    
    },

    async createRep(fullname, password, telefono, correo, direccion, idTipoEntidad, idInm) {
        let data = await DB.query('INSERT INTO Entidad SET fullname = ?, password = ?, telefono = ?, correo = ?, direccion = ?, idTipoEntidad = ?', [fullname, password, telefono, correo, direccion, idTipoEntidad, idInm]);
        await DB.query('INSERT INTO Representantes SET idEntidad = ?, idInm = ?', [data.insertId, idInm])
        console.log(data)
    },

    async addRepInmueble(idRep, idInm) {
        let data = await DB.query('INSERT INTO RepInmueble SET idRep = ?, idInm = ?', [idRep, idInm]);
        console.log(data);
    },

  
    async getRepInmuebleEntidad(id) {
        let data = await DB.query('SELECT * FROM RepInmueble ri JOIN Representantes r ON ri.idRep = r.idRep JOIN Entidad e ON r.idEntidad = e.idEntidad WHERE ri.id = ?', [id]);
        return data;
    },

    async addImagesInmueble(img, idInm){
        let data = await DB.query('INSERT INTO imagen SET img = ?, idInm = ?', [img, idInm]);
        return data;
    },

    async getImagenInmuebleEntidad(id){
        let data = await DB.query('SELECT * FROM imagen i JOIN addInmueble e ON i.idInm = e.idInm WHERE i.idInm = ?', [id]);
        return data;
    }




}