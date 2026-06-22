const User = require("../models/User.js");
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({
            username,
            email,
        });

        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                console.log("Login Error:", err);
                return next(err);
            }

            req.flash("success", "Welcome to Wonderlust!");
            res.redirect("/listings");
        });

    } catch (e) {
        console.log("Signup Error:");
        console.log(e);

        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome to Wonderlust!");
    res.redirect("/listings");
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You are logged out now");
        res.redirect("/listings");
    });
};