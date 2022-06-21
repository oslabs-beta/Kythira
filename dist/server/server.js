"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express = __importStar(require("express"));
var cors = __importStar(require("cors"));
var app = undefined;
var PORT = 8080;
app = express();
//Routers to be imported
var userRouter_1 = __importDefault(require("./routes/userRouter"));
var k8Router_1 = __importDefault(require("./routes/k8Router"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/user', userRouter_1["default"]);
app.use('/k8', k8Router_1["default"]);
// psql -d postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq -f databaseTable.sql
//Catch all error handler
app.use(function (req, res) {
    return res.status(404).send('You in the wrong place');
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
//# sourceMappingURL=server.js.map