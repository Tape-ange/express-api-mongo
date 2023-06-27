const bcrypt = require("bcrypt");
const session = require("express-session");




// login avec session
exports.loginSession = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ message: "Paire login/mot de passe incorrecte" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: "Paire login/mot de passe incorrecte" });
            }
          req.session.currentUser = user;
            
            res.redirect('/pageOne')
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };