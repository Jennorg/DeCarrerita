// Admin.js

const Usuario = require('./Usuario');  // Asegúrate de tener la ruta correcta al archivo Usuario.js

class Administrador extends Usuario {

  constructor() {
    super();
    this.id_admin = 0;
    this.id_user = 0;
  }

  // Método para insertar un empleado administrativo en la base de datos
  insertarBD(callback) {
    const connection = require('./Conexion');

    const insertarEmpleadoQuery = "INSERT INTO administrador VALUES (floor(RAND()*1000000), ?)";
    const empleadoValues = [this.id_user];

    connection.query(insertarEmpleadoQuery, empleadoValues, (error, results) => {
      if (error) {
        console.error("No se pudo insertar en la base de datos:", error);
        return callback(error);
      } else {
        console.log("insertado en la base de datos correctamente.");

        // Llamar al callback con éxito
        callback(null, results);
      }
    });
  }

  // Método para extraer un empleado administrativo de la base de datos
  static extraerBD(ci_user, callback) {
    const connection = require('./Conexion');

    const extraerEmpleadoQuery = "SELECT * FROM administrador WHERE id_user = ?";
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
                            const admin = results[0];
                            this.id_admin =admin.id_admin;
                            this.id_user = admin.id_user ;
              
                            console.log("Datos del cliente obtenidos correctamente desde la base de datos.");
              
                            // Liberar la conexión al pool después de la consulta exitosa
                            connection.release();
                            return callback(null, this);
                          });

          // Llamar al callback con los datos del administrador
          callback(null, empleado);
        } else {
          // Llamar al callback indicando que no se encontró el administrador
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

  consultarRegistrosUsuarios(callback) {
    const connection = require('./Conexion');
    const consultarUsuariosQuery = "SELECT * FROM usuarios";

    connection.query(consultarUsuariosQuery, (error, results) => {
      if (error) {
        console.error("Error al consultar registros de la tabla usuarios:", error);
        return callback(error);
      } else {
        // Llamar al callback con los resultados
        callback(null, results);
      }
    });
  }

  // Método para consultar registros de la tabla cliente
  consultarRegistrosCliente(callback) {
    const connection = require('./Conexion');
    const consultarClienteQuery = "SELECT * FROM cliente";

    connection.query(consultarClienteQuery, (error, results) => {
      if (error) {
        console.error("Error al consultar registros de la tabla cliente:", error);
        return callback(error);
      } else {
        // Llamar al callback con los resultados
        callback(null, results);
      }
    });
  }

  // Método para consultar registros de la tabla empleado_a
  consultarRegistrosEmpleadoA(callback) {
    const connection = require('./Conexion');
    const consultarEmpleadoAQuery = "SELECT * FROM empleado_a";

    connection.query(consultarEmpleadoAQuery, (error, results) => {
      if (error) {
        console.error("Error al consultar registros de la tabla empleado_a:", error);
        return callback(error);
      } else {
        // Llamar al callback con los resultados
        callback(null, results);
      }
    });
  }

  // Método para consultar registros de la tabla traslados
  consultarRegistrosTraslados(callback) {
    const connection = require('./Conexion');
    const consultarTrasladosQuery = "SELECT * FROM traslados";

    connection.query(consultarTrasladosQuery, (error, results) => {
      if (error) {
        console.error("Error al consultar registros de la tabla traslados:", error);
        return callback(error);
      } else {
        // Llamar al callback con los resultados
        callback(null, results);
      }
    });
  }

  // Método para consultar registros de la tabla chofer
  consultarRegistrosChofer(callback) {
    const connection = require('./Conexion');
    const consultarChoferQuery = "SELECT * FROM chofer";

    connection.query(consultarChoferQuery, (error, results) => {
      if (error) {
        console.error("Error al consultar registros de la tabla chofer:", error);
        return callback(error);
      } else {
        // Llamar al callback con los resultados
        callback(null, results);
      }
    });
  }

   // Método para consultar registros de la tabla pagochofer
   consultarRegistrosPagos(callback) {
    const connection = require('./Conexion');
    const consultarChoferQuery = "SELECT * FROM pagochofer";

    connection.query(consultarChoferQuery, (error, results) => {
      if (error) {
        console.error("Error al consultar registros de la tabla chofer:", error);
        return callback(error);
      } else {
        // Llamar al callback con los resultados
        callback(null, results);
      }
    });
  }

   // Método para consultar registros de la tabla recargas
   consultarRegistrosRecargas(callback) {
    const connection = require('./Conexion');
    const consultarChoferQuery = "SELECT * FROM recarga";

    connection.query(consultarChoferQuery, (error, results) => {
      if (error) {
        console.error("Error al consultar registros de la tabla chofer:", error);
        return callback(error);
      } else {
        // Llamar al callback con los resultados
        callback(null, results);
      }
    });
  }
   // Método para consultar registros de la tabla banco
   consultarRegistrosBanco(callback) {
    const connection = require('./Conexion');
    const consultarChoferQuery = "SELECT * FROM banco";

    connection.query(consultarChoferQuery, (error, results) => {
      if (error) {
        console.error("Error al consultar registros de la tabla chofer:", error);
        return callback(error);
      } else {
        // Llamar al callback con los resultados
        callback(null, results);
      }
    });
  }

   // Método para consultar registros de la tabla pruebas psicologicas
   consultarRegistrosPruebaPsico(callback) {
    const connection = require('./Conexion');
    const consultarChoferQuery = "SELECT * FROM pruebapsico";

    connection.query(consultarChoferQuery, (error, results) => {
      if (error) {
        console.error("Error al consultar registros de la tabla chofer:", error);
        return callback(error);
      } else {
        // Llamar al callback con los resultados
        callback(null, results);
      }
    });
  }

     // Método para consultar registros de la tabla revision
     consultarRegistrosRevision(callback) {
      const connection = require('./Conexion');
      const consultarChoferQuery = "SELECT * FROM revision";
  
      connection.query(consultarChoferQuery, (error, results) => {
        if (error) {
          console.error("Error al consultar registros de la tabla chofer:", error);
          return callback(error);
        } else {
          // Llamar al callback con los resultados
          callback(null, results);
        }
      });
    }

    truncarTablaconCliente(nombreTabla, condicion) {
      const truncateQuery = `DELETE FROM ${nombreTabla} WHERE id_cliente=${condicion}`;
  
      connection.query(truncateQuery, (error, results) => {
        if (error) {
          console.error(`Error al truncar la tabla ${nombreTabla} con condición:`, error);
        } else {
          console.log(`Tabla ${nombreTabla} truncada con condición exitosamente.`);
        }
      });
    }

    truncarTablaconChofer(nombreTabla, condicion) {
      const truncateQuery = `DELETE FROM ${nombreTabla} WHERE id_chofer=${condicion}`;
  
      connection.query(truncateQuery, (error, results) => {
        if (error) {
          console.error(`Error al truncar la tabla ${nombreTabla} con condición:`, error);
        } else {
          console.log(`Tabla ${nombreTabla} truncada con condición exitosamente.`);
        }
      });
    }

}

module.exports = Administrador;
