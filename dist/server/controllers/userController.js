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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.userController = exports.pool = void 0;
//import db from '../models/model.js';
var bcrypt = __importStar(require("bcrypt"));
var pg_1 = require("pg");
console.log("Environment Variable", process.env.NODE_ENV);
var PG_URI = '';
// To set up the test environment, packages: cross-env (npm i -D cross-env)
// In package.json we had to add a new script called "test"
// In the "test" script, we set the process.env.NODE_ENV to test
// Set conditional statement to check if server is running on "test" or development
if (process.env.NODE_ENV === "test") {
    PG_URI = 'postgres://vwfofczb:Jy7dhkeZsVCm5HhzcWJaF1DkCGRBALB4@queenie.db.elephantsql.com/vwfofczb';
    console.log("NOW WE ARE IN THE TEST ENVIRONMENT");
}
else
    PG_URI = 'postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq';
// create a new pool here using the connection string above
exports.pool = new pg_1.Pool({
    connectionString: PG_URI
});
var currentTable = "CREATE TABLE IF NOT EXISTS \"user\"(\n    _id SERIAL PRIMARY KEY,\n    username VARCHAR(20) UNIQUE NOT NULL,\n    pw VARCHAR NOT NULL,\n    email VARCHAR UNIQUE NOT NULL\n    );";
exports.pool.query(currentTable);
console.log("Current Table is created!");
exports.userController = {
    loginCheck: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var username, password, findUserPw, data, storedPw, passwordVerified, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    console.log('Login Check in process');
                    console.log('ENVIRONMENT IS ====>', process.env.NODE_ENV);
                    username = req.body.username;
                    password = req.body.password;
                    findUserPw = "SELECT pw FROM \"user\" WHERE \"username\" = '".concat(username, "';");
                    return [4 /*yield*/, exports.pool.query(findUserPw)];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, data.rows[0].pw];
                case 2:
                    storedPw = _a.sent();
                    console.log("STORED PASSWORD", storedPw);
                    return [4 /*yield*/, bcrypt.compare(password, storedPw)];
                case 3:
                    passwordVerified = _a.sent();
                    res.locals.verification = passwordVerified;
                    return [2 /*return*/, next()];
                case 4:
                    err_1 = _a.sent();
                    return [2 /*return*/, next({
                            log: "Error i userController.loginCheck: ".concat(err_1),
                            message: { err: 'An error in userController.loginCheck' }
                        })];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    newAccount: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, email, password, hashedPassword, createUser, newUserDetails, tempData, findNewUser, data, newUserId, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    console.log("Account creation in progress");
                    console.log('ENVIRONMENT IS ====>', process.env.NODE_ENV);
                    _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                    console.log("Request Body:", username, email, password);
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 1:
                    hashedPassword = _b.sent();
                    console.log("Hashed Password:", hashedPassword);
                    createUser = "INSERT INTO \"user\" (username, pw, email) VALUES ($1, $2, $3);";
                    newUserDetails = ["".concat(username), "".concat(hashedPassword), "".concat(email)];
                    return [4 /*yield*/, exports.pool.query(createUser, newUserDetails)];
                case 2:
                    tempData = _b.sent();
                    findNewUser = "SELECT * FROM \"user\" WHERE \"username\" = '".concat(username, "';");
                    return [4 /*yield*/, exports.pool.query(findNewUser)];
                case 3:
                    data = _b.sent();
                    return [4 /*yield*/, data.rows[0]._id];
                case 4:
                    newUserId = _b.sent();
                    // const newUser : any = await tempData;
                    res.locals.newUserId = newUserId;
                    return [2 /*return*/, next()];
                case 5:
                    err_2 = _b.sent();
                    return [2 /*return*/, next({
                            log: "Error in userController.newAccount: ".concat(err_2),
                            message: { err: 'An error in userController.newAccount' }
                        })];
                case 6: return [2 /*return*/];
            }
        });
    }); }
};
// newAccount : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> =>{
//     try{
//         console.log("Account creation in progress");
//         const {username, email, password} : {username:string, email:string, password:string} = req.body
//         const hashedPassword : string = await bcrypt.hash(password, 10);
//         const createUser : string = `INSERT INTO "user" (username, pw, email) VALUES ($1, $2, $3)`;
//         const newUserDetails : string[] = [username, hashedPassword, email];
//         const tempData : any = await pool.query(createUser, newUserDetails);
//         const newUser : any = await tempData;
//         res.locals.newUser = newUser;
//         return next();
//     }catch(err){
//         return next({
//             log: `Error in userController.newAccount: ${err}`,
//             message: { err: 'An error in userController.newAccount'}
//         })
//     }
//# sourceMappingURL=userController.js.map