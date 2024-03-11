// empleadoAdministrativo.js

const Usuario = require('./Usuario');  // Asegúrate de tener la ruta correcta al archivo Usuario.js

class EmpleadoAdministrativo extends Usuario {

  constructor() {
    super();
    this.id_empleado = 0;
    this.id_user = 0;
  }

  // Método para insertar un empleado administrativo en la base de datos
  insertarBD(callback) {
    const connection = require('./Conexion');

    const insertarEmpleadoQuery = "INSERT INTO Empleado_A VALUES (floor(RAND()*1000000), ?)";
    const empleadoValues = [this.id_user];

    connection.query(insertarEmpleadoQuery, empleadoValues, (error, results) => {
      if (error) {
        console.error("No se pudo insertar el empleado administrativo en la base de datos:", error);
        return callback(error);
      } else {
        console.log("Empleado administrativo insertado en la base de datos correctamente.");

        // Llamar al callback con éxito
        callback(null, results);
      }
    });
  }

  // Método para extraer un empleado administrativo de la base de datos
  static extraerBD(ci_user, callback) {
    const connection = require('./Conexion');

    const extraerEmpleadoQuery = "SELECT * FROM empleado_a WHERE id_empleado = ?";
    connection.query(extraerEmpleadoQuery, [ci_user], (error, results) => {
      if (error) {
        console.error("Error al extraer el empleado administrativo desde la base de datos:", error);
        return callback(error);
      } else {
        if (results.length > 0) {
          const empleado = results[0];
                          // Llamar al método de la clase base para obtener datos del usuario
                          super.obtenerUsuarioDesdeBD(ci_user, (err, usuario) => {
                            if (err) {
                              connection.release();  // Liberar la conexión al pool en caso de error
                              return callback(err, null);
                            }
              
                            // Almacena los datos en los atributos de la instancia
                            const EmpleadoAdministrativo = results[0];
                            this.id_empleado =EmpleadoAdministrativo.id_empleado ;
                            this.id_user = EmpleadoAdministrativo.id_user ;
              
                            console.log("Datos del empleado obtenidos correctamente desde la base de datos.");
              
                            // Liberar la conexión al pool después de la consulta exitosa
                            connection.release();
                            return callback(null, this);
                          });

          // Llamar al callback con los datos del empleado administrativo
          callback(null, empleado);
        } else {
          // Llamar al callback indicando que no se encontró el empleado administrativo
          callback(null, null);
        }
      }
    });
  }

  // Método para eliminar un empleado administrativo de la base de datos
  eliminarBD(callback) {
    const connection = require('./Conexion');

    const eliminarEmpleadoQuery = "DELETE FROM Empleado_A WHERE id_user = ?";
    connection.query(eliminarEmpleadoQuery, [this.id_user], (error, results) => {
      if (error) {
        console.error("Error al eliminar el empleado administrativo desde la base de datos:", error);
        return callback(error);
      } else {
        console.log("Empleado administrativo eliminado de la base de datos correctamente.");

        // Llamar al callback con éxito
        callback(null, results);
      }
    });
  }
}

module.exports = EmpleadoAdministrativo;
