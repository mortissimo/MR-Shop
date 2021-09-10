const { response } = require("express");
const {Order, Transaction, Food} = require("../models");

class OrderController{
    static getByTransactionId(req, res){
        const {id, role} = req.user
        const {transactionId} = req.params
        if(role === "admin"){
            Order.findAll({where:{TransactionId: transactionId}, include:[{model: Food}]})
            .then(data =>{
                res.status(200).json(data);
            })
            .catch(err =>{
                res.status(500).json(err);
            })
                
        }else{
            Order.findAll({where:{TransactionId: transactionId, UserId: id}, include:[{model: Food}]})
            .then(data =>{
                res.status(200).json(data);
            })
            .catch(err =>{
                res.status(500).json(err);
            })
        }
        
    }
    static getAllOrder(req, res){
        Order.findAll()
        .then(data =>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json(err);
        })
    }
}

module.exports = OrderController;