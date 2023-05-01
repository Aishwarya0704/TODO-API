const mongoose = require('mongoose');
const validator = require('validator');

//Crating schema for collection
const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength : 3
    },
    description : {
        type : String,
        required : true,
        minlength : 3
    },
    userId : String,
},
{
    timestamps : true,
});


// Creating new collection
const Todo = new mongoose.model('Todo',todoSchema);

module.exports = Todo;

