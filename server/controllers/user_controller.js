const {User} = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

class UserController{
    static register(req, res){
        const {email, password} = req.body;
        User.create({email, password})
        .then(data =>{
            res.status(201).json(data);
        })
        .catch(err =>{
            res.status(500).json(err);
        })
    }
    static login(req, res){
        const {email, password} = req.body;
        User.findOne({where:{email}})
        .then(data =>{
            if(data) {
                if(bcrypt.compareSync(password, data.password)){
                    const token = jwt.sign({id: data.id, email:data.email}, process.env.SECRET_KEY, {expiresIn: 60 * 60})
                    res.status(200).json({token, email: data.email, role: data.role})
                }else{
                    res.status(400).json("Username or Password does not match")
                }
            }else{
                res.status(400).json("Username or Password does not match")
            }
        })
    }
    static getAll(req, res){
        User.findAll()
        .then(data =>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json(err);
        })
    }
}

module.exports = UserController;