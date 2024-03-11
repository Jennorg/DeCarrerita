

const connection = require('./Conexion'); // Asegúrate de tener la conexión a la base de datos
const Chofer=require('./Chofer');

class PagoChofer {
  constructor(chofer,banco,monto) {
    this.id = 0;
    this.id_chofer= chofer || 0;
    this.id_banco = banco || 0;
    this.id_ea = null; // Podría ser null si es opcional
    this.referencia = 0;
    this.fecha="0000-00-00";
    this.monto = monto || 0;
  }

  // Método para insertar un nuevo pago al chofer en la base de datos
  SolicitarEnBD(callback) {
    const insertarPagoChoferQuery = "INSERT INTO PagoChofer (id_chofer,id_banco, id_ea, referencia,fecha, monto) VALUES ( ?, ?, ?, ?, ?)";
    const valoresPagoChofer = [this.id_chofer,this.id_banco, this.id_ea, this.referencia,this.fecha, this.monto];

    connection.query(insertarPagoChoferQuery, valoresPagoChofer, (error, results) => {
      if (error) {
        console.error("Error al insertar en la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        console.log("Pago al chofer insertado en la base de datos correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para modificar un pago al chofer en la base de datos
  modificarEnBD(callback) {
    const modificarPagoChoferQuery = "UPDATE PagoChofer SET id_chofer = ?, id_banco = ?, id_ea = ?, referencia = ?, monto = ? WHERE id = ?";
    const valoresPagoChofer = [this.id_chofer, this.id_banco, this.id_ea, this.referencia, this.monto, this.id];

    connection.query(modificarPagoChoferQuery, valoresPagoChofer, (error, results) => {
      if (error) {
        console.error("Error al modificar en la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        console.log("Pago al chofer modificado en la base de datos correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para eliminar un pago al chofer de la base de datos
  eliminarEnBD(id,callback) {
    const eliminarPagoChoferQuery = "DELETE FROM PagoChofer WHERE id = ?";
    const valoresPagoChofer = [id];

    connection.query(eliminarPagoChoferQuery, valoresPagoChofer, (error, results) => {
      if (error) {
        console.error("Error al eliminar de la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        console.log("Pago al chofer eliminado de la base de datos correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para extraer un pago al chofer de la base de datos
  extraerDeBD(id,callback) {
    const extraerPagoChoferQuery = "SELECT * FROM PagoChofer WHERE id = ?";
    const valoresPagoChofer = [id];

    connection.query(extraerPagoChoferQuery, valoresPagoChofer, (error, results) => {
      if (error) {
        console.error("Error al extraer de la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        if (results.length > 0) {
          const pagoChofer = results[0];
          // Asignar los valores obtenidos de la base de datos a los atributos de la instancia
          this.id = pagoChofer.id;
          this.id_traslado = pagoChofer.id_traslado;
          this.id_banco = pagoChofer.id_banco;
          this.id_ea = pagoChofer.id_ea;
          this.referencia = pagoChofer.referencia;
          this.fecha=pagoChofer.fecha;
          this.monto = pagoChofer.monto;

          // Llamar al callback sin error y con el objeto pagoChofer
          callback(null, this);
        } else {
          console.log("No se encontró el pago al chofer en la base de datos.");
          // Llamar al callback con un objeto vacío (puedes ajustar esto según tus necesidades)
          callback(null, {});
        }
      }
    });
  }

  static AprobarPago(id_ea, referencia,id_chofer,fecha,monto, callback) {
    const aprobarPagoQuery = "UPDATE PagoChofer SET id_ea = ?, referencia= ?,fecha=? WHERE id_chofer=? AND n_referencia=0";
    
    connection.query(aprobarPagoQuery, [id_ea, referencia,fecha,id_chofer], (error, results) => {
      if (error) {
        console.error("Error al aprobar el pago del chofer:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        if (results.affectedRows > 0) {
          console.log("Pago del chofer aprobado correctamente.");
          const chofer=new Chofer();
          chofer.restarSaldo(id_chofer,monto);
          // Llamar al callback sin error y con los resultados
          callback(null);
        } else {
          console.log("No se encontró el pago del chofer con los criterios proporcionados.");
          // Llamar al callback con un mensaje indicando que no se encontró el pago
          callback("No se encontró el pago del chofer con los criterios proporcionados.");
        }
      }
    });
  }

  static RegistrosPagos(callback) {
    const imprimirRecargasQuery = "SELECT * FROM PagoChofer";
    connection.query(imprimirRecargasQuery, (error, results) => {
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

  static RegistrosUnicoChofer(id_chofer,callback) {
    const imprimirRecargasQuery = "SELECT * FROM PagoChofer WHERE id_chofer=?";
    const imprimirValues=[id_chofer];
    connection.query(imprimirRecargasQuery,imprimirValues, (error, results) => {
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

  static TotalPagadoAChofer(id_chofer, callback) {
    const totalPagadoQuery = "SELECT SUM(monto) as totalPagado FROM PagoChofer WHERE id_chofer = ?";
    
    connection.query(totalPagadoQuery, [id_chofer], (error, results) => {
      if (error) {
        console.error("Error al obtener el monto total pagado al chofer:", error);
        // Llamar al callback con el error
        return callback(error);
      } else {
        const totalPagado = results[0].totalPagado || 0;
        console.log(`Monto total pagado al chofer: $${totalPagado}`);
        // Llamar al callback sin error y con el monto total
        callback(null, totalPagado);
      }
    });
  }

}

module.exports = PagoChofer;
