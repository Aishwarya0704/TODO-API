const express = require('express');
require('./src/db/connection');
const app = express();
const port = process.env.PORT ||  8000;
const TodoRoute = require('./src/routers/todoRoute');
const UserRoute = require('./src/routers/userRoute');

app.use(express.json());
app.use(TodoRoute);
app.use(UserRoute);

app.listen(port,()=>console.log(`Listening at port ${port}`));
