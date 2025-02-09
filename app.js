//external import
const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const path=require('path');
const cookieParser = require('cookie-parser');
const loginRouter=require('./router/loginRouter');
const usersRouter=require('./router/usersRouter');
const inboxRouter=require('./router/inboxRouter');
//internal import
const { errorHandler, notfoundHandler } = require('./middlewares/common/errorhandler');


const app=express();
dotenv.config();
//mongoose connection
mongoose.connect(process.env.MONGOOSE_CONNECTION)
.then(()=>console.log("connection successfully"))
.catch((err) =>console.log(err))
//request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//set view engine
app.set("view engine","ejs")
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));
//routing setup
app.use('/',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);

//error 404 not found
app.use(notfoundHandler);

//common error handler
app.use(errorHandler)


app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT}`);
})