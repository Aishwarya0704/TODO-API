const express = require('express');
const route = express.Router();
const UserRegistrationModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

route.post('/userRegister', async (req,res)=> {
    try {
        let bcryptedPswd = await bcrypt.hash(req.body.password,10);
        const userData = new UserRegistrationModel({
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname,
            "username" : req.body.username,
            "password" : bcryptedPswd,
            "gender" : req.body.gender,
            "emailAddress" : req.body.emailAddress,
            "phoneNumber" : req.body.phoneNumber,
            "state" : req.body.state,
            "city" : req.body.city,
            "schoolName" : req.body.schoolName,
            "pin" : req.body.pin,
        });
        const createUserData =await userData.save();
        res.send({
                statusCode: 201,
                message: "Registered successfully",
        });     
    }
    catch(err) {
        res.send({
            message : "Enter valid details",
            statusCode: 401
        })
    }
});

route.get('/userRegister/:id', async (req,res) => {
    try {
        const getUserData = await UserRegistrationModel.findById({_id : req.params.id});
        res.status(201).send(getUserData);  
    } catch (error) {
        res.send({
            statusCode : 500,
            message : error
        });
    }
});

route.patch('/userRegister/:id', async (req,res) => {
    try {
        const updateUserData = await UserRegistrationModel.findByIdAndUpdate({_id : req.params.id},req.body,{new : true});
        res.send({
            statusCode: 201,
            message: "Updated successfully"
        });
    } catch (error) {
        res.send({
            statusCode : 500,
            message : error
        });
    }
});

route.delete('/userRegister/:id', async (req,res) => {
    try {
        const deleteUserData = await UserRegistrationModel.findByIdAndDelete({_id : req.params.id});
        res.send({
            statusCode: 201,
            message: "Deleted sccessfully",
        })
    } catch (error) {
        res.send({
            statusCode : 500,
            message : error
        });
    }
})

route.post('/userLogin', async (req,res)=> {
    try {
        const email = req.body.emailAddress;
        const password = req.body.password;
        const isRegisteredUser = await UserRegistrationModel.findOne({emailAddress : email});
        const getRegisteredUserId = await isRegisteredUser["_id"];
        const isMatch = await bcrypt.compare(password,isRegisteredUser.password);
        const token = jwt.sign({id: getRegisteredUserId},"doingtaskofauthenticationusingjwt");
        if(isMatch){
            res.send({
                statusCode: 201,
                message : "Login successfully",
                jwttoken : token
            });
        }else {
            res.send({
                statusCode: 401,
                message : "Invalid password"
            })
        }
    }
    catch(err) {
    res.send({
        statusCode: 401,
        message : "Invalid login details"
    })
    }
});

route.post('/userLogout',async(req,res)=>{
    try {
        let token = req.headers['authorization'];
        // console.log(token);
        let decodedtoken = jwt.verify(token,"doingtaskofauthenticationusingjwt")
        // console.log(decodedtoken._id);
        // const newtoken = jwt.sign(decodedtoken._id,"doingtaskofauthenticationusingjwt",{expiresIn:Date.now()})
        // console.log(newtoken);
    } catch (error) {
        res.send({
            message : "Authorization fails",
            statusCode : 401
        });
    }
});

module.exports = route;
