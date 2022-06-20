"use strict";
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
exports.oAuthController = void 0;
var axios_1 = require("axios");
var client_id = "e4a70dc5fa8c873142f8";
var client_secret = "8fd567ee687f8d31c2cb525ec3a26b50a8fc3bca";
exports.oAuthController = {
    //  redirectGitHub : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
    //     const url = `https://github.com/login/oauth/authorize?`+ 
    //                 `client_id=`+`e4a70dc5fa8c873142f8` ;
    //     res.redirect(url);
    // }
    getToken: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var requestToken, url, token, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestToken = req.query.code;
                    console.log('HERE IS YOUR ACCESS CODE', requestToken);
                    url = "https://github.com/login/oauth/access_token?client_id=".concat(client_id, "&client_secret=").concat(client_secret, "&code=").concat(requestToken);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, axios_1["default"])({
                            method: 'POST',
                            url: url,
                            headers: {
                                accept: 'application/json'
                            }
                        })];
                case 2:
                    token = _a.sent();
                    res.locals.accessToken = token.data.access_token;
                    return [2 /*return*/, next()];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, next({
                            log: "Error in Token process: ".concat(err_1),
                            message: { err: 'An error occurred' }
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // This middleware is to get userinfo from github
    getUserId: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var url, currentUser, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.github.com/user";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, axios_1["default"])({
                            method: 'GET',
                            url: url,
                            headers: {
                                accept: 'application/json',
                                Authorization: "token ".concat(res.locals.accessToken)
                            }
                        })];
                case 2:
                    currentUser = _a.sent();
                    console.log('Response: \n', currentUser);
                    res.locals.githubUser = currentUser.data.login;
                    return [2 /*return*/, next()];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, next({
                            log: "Error in getUserId: ".concat(err_2),
                            message: { err: 'An error occurred' }
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); }
};
// router.get('/github/oauth', async (req:Request, res:Response, next:NextFunction) => {
//     const requestToken = req.query.code;
//     console.log('HERE IS YOUR ACCESS CODE',requestToken);
//     const url = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${requestToken}`;
//     let token;
//     try {
//             token = await axios ({
//                 method: 'POST',
//                 url,
//                 headers: {
//                     accept: 'application/json',
//                 }
//             });
//             console.log('HERE IS YOUR ACCESS TOKEN ==> ',token.data.access_token);
//     } catch(err){
//         return next({
//             log: `Error in Token process: ${err}`,
//             message: { err: 'An error occured'}
//         })
//     }
// } )
