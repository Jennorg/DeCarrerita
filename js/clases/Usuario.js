// usuario.js
let mysql = require("mysql");

class Usuario {

  constructor(){
    this.ci_user=0;
    this.nombre="";
    this.apellido="";
    this.correo="";
    this.contrasenna="";
    this.fecha_ingreso="00-00-0000";
    this.telefono=0;
  }

  /*constructor(ci_user, nombre, apellido, correo, contrasenna, fecha_ingreso, telefono) {
    this.ci_user = ci_user;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.contrasenna = contrasenna;
    this.fecha_ingreso = fecha_ingreso;
    this.telefono = telefono;
  }*/

  verificarUsuarioExistente(callback) {
    const connection = require('./Conexion');

    const usuariosQuery = "SELECT * FROM usuarios WHERE ci_user = ?";
    connection.query(usuariosQuery, [this.ci_user], (error, results) => {
      if (error) {
        console.error("Error al verificar la existencia del usuario:", error);

        // Llamar al callback con el error
        return callback(error);
      } else {
        if (results.length > 0) {
          console.log("El usuario existe");
        } else {
          console.log("El usuario no existe");
        }

        // Llamar al callback sin error
        callback(null, results);
      }
    });
  }

  insertarUsuarioEnBD(callback) {
    const connection = require('./Conexion');

    const insertUsuarioQuery = "INSERT INTO usuarios (ci_user, nombre, apellido, correo, contrasenna, fecha_ingreso, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const usuarioValues = [this.ci_user, this.nombre, this.apellido, this.correo, this.contrasenna, this.fecha_ingreso, this.telefono];

    connection.query(insertUsuarioQuery, usuarioValues, function(error, results) {
      if (error) {
        console.error("No se pudo insertar en la base de datos");
        return callback(error);
      } else {
        console.log("Usuario insertado en la base de datos correctamente.");
        // Llamar al callback con éxito
        callback(null, results);
      }
    });

  
    
  }

  //Modificar usuario
  modificarUsuarioEnBD(nombre, apellido, correo, contrasenna, telefono, callback) {
    const connection = require('./Conexion');

    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.contrasenna = contrasenna;
    this.telefono = telefono;

    const modificarUsuarioQuery = "UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, contrasenna = ?, telefono = ? WHERE ci_user = ?";
    const usuarioValues = [this.nombre, this.apellido, this.correo, this.contrasenna, this.telefono, this.ci_user];

    connection.query(modificarUsuarioQuery, usuarioValues, (error, results) => {
      if (error) {
        console.error("Error al modificar el usuario:", error);
        return callback(error);
      } else {
        console.log("Usuario modificado en la base de datos correctamente.");

        // Llamar al callback con éxito
        callback(null, results);
      }
    });
  }

  obtenerUsuarioDesdeBD(ci_user, callback) {
    const pool = require('./Conexion');

    // Consultar datos del usuario
    const obtenerUsuarioQuery = "SELECT * FROM usuarios WHERE ci_user = ?";

    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error al obtener conexión desde el pool:", err);
        return callback(err, null);
      }

      connection.query(obtenerUsuarioQuery, [ci_user], (error, results) => {
        if (error) {
          console.error("Error al obtener datos del usuario:", error);
          connection.release();  // Liberar la conexión al pool en caso de error
          return callback(error, null);
        } else {
          if (results.length > 0) {
            // Almacena los datos en los atributos de la instancia
            const usuario = results[0];
            this.ci_user = usuario.ci_user;
            this.nombre = usuario.nombre;
            this.apellido = usuario.apellido;
            this.correo = usuario.correo;
            this.contrasenna = usuario.contrasenna;
            this.fecha_ingreso = usuario.fecha_ingreso;
            this.telefono = usuario.telefono;

            console.log("Datos del usuario obtenidos correctamente desde la base de datos.");

            // Liberar la conexión al pool después de la consulta exitosa
            connection.release();
            return callback(null, this);
          } else {
            console.log("No se encontró el usuario en la base de datos.");

            // Liberar la conexión al pool si no hay resultados
            connection.release();
            return callback(null, null);
          }
        }
      });
    });
  }

  eliminarDeBD(callback) {
    const connection = require('./Conexion');

    const eliminarUsuarioQuery = "DELETE FROM usuarios WHERE ci_user = ?";
    const usuarioValues = [this.ci_user];

    connection.query(eliminarUsuarioQuery, usuarioValues, (error, results) => {
      if (error) {
        console.error("Error al eliminar usuario de la base de datos:", error);
        return callback(error);
      } else {
        console.log("Usuario eliminado de la base de datos correctamente.");

        // Llamar al callback con éxito
        callback(null, results);
      }
    });
  }

  imprimirDatos() {
    console.log("Datos del usuario:");
    console.log("CI: " + this.ci_user);
    console.log("Nombre: " + this.nombre);
    console.log("Apellido: " + this.apellido);
    console.log("Correo: " + this.correo);
    console.log("Contraseña: " + this.contrasenna);
    console.log("Fecha de Ingreso: " + this.fecha_ingreso);
    console.log("Teléfono: " + this.telefono);
  }
    
}

// Exporta la clase Usuario
module.exports = Usuario;


  