"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
function HomeDisplay() {
    return (react_1["default"].createElement("main", { className: 'verticalContainer' },
        react_1["default"].createElement("h2", null, "Welcome to the homepage!!!"),
        react_1["default"].createElement(react_router_dom_1.Link, { to: "/main_window" }, "Back to the log in page"),
        react_1["default"].createElement("span", null, "Don't have an account?"),
        react_1["default"].createElement(react_router_dom_1.Link, { to: "/signup" }, "Sign up"),
        react_1["default"].createElement(react_router_dom_1.Link, { to: "/forgotPassword" }, "Forgot password?")));
}
exports["default"] = HomeDisplay;
//# sourceMappingURL=HomeDisplay.js.map