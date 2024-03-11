const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/", function(req, res) {
    res.render("signUp");
});

router.post("/validar", controller.validarRegistro);

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::

router.get("/login", function(req, res) {
    res.render("logIn");
});

router.post("/validar", controller.validarLogin);

module.exports = router;