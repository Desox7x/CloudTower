const DB = require('../lib/DBData')
const pool = require('../database');
const ctrl = {}

ctrl.dashboard = (req, res) => {
    if (req.user.idTipoEntidad == 1) {
        return res.render('postlog/dashboard/cliente');
    }
    if (req.user.idTipoEntidad == 2) {
        return res.render('postlog/dashboard/inmobiliaria');
    }
    if (req.user.idTipoEntidad == 3) {
        return res.render('postlog/dashboard/constructora');
    }

    res.status(403).send('Forbideen');
}

ctrl.inmobiliariaOnly = (req, res) => {
    // if(req.user.idTipoEntidad == 2){
    //     return res.send('AYEE');
    // }
    // res.status(403).send('Forbidden');
    return res.send('AYEE');
}

ctrl.contract = (req, res) => {
    res.render('postlog/contract');
}

ctrl.signaturePad = (req, res) => {
    res.render('postlog/signature_pad');
}

ctrl.addProperty = (req, res) => {
    res.render('postlog/add_property');
}
ctrl.inmueble = (req, res) => {
    res.render('postlog/inmueble');
}


ctrl.addPropertyPOST = async (req, res) => {
    await DB.addInmueble(req.body.nombre, req.body.descr, req.body.ubic, req.body.tipoInm,
        req.body.img, req.body.compra, req.body.moneda, req.body.precio, req.body.metro, 
        req.body.hab, req.body.bano, req.body.parqueo, req.body.lBlanca, req.body.amueblado);
    console.log(req.body);
    res.redirect('/profile');
}

ctrl.addContractPOST = async (req, res) => {
    await DB.addContract(req.body.dir, req.body.typeP, req.body.dateCon, req.body.price,
        req.body.cur, req.body.nameC, req.body.mailC, req.body.telC, req.body.nameR, 
        req.body.mailR, req.body.telR);
    console.log(req.body);
    res.redirect('/profile');
}

ctrl.getProperty = async (req, res) => {
    const inmueble = await DB.getAllInmuebles();  
    console.log(inmueble);
    res.render('postlog/dashboard/cliente', {data: inmueble})
}

ctrl.deleteProperty = async (req, res) => {
    await DB.deleteProperty(req.params.id);
    console.log(req.params);
    res.redirect('/profile/propertylist');
}

ctrl.search = (req, res) => {
    res.render('postlog/search');
}

ctrl.searchResult = (req, res) => {
    res.render('postlog/searchResult');
}

ctrl.uploadPOST = async (req, res) => {

    await DB.updateUserImg(req.file.filename, req.user.idEntidad);
    res.redirect('/profile');
};

ctrl.updateUser = async (req, res) => {
    await DB.updateUserInfo(req.body.fullname, req.body.descripcion, req.body.telefono, req.body.direccion, req.user.idEntidad);
    res.redirect('/profile')
    console.log(req.body)
};

ctrl.userProfile = async(req, res) =>{
    let user = await DB.getUserById(req.params.id);
    console.log(user.length);

    if(user.length > 0 ){
        console.log("a");
        let isUser = (user[0].idEntidad == req.user.idEntidad);
        if(isUser){
           return res.redirect('/profile')
        }

        if(user[0].idTipoEntidad == 2){
            return res.render('postlog/inmoprofile')
        }

        return res.render('postlog/profile', {data:  user[0], isUser});
    }
   
    return res.status(404).send('Not Found');
}

module.exports = ctrl;