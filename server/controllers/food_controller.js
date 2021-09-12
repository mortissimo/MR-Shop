const {Food} = require("../models");

class FoodController{
    static getAll(req, res){
        Food.findAll()
        .then(data =>{
            console.log(data);
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json(err)
        }) 
    }
    static addFood(req, res){
        let {name, price, description, imageUrl, stock} = req.body;
        Food.create({name, price, description, imageUrl, stock})
        .then(data =>{
            res.status(201).json(data);
        })
        .catch(err =>{
            res.status(500).json(err);
        })
    }
    static deleteFood(req, res){
        let {id} = req.params
        Food.findByPk(id)
        .then(data =>{
            if(data){
                return Food.destroy({where:{id: data.id}})
            }else{
                res.status(404).json("Not Found")
            }
        })
        .then(data =>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json(err);
        })

    }
    static editFood(req, res){
        let {id} = req.params;
        let {name, price, description, imageUrl, stock} = req.body;
        Food.findByPk(id)
        .then(data =>{
            if(data){
                console.log("MASUKKK DLUU SINININININ",name, price, description, imageUrl, stock )
                return Food.update({name, price, description, imageUrl, stock}, {where:{id}})
            }else{
                res.status(404).json("Not Found")
            }
        })
        .then(data =>{
            console.log("ENTERING");
            res.status(200).json(data);
        })
        .catch(err =>{
            console.log("ERRORR");
            res.status(500).json(err);
        })
    }
}

module.exports = FoodController;