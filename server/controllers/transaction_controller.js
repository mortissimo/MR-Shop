const { response } = require("express");
const {Order, Transaction, Food, User} = require("../models");

class TransactionController{
    static getAllTransaction(req, res) {
        const {role} = req.user;
        if(role === 'customer'){
            const {id} = req.user
            Transaction.findAll({where:{UserId: id,}, include:[{model: Order}, {model: User}], order: [['updatedAt', 'DESC']]})
            .then(data =>{
                res.status(200).json(data)
            })
            .catch(err =>{
                res.status(500).json(err);
            })
        }else if(role === 'admin'){
            Transaction.findAll({include:[{model: Order}, {model: User}], order: [['updatedAt', 'DESC']]})
            .then(data =>{
                res.status(200).json(data)
            })
            .catch(err =>{
                res.status(500).json(err);
            })
        }    
    }
     static createTransaction(req, res){
       console.log("ENTERING");
        const {id} = req.user;
        let {description, totalPrice, orders} = req.body
        orders = JSON.parse(orders);
        console.log({description, totalPrice, orders})
        Transaction.create({UserId:id, description, totalPrice, status:'incomplete'})
        .then(transaction => {
            orders.forEach(data => {
                if(data){
                    return Order.create({UserId:id, FoodId: data.id, quantity: data.quantity, price: data.price, TransactionId: transaction.id})
                }            
            })
        })
        .then(() =>{
            res.status(201).json("Order Purchased")
        })
        .catch(err =>{
            res.status(500).json(err);
        })
    }
}

module.exports = TransactionController;
