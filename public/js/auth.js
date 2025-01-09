module.exports = (requiredRole = null) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            return res.redirect('/login.html'); //if it's not logged in, redirect to login
        }

        const user = req.session.user;

        // if a required role is passed and the user is not an admin, redirect to access denied
        if (requiredRole !== null && user.isAdmin !== requiredRole) {
            return res.redirect('/access_denied.html'); // redirect to access denied
        }

        next(); // If have permission, continue
    };
};
