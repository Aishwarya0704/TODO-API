const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todoApplicationDB').then(()=>{
    console.log("Connected successfully to database");
}).catch((err)=> {
    console.log(err);
})