class ContactoEmergencia {
    constructor(ci,chofer,nombre,telefono,parentesco) {
      this.ci_contacto =ci || 0;
      this.id_chofer = chofer || 0;
      this.nombre = nombre || "";
      this.telefono = telefono || 0;
      this.parentesco = parentesco || "";
    }
  
    // Método para insertar en la base de datos
    insertarEnBD(callback) {
      const connection = require('./Conexion');
      const insertarQuery = "INSERT INTO contactoEmergencia (ci_contacto, id_chofer, nombre, telefono, parentesco) VALUES (?, ?, ?, ?, ?)";
      const valores = [this.ci_contacto, this.id_chofer, this.nombre, this.telefono, this.parentesco];
  
      connection.query(insertarQuery, valores, (error, results) => {
        if (error) {
          console.error("Error al insertar en la tabla contactoEmergencia:", error);
          // Llamar al callback con el error
          return callback(error);
        } else {
          console.log("Datos de contacto de emergencia insertados correctamente.");
          // Llamar al callback sin error y con los resultados
          callback(null, results);
        }
      });
    }
  
    // Método para extraer de la base de datos
    extraerDeBD(ci_contacto, callback) {
      const connection = require('./Conexion');
      const extraerQuery = "SELECT * FROM contactoEmergencia WHERE ci_contacto = ?";
      
      connection.query(extraerQuery, [ci_contacto], (error, results) => {
        if (error) {
          console.error("Error al extraer datos de la tabla contactoEmergencia:", error);
          // Llamar al callback con el error
          return callback(error);
        } else {
          if (results.length > 0) {
            // Almacena los datos en los atributos de la instancia
            const contactoEmergencia = results[0];
            this.ci_contacto = contactoEmergencia.ci_contacto;
            this.id_chofer = contactoEmergencia.id_chofer;
            this.nombre = contactoEmergencia.nombre;
            this.telefono = contactoEmergencia.telefono;
            this.parentesco = contactoEmergencia.parentesco;
  
            console.log("Datos de contacto de emergencia extraídos correctamente desde la base de datos.");
            // Llamar al callback sin error y con los resultados
            callback(null, results);
          } else {
            console.log("No se encontró el contacto de emergencia en la base de datos.");
            // Llamar al callback sin error y sin resultados
            callback(null, null);
          }
        }
      });
    }
  
    // Método para modificar en la base de datos
    modificarEnBD(callback) {
      const connection = require('./Conexion');
      const modificarQuery = "UPDATE contactoEmergencia SET nombre = ?, telefono = ?, parentesco = ? WHERE ci_contacto = ?";
      const valores = [this.nombre, this.telefono, this.parentesco, this.ci_contacto];
  
      connection.query(modificarQuery, valores, (error, results) => {
        if (error) {
          console.error("Error al modificar en la tabla contactoEmergencia:", error);
          // Llamar al callback con el error
          return callback(error);
        } else {
          console.log("Datos de contacto de emergencia modificados correctamente.");
          // Llamar al callback sin error y con los resultados
          callback(null, results);
        }
      });
    }
  
    // Método para eliminar de la base de datos
    eliminarDeBD(callback) {
      const connection = require('./Conexion');
      const eliminarQuery = "DELETE FROM contactoEmergencia WHERE ci_contacto = ?";
  
      connection.query(eliminarQuery, [this.ci_contacto], (error, results) => {
        if (error) {
          console.error("Error al eliminar de la tabla contactoEmergencia:", error);
          // Llamar al callback con el error
          return callback(error);
        } else {
          console.log("Datos de contacto de emergencia eliminados correctamente.");
          // Llamar al callback sin error y con los resultados
          callback(null, results);
        }
      });
    }

    static mostrarContactosDeChofer(id_chofer, callback) {
        const connection = require('./Conexion');
        const mostrarQuery = "SELECT * FROM contactoEmergencia WHERE id_chofer = ?";
    
        connection.query(mostrarQuery, [id_chofer], (error, results) => {
          if (error) {
            console.error("Error al obtener contactos de emergencia del chofer:", error);
            // Llamar al callback con el error
            return callback(error);
          } else {
            if (results.length > 0) {
              // Imprimir los datos de los contactos
              console.log(`Contactos de emergencia del chofer con id ${id_chofer}:`);
              results.forEach((contacto) => {
                console.log(`CI: ${contacto.ci_contacto}, Nombre: ${contacto.nombre}, Teléfono: ${contacto.telefono}, Parentesco: ${contacto.parentesco}`);
              });
              // Llamar al callback sin error y con los resultados
              callback(null, results);
            } else {
              console.log(`El chofer con id ${id_chofer} no tiene contactos de emergencia registrados.`);
              // Llamar al callback sin error y sin resultados
              callback(null, null);
            }
          }
        });
      }
  }
  
  module.exports = ContactoEmergencia;
  