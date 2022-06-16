"use strict";
exports.__esModule = true;
var express = require("express");
var k8Controller_1 = require("../controllers/k8Controller");
var router = express.Router();
// Router to fetch the data from clusters
router.get('/pods', k8Controller_1.k8Controller.localPods, function (req, res) {
    return res.status(200).json(res.locals.pods);
});
exports["default"] = router;
