const connection = require('./Conexion'); // Asegúrate de tener la conexión a la base de datos

class Banco {
  constructor(rif,nombre,descripcion) {
    this.rif_banco = rif || 0;
    this.nombre = nombre||'';
    this.descripcion = descripcion||'';
  }

  // Método para insertar un nuevo banco en la base de datos
  insertarEnBD(callback) {
    const insertarBancoQuery = "INSERT INTO bancos VALUES (?, ?, ?)";
    const valoresBanco = [this.rif_banco, this.nombre, this.descripcion];

    connection.query(insertarBancoQuery, valoresBanco, (error, results) => {
      if (error) {
        console.error("Error al insertar en la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        console.log("Banco insertado en la base de datos correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para modificar un banco en la base de datos
  modificarEnBD(callback) {
    const modificarBancoQuery = "UPDATE bancos SET nombre = ?, descripcion= ? WHERE rif_banco = ?";
    const valoresBanco = [this.nombre, this.direccion];

    connection.query(modificarBancoQuery, valoresBanco, (error, results) => {
      if (error) {
        console.error("Error al modificar en la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        console.log("Banco modificado en la base de datos correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para eliminar un banco de la base de datos
  eliminarEnBD(rif,callback) {
    const eliminarBancoQuery = "DELETE FROM bancos WHERE rif_banco = ?";
    const valoresBanco = [rif];

    connection.query(eliminarBancoQuery, valoresBanco, (error, results) => {
      if (error) {
        console.error("Error al eliminar de la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        console.log("Banco eliminado de la base de datos correctamente.");
        // Llamar al callback sin error y con los resultados
        callback(null, results);
      }
    });
  }

  // Método para extraer un banco de la base de datos
  extraerDeBD(rif,callback) {
    const extraerBancoQuery = "SELECT * FROM bancos WHERE rif_banco = ?";
    const valoresBanco = [rif];

    connection.query(extraerBancoQuery, valoresBanco, (error, results) => {
      if (error) {
        console.error("Error al extraer de la base de datos:", error);
        // Llamar al callback con el error
        return callback(error, null);
      } else {
        if (results.length > 0) {
          const banco = results[0];
          // Asignar los valores obtenidos de la base de datos a los atributos de la instancia
          this.rif_banco = banco.rif_banco;
          this.nombre = banco.nombre;
          this.descripcion = banco.descripcion;

          // Llamar al callback sin error y con el objeto banco
          callback(null, this);
        } else {
          console.log("No se encontró el banco en la base de datos.");
          // Llamar al callback con un objeto vacío (puedes ajustar esto según tus necesidades)
          callback(null, {});
        }
      }
    });
  }
}

module.exports = Banco;
