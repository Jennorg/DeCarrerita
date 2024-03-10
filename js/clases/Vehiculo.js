// vehiculo.js

class Vehiculo {
    constructor() {
      this.placa = "";
      this.id_dueño = 0;
      this.anno = 0;
      this.nombre = "";
      this.marca = "";
      this.color = "";
      this.descripcion = "";
      this.status = "EN REVISION";
    }
  
    // Método para insertar un vehículo en la base de datos
    insertarBD(callback) {
      const connection = require('./Conexion');
  
      const insertarVehiculoQuery = "INSERT INTO vehiculo (placa, id_dueño, anno, nombre, marca, color, descripcion, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const vehiculoValues = [this.placa, this.id_dueño, this.anno, this.nombre, this.marca, this.color, this.descripcion, this.status];
  
      connection.query(insertarVehiculoQuery, vehiculoValues, (error, results) => {
        if (error) {
          console.error("No se pudo insertar el vehículo en la base de datos:", error);
          return callback(error);
        } else {
          console.log("Vehículo insertado en la base de datos correctamente.");
  
          // Llamar al callback con éxito
          callback(null, results);
        }
      });
    }
  
    // Método para extraer un vehículo de la base de datos
    static extraerBD(placa, callback) {
      const connection = require('./Conexion');
  
      const extraerVehiculoQuery = "SELECT * FROM vehiculo WHERE placa = ?";
      connection.query(extraerVehiculoQuery, [placa], (error, results) => {
        if (error) {
          console.error("Error al extraer el vehículo desde la base de datos:", error);
          return callback(error);
        } else {
          if (results.length > 0) {
            const vehiculo = results[0];
            this.placa=vehiculo.placa;
            this.id_dueño=vehiculo.id_dueño;
            this.anno=vehiculo.anno;
            this.name=vehiculo.name;
            this.marca=vehiculo.marca;
            this.color=vehiculo.color;
            this.descripcion=vehiculo.descripcion;
            this.status=vehiculo.status;
            // Llamar al callback con los datos del vehículo
            callback(null, vehiculo);
          } else {
            // Llamar al callback indicando que no se encontró el vehículo
            callback(null, null);
          }
        }
      });
    }
  
    // Método para eliminar un vehículo de la base de datos
    eliminarBD(callback) {
      const connection = require('./Conexion');
  
      const eliminarVehiculoQuery = "DELETE FROM vehiculo WHERE placa = ?";
      connection.query(eliminarVehiculoQuery, [this.placa], (error, results) => {
        if (error) {
          console.error("Error al eliminar el vehículo desde la base de datos:", error);
          return callback(error);
        } else {
          console.log("Vehículo eliminado de la base de datos correctamente.");
  
          // Llamar al callback con éxito
          callback(null, results);
        }
      });
    }
  
    // Método para modificar un vehículo en la base de datos
    modificarBD(anno,nombre,marca,color,descripcion,status) {
      const connection = require('./Conexion');
      this.anno = anno;
      this.nombre = nombre;
      this.marca = marca;
      this.color = color;
      this.descripcion = descripcion;
      this.status = status;
  
      const modificarVehiculoQuery = "UPDATE vehiculo SET anno = ?, nombre = ?, marca = ?, color = ?, descripcion = ?, status = ? WHERE placa = ?";
      const vehiculoValues = [this.anno, this.nombre, this.marca, this.color, this.descripcion, this.status, this.placa];
  
      connection.query(modificarVehiculoQuery, vehiculoValues, (error, results) => {
        if (error) {
          console.error("Error al modificar el vehículo en la base de datos:", error);
          return callback(error);
        } else {
          console.log("Vehículo modificado en la base de datos correctamente.");
  
          // Llamar al callback con éxito
          callback(null, results);
        }
      });
    }
  }
  
  module.exports = Vehiculo;
  