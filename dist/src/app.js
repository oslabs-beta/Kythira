"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var client_1 = require("react-dom/client");
var Login_1 = __importDefault(require("./components/login/Login"));
var Signup_1 = __importDefault(require("./components/login/Signup"));
var ForgotPassword_1 = __importDefault(require("./components/login/ForgotPassword"));
var HomeDisplay_1 = __importDefault(require("./components/HomeDisplay"));
require("./stylesheets/styles.scss");
var react_router_dom_1 = require("react-router-dom");
var App = function () {
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement("main", { id: 'mainContainer' },
            react_1["default"].createElement("h1", null, "\uD83D\uDD2D Welcome to Kythira \uD83D\uDD2D")),
        react_1["default"].createElement(react_router_dom_1.Routes, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: '/main_window', element: react_1["default"].createElement(Login_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: 'signup', element: react_1["default"].createElement(Signup_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: 'forgotPassword', element: react_1["default"].createElement(ForgotPassword_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: '/home', element: react_1["default"].createElement(HomeDisplay_1["default"], null) }))));
};
var container = document.getElementById('app');
var root = (0, client_1.createRoot)(container);
root.render(react_1["default"].createElement(App, null));
//# sourceMappingURL=app.js.map