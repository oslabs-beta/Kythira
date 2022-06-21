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
function Signup() {
    var _a = (0, react_1.useState)(''), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(''), username = _b[0], setUsername = _b[1];
    var _c = (0, react_1.useState)(''), password = _c[0], setPassword = _c[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var verifySignup = function () {
        var user = {
            email: email,
            username: username,
            password: password
        };
        console.log('user to be signedup ', user);
        fetch('http://localhost:8080/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(user)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            navigate('/home');
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
    return (react_1["default"].createElement("main", { className: 'verticalContainer' },
        react_1["default"].createElement("h2", null, "Create an account"),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("input", { type: 'text', placeholder: 'email', onChange: function (e) { return setEmail(e.target.value); } })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("input", { type: 'text', placeholder: 'username', onChange: function (e) { return setUsername(e.target.value); } })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("input", { id: 'passwordInput', type: 'password', placeholder: 'password', onChange: function (e) { return setPassword(e.target.value); } })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("span", null, "Show password"),
            react_1["default"].createElement("input", { type: 'checkbox', onClick: togglePasswordVisibility })),
        react_1["default"].createElement("button", { onClick: verifySignup }, "Sign up"),
        react_1["default"].createElement("span", null, "Already have an account?"),
        react_1["default"].createElement(react_router_dom_1.Link, { to: "/main_window" }, "Log in")));
}
exports["default"] = Signup;
//# sourceMappingURL=Signup.js.map