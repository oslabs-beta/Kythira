"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
function ForgotPassword() {
    return (react_1["default"].createElement("main", { className: 'verticalContainer' },
        react_1["default"].createElement("h2", null, "Forgot your password?"),
        react_1["default"].createElement("input", { type: 'text', placeholder: 'Email' }),
        react_1["default"].createElement("button", null, "Send reset password link"),
        react_1["default"].createElement(react_router_dom_1.Link, { to: "/main_window" }, "Back to the log in page")));
}
exports["default"] = ForgotPassword;
//# sourceMappingURL=ForgotPassword.js.map