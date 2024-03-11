let mysql = require("mysql");
const Usuario = require('./Usuario');


class Chofer extends Usuario{

    constructor(){
        super();
        this.id=0;
        this.id_user=0;
        this.saldo=0;
        this.estado="NO APROBADO";
    }

    
  extraer_deBD(ci_user, callback) {
    const connection = require('./Conexion');

    const obtenerChoferQuery = "SELECT * FROM chofer WHERE id_user = ?";
    connection.query(obtenerChoferQuery, [ci_user], (error, results) => {
      if (error) {
        console.error("Error al obtener datos del chofer:", error);
        return callback(error, null);
      } else {
        if (results.length > 0) {
          const chofer = results[0];
          this.id = chofer.id_chofer;
          this.id_user=chofer.id_user;
          this.saldo=chofer.saldo;
          this.estado = chofer.estado;

          // También puedes llamar al método de la clase base para almacenar los datos del usuario
          super.obtenerUsuarioDesdeBD(ci_user, (error) => {
            if (error) {
              console.error("Error al obtener datos del usuario:", error);
              return callback(error, null);
            } else {
              console.log("Datos del chofer obtenidos correctamente desde la base de datos.");
              return callback(null, this);
            }
          });
        } else {
          console.log("No se encontró el chofer en la base de datos.");
          return callback(null, null);
        }
      }
    });
  }

  insertar_enBD(callback) {
    const connection = require('./Conexion');

    const insertChoferQuery = "INSERT INTO chofer VALUES (floor(RAND()*1000000), ?, ?, ?)";
    const choferValues = [this.id_user,this.saldo,this.estado];

    connection.query(insertChoferQuery, choferValues, (error, results) => {
      if (error) {
        console.error("No se pudo insertar en la tabla chofer:", error);
        return callback(error);
      } else {
        console.log("Datos del chofer insertados en la tabla chofer correctamente.");
        return callback(null);
      }
    });
  }

  eliminar_deBD(callback) {
    const connection = require('./Conexion');

    const eliminarChoferQuery = "DELETE FROM chofer WHERE id_user = ?";
    const choferValues = [this.id_user];

    connection.query(eliminarChoferQuery, choferValues, (error, results) => {
      if (error) {
        console.error("Error al eliminar chofer de la base de datos:", error);
        return callback(error);
      } else {
        console.log("Chofer eliminado de la base de datos correctamente.");
        // Llamar al callback con éxito
        callback(null, results);
      }
    });
  }

  imprimirDatosChofer() {
    super.imprimirDatos(); // Llama al método de la clase base para imprimir datos de Usuario
    console.log("Datos del chofer:");
    console.log("ID: " + this.id +" ID_USER: "+this.id_user+" Saldo: "+this.saldo +" estado: "+this.estado);
  }

  verificar_Estado(id_user){
    const connection = require('./Conexion');

    const usuariosQuery = "SELECT estado FROM chofer WHERE id_user = ?";
    connection.query(usuariosQuery, [id_user], (error, results) => {
      if (error) {
        console.error("Error al verificar la existencia del usuario:", error);
        // Llamar al callback con el error
        return callback(error,null);
      } else {
        if (results.length > 0) {
          const estado = results[0].estado;
          // Verificar si el estado es "Disponible"
          const disponible = estado === "DISPONIBLE" ? 1 : 0;
  
          // Llamar al callback sin error y con el resultado
          callback(null, disponible);
        } else {
          console.log("No se encontró el chofer en la base de datos.");
          // Llamar al callback sin error y con 0 como resultado
          callback(null, 0);
        }
      }
    });
  }

  sumarSaldo(id_user, monto) {
    const connection = require('./Conexion');
    // Obtener saldo actual de la base de datos
    const obtenerSaldoQuery = "SELECT saldo FROM chofer WHERE id_user = ?";
    connection.query(obtenerSaldoQuery, [id_user], (error, results) => {
      if (error) {
        console.error("Error al obtener el saldo del chofer:", error);
      } else {
        if (results.length > 0) {
          const saldoActual = results[0].saldo;
          const nuevoSaldo = saldoActual + monto;

          // Actualizar saldo en la base de datos
          const actualizarSaldoQuery = "UPDATE chofer SET saldo = ? WHERE id_user = ?";
          connection.query(actualizarSaldoQuery, [nuevoSaldo, id_user], (updateError, updateResults) => {
            if (updateError) {
              console.error("Error al actualizar el saldo del chofer:", updateError);
            } else {
              console.log("Saldo actualizado correctamente.");
              // Actualizar el atributo saldo en la instancia de Chofer
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
    const obtenerSaldoQuery = "SELECT saldo FROM chofer WHERE id_user = ?";
    connection.query(obtenerSaldoQuery, [id_user], (error, results) => {
      if (error) {
        console.error("Error al obtener el saldo del chofer:", error);
      } else {
        if (results.length > 0) {
          const saldoActual = results[0].saldo;
          const nuevoSaldo = saldoActual - monto;

          // Actualizar saldo en la base de datos
          const actualizarSaldoQuery = "UPDATE chofer SET saldo = ? WHERE id_user = ?";
          connection.query(actualizarSaldoQuery, [nuevoSaldo, id_user], (updateError, updateResults) => {
            if (updateError) {
              console.error("Error al actualizar el saldo del chofer:", updateError);
            } else {
              console.log("Saldo actualizado correctamente.");
              // Actualizar el atributo saldo en la instancia de Chofer
              this.saldo = nuevoSaldo;
            }
          });
        } else {
          console.log("No se encontró el chofer en la base de datos.");
        }
      }
    });
  }

  



}

module.exports = Chofer;