const jwt = require('jsonwebtoken');
const {User} = require('../models');

function authentication(req, res, next){
    const {access_token} = req.headers;
    if(access_token){
        try{
            const token = jwt.verify(access_token, process.env.SECRET_KEY);
            User.findByPk(token.id)
            .then(data =>{
                if(data) {
                    req.user = {id: data.id, role: data.role, email: data.email};
                    next();
                }else{
                    res.status(403).json("Invalid User");
                }
            })
        } catch(error){
            res.status(500).json(error);
        }   
    }else{
        res.status(403).json("Please Login First");
    }
}

function adminAuthorization(req, res, next){
    const {role} = req.user;
    if(role){
        if(role === 'admin'){
            next();
        }else{
            res.status(403).json("Invalid Authorization");
        }
    }else{
        res.status(403).json("Please Login First");
    }
}

module.exports = {authentication, adminAuthorization}