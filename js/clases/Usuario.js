// usuario.js
let mysql = require("mysql");

class Usuario {

  constructor(nombre, apellido, correo, id, telefono, password, fecha_ingreso){
    this.ci_user=id;
    this.nombre=nombre;
    this.apellido=apellido;
    this.correo=correo;
    this.contrasenna=password;
    this.fecha_ingreso=fecha_ingreso;
    this.telefono=telefono;
  }

  verificarUsuarioExistente() {
    const connection = require('./Conexion');

    const usuariosQuery = "SELECT * FROM usuarios WHERE ci_user = ?";
    connection.query(usuariosQuery, [this.ci_user], (error, results) => {
      if (error) {
        console.error("Error al verificar la existencia del usuario:", error);

        // Llamar al callback con el error

      } else {
        if (results.length > 0) {
          console.log("El usuario existe");
        } else {
          console.log("El usuario no existe");
        }

        // Llamar al callback sin error
      }
    });
  }

  insertarUsuarioEnBD() {
    const connection = require('./Conexion');

    const insertUsuarioQuery = "INSERT INTO usuarios (ci_user, nombre, apellido, correo, contrasenna, fecha_ingreso, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const usuarioValues = [this.ci_user, this.nombre, this.apellido, this.correo, this.contrasenna, this.fecha_ingreso, this.telefono];

    connection.query(insertUsuarioQuery, usuarioValues, function(error, results) {
      if (error) {
        console.error("No se pudo insertar en la base de datos");

      } else {
        console.log("Usuario insertado en la base de datos correctamente.");
        // Llamar al callback con éxito
      }
    });

  
    
  }

  //Modificar usuario
  modificarUsuarioEnBD(nombre, apellido, correo, contrasenna, telefono, ) {
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

      } else {
        console.log("Usuario modificado en la base de datos correctamente.");

        // Llamar al callback con éxito
      }
    });
  }

  obtenerUsuarioDesdeBD(ci_user, ) {
    const pool = require('./Conexion');

    // Consultar datos del usuario
    const obtenerUsuarioQuery = "SELECT * FROM usuarios WHERE ci_user = ?";

    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error al obtener conexión desde el pool:", err);

      }

      connection.query(obtenerUsuarioQuery, [ci_user], (error, results) => {
        if (error) {
          console.error("Error al obtener datos del usuario:", error);
          connection.release();  // Liberar la conexión al pool en caso de error

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

          } else {
            console.log("No se encontró el usuario en la base de datos.");

            // Liberar la conexión al pool si no hay resultados
            connection.release();

          }
        }
      });
    });
  }

  eliminarDeBD() {
    const connection = require('./Conexion');

    const eliminarUsuarioQuery = "DELETE FROM usuarios WHERE ci_user = ?";
    const usuarioValues = [this.ci_user];

    connection.query(eliminarUsuarioQuery, usuarioValues, (error, results) => {
      if (error) {
        console.error("Error al eliminar usuario de la base de datos:", error);

      } else {
        console.log("Usuario eliminado de la base de datos correctamente.");

        // Llamar al callback con éxito
      }
    });
  }

  iniciar_Sesion(correo,pass,){
    const connection = require('./Conexion');

    const usuariosQuery = "SELECT * FROM usuarios WHERE correo = ? AND contrasenna=?";
    connection.query(usuariosQuery, [correo,pass], (error, results) => {
      if (error) {
        console.error("Error al verificar la existencia del usuario:", error);

        // Llamar al callback con el error

      } else {
        if (results.length > 0) {
          console.log("Iniciando Sesion");
        } else {
          console.log("Datos Invalidos");
        }

        // Llamar al callback sin error
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


  