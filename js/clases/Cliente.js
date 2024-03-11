
let mysql = require("mysql");
const Usuario = require('./Usuario');

class Cliente extends Usuario{

    constructor(){
        super();
        this.id=0;
        this.id_user=0;
        this.saldo=0;
    }
    
    insertar_enBD(callback) {
        const pool = require('./Conexion');
    
        // Consultar datos del cliente
        const insertClienteQuery = "INSERT INTO cliente  VALUES (floor(RAND()*1000000),?, ?)";
        const clienteValues = [this.id_user, this.saldo];
    
        pool.getConnection((err, connection) => {
          if (err) {
            console.error("Error al obtener conexión desde el pool:", err);
            return callback(err);
          }
    
          connection.query(insertClienteQuery, clienteValues, (error, results) => {
            connection.release();  // Liberar la conexión al pool después de la consulta
    
            if (error) {
              console.error("No se pudo insertar en la tabla cliente:", error);
              return callback(error);
            }
    
            console.log("Datos del cliente insertados en la tabla cliente correctamente.");
            return callback(null);
          });
        });
      }
    
    obtenerClienteDesdeBD(ci_user, callback) {
        const pool = require('./Conexion');
    
        // Consultar datos del cliente
        const obtenerClienteQuery = "SELECT * FROM cliente WHERE id_user = ?";
    
        pool.getConnection((err, connection) => {
          if (err) {
            console.error("Error al obtener conexión desde el pool:", err);
            return callback(err, null);
          }
    
          connection.query(obtenerClienteQuery, [ci_user], (error, results) => {
            if (error) {
              console.error("Error al obtener datos del cliente:", error);
              connection.release();  // Liberar la conexión al pool en caso de error
              return callback(error, null);
            } else {
              if (results.length > 0) {
                // Llamar al método de la clase base para obtener datos del usuario
                super.obtenerUsuarioDesdeBD(ci_user, (err, usuario) => {
                  if (err) {
                    connection.release();  // Liberar la conexión al pool en caso de error
                    return callback(err, null);
                  }
    
                  // Almacena los datos en los atributos de la instancia
                  const cliente = results[0];
                  this.id = cliente.id_client;
                  this.id_user = cliente.id_user;
                  this.saldo = cliente.saldo;
    
                  console.log("Datos del cliente obtenidos correctamente desde la base de datos.");
    
                  // Liberar la conexión al pool después de la consulta exitosa
                  connection.release();
                  return callback(null, this);
                });
              } else {
                console.log("No se encontró el cliente en la base de datos.");
    
                // Liberar la conexión al pool si no hay resultados
                connection.release();
                return callback(null, null);
              }
            }
          });
        });
      }

      eliminar_deBD(callback) {
        const connection = require('./Conexion');
    
        const eliminarClienteQuery = "DELETE FROM cliente WHERE id_user = ?";
        const clienteValues = [this.id_user];
    
        connection.query(eliminarClienteQuery, clienteValues, (error, results) => {
          if (error) {
            console.error("Error al eliminar cliente de la base de datos:", error);
            return callback(error);
          } else {
            console.log("Cliente eliminado de la base de datos correctamente.");
            // Llamar al callback con éxito
            callback(null, results);
          }
        });
      }

      sumarSaldo(id_user, monto) {
        const connection = require('./Conexion');
        // Obtener saldo actual de la base de datos
        const obtenerSaldoQuery = "SELECT saldo FROM cliente WHERE id_user = ?";
        connection.query(obtenerSaldoQuery, [id_user], (error, results) => {
          if (error) {
            console.error("Error al obtener el saldo del chofer:", error);
          } else {
            if (results.length > 0) {
              const saldoActual = results[0].saldo;
              const nuevoSaldo = saldoActual + monto;
    
              // Actualizar saldo en la base de datos
              const actualizarSaldoQuery = "UPDATE cliente SET saldo = ? WHERE id_user = ?";
              connection.query(actualizarSaldoQuery, [nuevoSaldo, id_user], (updateError, updateResults) => {
                if (updateError) {
                  console.error("Error al actualizar el saldo del cliente:", updateError);
                } else {
                  console.log("Saldo actualizado correctamente.");
                  // Actualizar el atributo saldo en la instancia de cliente
                  this.saldo = nuevoSaldo;
                }
              });
            } else {
              console.log("No se encontró el chofer en la base de datos.");
            }
          }
        });
      }
    
      restarSaldo(id_user, monto) {
        const connection = require('./Conexion');
        // Obtener saldo actual de la base de datos
        const obtenerSaldoQuery = "SELECT saldo FROM cliente WHERE id_user = ?";
        connection.query(obtenerSaldoQuery, [id_user], (error, results) => {
          if (error) {
            console.error("Error al obtener el saldo del cliente:", error);
          } else {
            if (results.length > 0) {
              const saldoActual = results[0].saldo;
              const nuevoSaldo = saldoActual - monto;
    
              // Actualizar saldo en la base de datos
              const actualizarSaldoQuery = "UPDATE cliente SET saldo = ? WHERE id_user = ?";
              connection.query(actualizarSaldoQuery, [nuevoSaldo, id_user], (updateError, updateResults) => {
                if (updateError) {
                  console.error("Error al actualizar el saldo del cliente:", updateError);
                } else {
                  console.log("Saldo actualizado correctamente.");
                  // Actualizar el atributo saldo en la instancia de Cliente
                  this.saldo = nuevoSaldo;
                }
              });
            } else {
              console.log("No se encontró el chofer en la base de datos.");
            }
          }
        });
      }
    
    
     imprimirDatosCliente() {
        super.imprimirDatos(); // Llama al método de la clase base para imprimir datos de Usuario
        console.log("Datos del cliente:");
        console.log("ID: " + this.id +" ID_USER: "+this.ci_user+" Monto: "+this.saldo);
      }
    
}

module.exports = Cliente;