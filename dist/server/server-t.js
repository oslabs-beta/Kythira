var express = require("express");
var app = express();
var path = require("path");
var PORT = 3000;
//Routers to be imported
var userRouter = require("./routes/userRouter");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
// psql -d postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq -f databaseTable.sql
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
module.exports = app;
//# sourceMappingURL=server-t.js.map