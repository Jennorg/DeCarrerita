const express = require("express");
const app = express();
const router = require("./router/router");

   
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/", router);

app.listen(3000, function() {
    console.log('Servidor creado http://localhost:3000');
});