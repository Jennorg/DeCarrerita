// Importar la conexión a la base de datos
const connection = require('./Conexion');

// Definir la clase Revision
class Revision {
  constructor(placa,r1,r2,r3,r4,r5) {
    this.id = 0;
    this.id_vehiculo = placa || "";
    this.id_ea = 0;
    this.respuesta1 = r1 || 0;
    this.respuesta2 = r2 || 0;
    this.respuesta3 = r3 || 0;
    this.respuesta4 = r4 || 0;
    this.respuesta5 = r5 || "";
    this.fecha = "0000-00-00";
    this.resultado = 0;
  }

  // Método para extraer un registro de la tabla
  extraerBD(id, callback) {
    const extraerQuery = "SELECT * FROM Revision WHERE id = ?";
    
    connection.query(extraerQuery, [id], (error, results) => {
      if (error) {
        console.error("Error al extraer registro de la tabla Revision:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        if (results.length > 0) {
          const registroExtraido = results[0];
          // Actualizar los atributos de la instancia con los datos extraídos
          this.id = registroExtraido.id;
          this.id_vehiculo = registroExtraido.id_vehiculo;
          this.id_ea = registroExtraido.id_ea;
          this.respuesta1 = registroExtraido.respuesta1;
          this.respuesta2 = registroExtraido.respuesta2;
          this.respuesta3 = registroExtraido.respuesta3;
          this.respuesta4 = registroExtraido.respuesta4;
          this.respuesta5 = registroExtraido.respuesta5;
          this.fecha = registroExtraido.fecha;
          this.resultado = registroExtraido.resultado;

          console.log("Registro extraído de la tabla Revision correctamente.");
          // Llamar al callback sin error y con los resultados
          callback(null, this);
        } else {
          console.log("No se encontró el registro en la tabla Revision.");
          // Llamar al callback sin error y sin resultados
          callback(null, null);
        }
      }
    });
  }

  // Método para insertar un nuevo registro en la tabla
  insertarBD(callback) {
    const insertarQuery = "INSERT INTO Revision (id_vehiculo, id_ea, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5, fecha, resultado) VALUES (floor(RAND()*1000000),?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const valores = [this.id_vehiculo, this.id_ea, this.respuesta1, this.respuesta2, this.respuesta3, this.respuesta4, this.respuesta5, this.fecha, this.resultado];

    connection.query(insertarQuery, valores, (error, results) => {
      if (error) {
        console.error("Error al insertar en la tabla Revision:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        console.log("Registro insertado en la tabla Revision correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para modificar un registro en la tabla
  modificarBD(callback) {
    const modificarQuery = "UPDATE Revision SET id_vehiculo = ?, id_ea = ?, respuesta1 = ?, respuesta2 = ?, respuesta3 = ?, respuesta4 = ?, respuesta5 = ?, fecha = ?, resultado = ? WHERE id = ?";
    const valores = [this.id_vehiculo, this.id_ea, this.respuesta1, this.respuesta2, this.respuesta3, this.respuesta4, this.respuesta5, this.fecha, this.resultado, this.id];

    connection.query(modificarQuery, valores, (error, results) => {
      if (error) {
        console.error("Error al modificar el registro en la tabla Revision:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        console.log("Registro modificado en la tabla Revision correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para eliminar un registro en la tabla
  eliminarBD(callback) {
    const eliminarQuery = "DELETE FROM Revision WHERE id = ?";
    
    connection.query(eliminarQuery, [this.id], (error, results) => {
      if (error) {
        console.error("Error al eliminar registro de la tabla Revision:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        console.log("Registro eliminado de la tabla Revision correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para evaluar una revisión
    evaluacion(id_ea, resultado, callback) {
    // Asegúrate de que los valores de id_ea y resultado sean válidos
        if (!id_ea || !resultado) {
        console.error("Error: id_ea y resultado son obligatorios.");
        // Llamar al callback con el error
        return callback("Error: id_ea y resultado son obligatorios.");
    }
  
    // Actualizar el registro con la evaluación
    const actualizarQuery = "UPDATE Revision SET id_ea = ?, resultado = ? WHERE id = ?";
    const valores = [id_ea, resultado, this.id];
  
    connection.query(actualizarQuery, valores, (error, results) => {
      if (error) {
        console.error("Error al actualizar registro en la tabla Revision:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        console.log("Registro actualizado en la tabla Revision con la evaluación.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }
  
}

// Exportar la clase Revision
module.exports = Revision;
