ctrl = {}

const DB = require('../lib/DBData');

ctrl.index = async (req,res) => {
    
    let inm = await DB.getInmueble(req.params.id);
    res.render('postlog/inmueble/inmo', {inmo: inm[0], expressFlash: req.flash('success')});
}; 

module.exports = ctrl;