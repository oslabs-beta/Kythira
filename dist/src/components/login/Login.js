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
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var LoginDisplay = function () {
    var _a = (0, react_1.useState)(''), username = _a[0], setUsername = _a[1];
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    var _c = (0, react_1.useState)(), verified = _c[0], setVerified = _c[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var verifyLogin = function () {
        var user = {
            username: username,
            password: password
        };
        console.log('user to be verified ', user);
        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(user)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log('Response from backend', data);
            if (data === true) {
                setVerified(data);
                navigate('/home');
            }
            else {
                setVerified(false);
                setUsername('');
                setPassword('');
            }
        })["catch"](function (err) { return console.log('verifyLogin ERROR: ', err); });
    };
    var togglePasswordVisibility = function () {
        var passwordInput = document.querySelector('#passwordInput');
        var type = document.querySelector('#passwordInput').getAttribute('type');
        passwordInput.setAttribute('type', 
        // Switch it to a text field if it's a password field
        // currently, and vice versa
        type === 'password' ? 'text' : 'password');
    };
    return (react_1["default"].createElement("div", { className: 'verticalContainer' },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("input", { type: 'text', placeholder: 'username', value: username, onChange: function (e) { return setUsername(e.target.value); } })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("input", { id: 'passwordInput', type: 'password', placeholder: 'password', value: password, onChange: function (e) { return setPassword(e.target.value); } })),
        verified === false && react_1["default"].createElement("div", { style: { color: 'red' } }, "Error: Incorrect username or password"),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("span", null, "Show password"),
            react_1["default"].createElement("input", { type: 'checkbox', onClick: togglePasswordVisibility })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/forgotPassword" }, "Forgot password?"),
            react_1["default"].createElement("button", { onClick: verifyLogin }, "Login")),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("span", null, "Don't have an account?"),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/signup" }, "Sign up"))));
};
exports["default"] = LoginDisplay;
//# sourceMappingURL=Login.js.map