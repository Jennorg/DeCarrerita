const User = require('./js/clases/Usuario');

function validarRegistro(req, res) {
    const data = req.body;
    let user = new User(data.firstName, data.lastName, data.email, data.id, data.phone, data.password, formatearFecha(new Date()))
    user.insertarUsuarioEnBD();
    res.redirect("/pages/map.html")
} 

function validarLogin (req, res) {
    const data = req.body;
    
}

function formatearFecha(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 

    return `${year}-${month}-${day}`;
}

module.exports = {
    validarRegistro
};