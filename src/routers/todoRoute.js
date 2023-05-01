const express = require('express');
const route = express.Router();
const Todo = require('../models/todoModel');
const jwt = require('jsonwebtoken')

route.post('/todo',async(req,res)=>{
    try {
        let token = req.headers['authorization'];
        const decodedtoken = jwt.verify(token,"doingtaskofauthenticationusingjwt");
        if (decodedtoken.id) {
            let {body} = req;
            let newBody = body;
            newBody.userId = decodedtoken._id;
            let todoList = new Todo(newBody);
            let createTodoList = await todoList.save();
            res.send({
                statusCode: 201,
                message: "Added succesfully"
            });           
        }        
    } catch (error) {
        console.log(error);
        res.send({
            message : "Enter valid details",
            statusCode : 500
        });
    }
});

route.patch('/todo/:id', async (req,res) => {
        try {
            let token = req.headers['authorization'];
            let decodedtoken = jwt.verify(token,"doingtaskofauthenticationusingjwt");
            if (decodedtoken.id) {
                let {body} = req;
                let newBody = body;
                newBody.userId = decodedtoken._id;          
            let updateTodoData = await Todo.findByIdAndUpdate({_id : req.params.id},newBody,{new : true});
            res.send({
                statusCode: 201,
                message: "Updated successfully"
            });
            }
        } 
        catch (error) {
            res.send({
                message : "User not found",
                statusCode : 404
            });
        }
    });

route.get('/todo', async (req,res) => {
        try {
            let token = req.headers['authorization'];
            let decodedtoken = jwt.verify(token,"doingtaskofauthenticationusingjwt");
            if (decodedtoken.id) {
                let {body} = req;
                let newBody = body;
                newBody.userId = decodedtoken._id;  
                const getTodoData = await Todo.find({});
                const getmatchedUserTodoData = getTodoData.filter((data)=>{
                    if (data.userId == decodedtoken._id) {
                        return data;
                    }
                });
            res.status(201).send(getmatchedUserTodoData);
            }
        }
         catch (error) {
            res.send({
                message: "User not found",
                statusCode: 404,
            })
        }
});

route.get('/todo/:id', async (req,res) => {
    try {
        let token = req.headers['authorization'];
        let decodedtoken = jwt.verify(token,"doingtaskofauthenticationusingjwt");
        if (decodedtoken.id) {
            let {body} = req;
            let newBody = body;
            newBody.userId = decodedtoken._id;  
            const getTodoData = await Todo.find({_id : req.params.id});
            const getmatchedUserTodoData = getTodoData.filter((data)=>{
                if (data.userId == decodedtoken._id) {
                    return data;
                }
            });
        res.status(201).send(getmatchedUserTodoData);
        }
    }
     catch (error) {
        res.send({
            message: "User not found",
            statusCode: 404,
        })
    }
});


route.delete('/todo/:id', async (req,res) => {
    try {
        let token = req.headers['authorization'];
        const decodedtoken = jwt.verify(token,"doingtaskofauthenticationusingjwt");
        if (decodedtoken.id) {
            const deleteTodoData = await Todo.findByIdAndDelete({_id : req.params.id});
            res.send({
                statusCode : 201,
                message : "Deleted successfully",
            });
        }
    } catch (error) {
        res.send({
            message : "User not found",
            statusCode : 404,
        });
    }
});

module.exports = route;