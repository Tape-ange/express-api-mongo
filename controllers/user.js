const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) =>{
   bcrypt
   .hash(req.body.password, 10)
    .then((hash) =>{
        const user = new User({
            email: req.body.email,
            password: hash,
            name : req.body.name,
            lastname: req.body.lastname
        }); 
        user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));

}

exports.allUser= (req, res ,next)=> {
    User.find().then(
        (users) =>{
            res.status(200).json(users);
        }
    ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
};

exports.logins = (req, res, next) =>{
    User.findOne({email: req.body.email})
    .then((user) =>{
        if (!user){
            return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
        }
        bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id},
                'RANDOM_TOKEN_SECRET',
                {expiresIn: '24h'}
            )
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};