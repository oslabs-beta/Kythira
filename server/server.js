"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
// import * as path from "path";
var app = undefined;
var PORT = 8080;
app = (0, express_1["default"])();
//Routers to be imported
var userRouter_1 = require("./routes/userRouter");
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, cors_1["default"])());
app.use('/user', userRouter_1["default"]);
// psql -d postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq -f databaseTable.sql
//Catch all error handler
app.use(function (req, res) {
    return res.status(404).send('You in the wrong place');
});
//Global Error handler
app.use(function (err, req, res) {
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
