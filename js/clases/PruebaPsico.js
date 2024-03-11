const connection = require('./Conexion');

class PruebaPsico {
  constructor(chofer,r1,r2,r3,r4) {
    this.id = 0;
    this.id_chofer =chofer || 0;
    this.id_ea = null;
    this.Respuesta1 = r1 || "";
    this.Respuesta2 = r2 || "";
    this.Respuesta3 = r3 || "";
    this.Respuesta4 = r4 || "";
    this.resultado = 0;
  }

  // Método para insertar un registro en la tabla
  insertarBD(callback) {
    const insertarQuery = "INSERT INTO pruebaPsico (id_chofer, id_ea, Respuesta1, Respuesta2, Respuesta3, Respuesta4, resultado) VALUES (floor(RAND()*1000000),?, ?, ?, ?, ?, ?, ?)";
    const valores = [this.id_chofer, this.id_ea, this.Respuesta1, this.Respuesta2, this.Respuesta3, this.Respuesta4, this.resultado];

    connection.query(insertarQuery, valores, (error, results) => {
      if (error) {
        console.error("Error al insertar en la tabla pruebaPsico:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        console.log("Registro insertado en la tabla pruebaPsico correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para obtener un registro de la tabla
  obtenerBD(id, callback) {
    const obtenerQuery = "SELECT * FROM pruebaPsico WHERE id = ?";
    
    connection.query(obtenerQuery, [id], (error, results) => {
      if (error) {
        console.error("Error al obtener registro de la tabla pruebaPsico:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        // Llamar al callback sin error y con el resultado
        callback(null, results[0]);
      }
    });
  }

  // Método para extraer un registro de la tabla
    extraerBD(id, callback) {
        const extraerQuery = "SELECT * FROM pruebaPsico WHERE id = ?";
        
        connection.query(extraerQuery, [id], (error, results) => {
          if (error) {
            console.error("Error al extraer registro de la tabla pruebaPsico:", error);
            // Llamar al callback con el error
            return callback(error);
          } else {
            if (results.length > 0) {
              const registroExtraido = results[0];
              // Actualizar los atributos de la instancia con los datos extraídos
              this.id = registroExtraido.id;
              this.id_chofer = registroExtraido.id_chofer;
              this.id_ea = registroExtraido.id_ea;
              this.Respuesta1 = registroExtraido.Respuesta1;
              this.Respuesta2 = registroExtraido.Respuesta2;
              this.Respuesta3 = registroExtraido.Respuesta3;
              this.Respuesta4 = registroExtraido.Respuesta4;
              this.resultado = registroExtraido.resultado;
    
              console.log("Registro extraído de la tabla pruebaPsico correctamente.");
              // Llamar al callback sin error y con los resultados
              callback(null, this);
            } else {
              console.log("No se encontró el registro en la tabla pruebaPsico.");
              // Llamar al callback sin error y sin resultados
              callback(null, null);
            }
          }
        });
      }


  // Método para eliminar un registro de la tabla
  eliminarBD(id, callback) {
    const eliminarQuery = "DELETE FROM pruebaPsico WHERE id = ?";
    
    connection.query(eliminarQuery, [id], (error, results) => {
      if (error) {
        console.error("Error al eliminar registro de la tabla pruebaPsico:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        console.log("Registro eliminado de la tabla pruebaPsico correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para imprimir todos los registros de la tabla
  static imprimirRegistros(callback) {
    const imprimirQuery = "SELECT * FROM pruebaPsico";
    
    connection.query(imprimirQuery, (error, results) => {
      if (error) {
        console.error("Error al imprimir registros de la tabla pruebaPsico:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        // Imprimir los resultados
        console.log("Registros en la tabla pruebaPsico:");
        console.log(results);
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para realizar la evaluación
  evaluacion(id_empleado, puntuacion, callback) {
    // Asegúrate de que los valores de id_empleado y puntuacion sean válidos
    if (!id_empleado || !puntuacion) {
      console.error("Error: id_empleado y puntuacion son obligatorios.");
      // Llamar al callback con el error
      return callback("Error: id_empleado y puntuacion son obligatorios.");
    }

    // Actualizar el registro con la evaluación
    const actualizarQuery = "UPDATE pruebaPsico SET id_ea = ?, resultado = ? WHERE id = ?";
    const valores = [id_empleado, puntuacion, this.id];

    connection.query(actualizarQuery, valores, (error, results) => {
      if (error) {
        console.error("Error al actualizar registro en la tabla pruebaPsico:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        console.log("Registro actualizado en la tabla pruebaPsico con la evaluación.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }
}