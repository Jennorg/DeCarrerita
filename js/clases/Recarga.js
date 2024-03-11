const connection = require('./Conexion'); // Asegúrate de tener la conexión a la base de datos
const Cliente = require('./Cliente');

class Recarga {
  constructor(id_cliente,id_banco,monto,n_referencia,fecha) {
    this.id = 0;
    this.id_cliente = id_cliente || 0;
    this.id_banco = id_banco || 0;
    this.monto = monto || 0;
    this.n_referencia = n_referencia || 0;
    this.fecha = fecha||'0000-00-00';
  }

  // Método para insertar una nueva recarga en la base de datos
  insertarEnBD(callback) {
    const insertarRecargaQuery = "INSERT INTO recarga VALUES (floor(RAND()*1000000),?, ?, ?, ?, ?)";
    const valoresRecarga = [this.id_cliente, this.id_banco, this.monto, this.n_referencia,this.fecha];

    connection.query(insertarRecargaQuery, valoresRecarga, (error, results) => {
      if (error) {
        console.error("Error al insertar en la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        console.log("Recarga insertada en la base de datos correctamente.");
        const cliente=new Cliente();
        cliente.sumarSaldo(this.id_cliente,this.monto);
        callback(null, results);
      }
    });
  }

  // Método para modificar una recarga en la base de datos
  modificarEnBD(callback) {
    const modificarRecargaQuery = "UPDATE recarga SET id_cliente = ?, id_banco = ?, monto = ?, n_referencia = ?,fecha = ? WHERE id = ?";
    const valoresRecarga = [this.id_cliente, this.id_banco, this.monto, this.n_referencia, this.fecha, this.id];

    connection.query(modificarRecargaQuery, valoresRecarga, (error, results) => {
      if (error) {
        console.error("Error al modificar en la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        console.log("Recarga modificada en la base de datos correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para eliminar una recarga de la base de datos
  eliminarEnBD(ref,callback) {
    const eliminarRecargaQuery = "DELETE FROM recarga WHERE n_referencia = ?";
    const valoresRecarga = [ref];

    connection.query(eliminarRecargaQuery, valoresRecarga, (error, results) => {
      if (error) {
        console.error("Error al eliminar de la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        console.log("Recarga eliminada de la base de datos correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para extraer una recarga de la base de datos
  extraerDeBD(ref,callback) {
    const extraerRecargaQuery = "SELECT * FROM recarga WHERE n_referencia = ?";
    const valoresRecarga = [ref];

    connection.query(extraerRecargaQuery, valoresRecarga, (error, results) => {
      if (error) {
        console.error("Error al extraer de la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        if (results.length > 0) {
          const recarga = results[0];
          // Asignar los valores obtenidos de la base de datos a los atributos de la instancia
          this.id = recarga.id;
          this.id_cliente = recarga.id_cliente;
          this.id_banco = recarga.id_banco;
          this.monto = recarga.monto;
          this.n_referencia = recarga.n_referencia;
          this.fecha = recarga.fecha;

          // Llamar al callback sin error y con el objeto recarga
          callback(null, this);
        } else {
          console.log("No se encontró la recarga en la base de datos.");
          // Llamar al callback con un objeto vacío (puedes ajustar esto según tus necesidades)
          callback(null, {});
        }
      }
    });
  }

  static RegistrosCliente(id_cliente,callback) {
    const imprimirRecargasQuery = "SELECT * FROM recarga WHERE id_cliente=?";
    const valoresRecargas = [id_cliente];
    connection.query(imprimirRecargasQuery,valoresRecargas, (error, results) => {
      if (error) {
        console.error("Error al imprimir los registros de la tabla recarga:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        if (results.length > 0) {
          console.log("Registros de la tabla recarga:");

          results.forEach((recarga) => {
            console.log("ID:", recarga.id);
            console.log("ID Cliente:", recarga.id_cliente);
            console.log("ID Banco:", recarga.id_banco);
            console.log("Monto:", recarga.monto);
            console.log("Número de Referencia:", recarga.n_referencia);
            console.log("Fecha:", recarga.fecha);
            console.log("----------------------");
          });

          // Llamar al callback sin error y con los resultados
          callback(null, results);
        } else {
          console.log("No hay registros en la tabla recarga.");
          // Llamar al callback con un array vacío
          callback(null, []);
        }
      }
    });
  }

  static RegistrosBanco(id_banco,callback) {
    const imprimirRecargasQuery = "SELECT * FROM recarga WHERE id_banco=?";
    const valoresRecargas = [id_banco];
    connection.query(imprimirRecargasQuery,valoresRecargas, (error, results) => {
      if (error) {
        console.error("Error al imprimir los registros de la tabla recarga:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        if (results.length > 0) {
          console.log("Registros de la tabla recarga:");

          results.forEach((recarga) => {
            console.log("ID:", recarga.id);
            console.log("ID Cliente:", recarga.id_cliente);
            console.log("ID Banco:", recarga.id_banco);
            console.log("Monto:", recarga.monto);
            console.log("Número de Referencia:", recarga.n_referencia);
            console.log("Fecha:", recarga.fecha);
            console.log("----------------------");
          });

          // Llamar al callback sin error y con los resultados
          callback(null, results);
        } else {
          console.log("No hay registros en la tabla recarga.");
          // Llamar al callback con un array vacío
          callback(null, []);
        }
      }
    });
  }

}

module.exports = Recarga;
