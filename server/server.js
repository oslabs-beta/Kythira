const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const PORT = 3000;

//Routers to be imported
const userRouter = require("./routes/userRouter");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/user', userRouter);

// psql -d postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq -f databaseTable.sql

//Global Error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unkown middleware error',
        status: 500,
        message: {err: 'An error occured'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT} `);
});

module.exports = app;