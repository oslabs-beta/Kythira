"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var app = undefined;
var PORT = 8080;
app = express();
//Routers to be imported
var userRouter_1 = require("./routes/userRouter");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter_1["default"]);
// psql -d postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq -f databaseTable.sql

app.use((req,res)=>{
    return res.status(404).send('You in the wrong place, dumbass')
});
//Global Error handler
app.use(function (err, req, res, next) {
    var defaultErr = {
        log: 'Express error handler caught unkown middleware error',
        status: 500,
        message: { err: 'An error occured' }
    };
    var errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, function () {
    console.log("Listening on port: ".concat(PORT, " "));
});
exports["default"] = app;
