module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();

        }
        return res.redirect('/login')
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    },

    requireRole(role) {
        return function (req, res, next) {
            console.log(role, req.user.idTipoEntidad)
            if (req.user && req.user.idTipoEntidad === role) {
                next();
            } else {
                res.send(403);
            }
        }
    }



};