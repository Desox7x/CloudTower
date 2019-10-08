ctrl = {}

const DB = require('../lib/DBData');

ctrl.index = async (req,res) => {
    let inm = await DB.getInmueble(1);
    res.render('postlog/inmueble/index', {data: inm[0], expressFlash: req.flash('success')});
} 

module.exports = ctrl;