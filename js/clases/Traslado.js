const Chofer = require('./Chofer');
const Cliente= require('./Cliente');

class traslado{

    constructor(){
        this.id=0;
        this.id_chofer=0;
        this.id_cliente=0;
        this.id_vehiculo="";
        this.latitudA=0;
        this.longitudA=0;
        this.profundidadA=0;
        this.latitudB=0;
        this.longitudB=0;
        this.profundidadB=0;
        this.distancia=0;
        this.monto=0;
        this.fecha_inicio="00-00-0000";
        this.hora_inicio="00:00";
        this.hora_finalizacion="00:00";
        this.estado="";
    }

    NuevoTraslado(id_chofer,id_cliente,id_vehiculo,latitudA,longitudA,profundidadA,latitudB,longitudB,profundidadB,distancia,callback){

        const fecha=new Date();

        this.id_chofer=id_chofer;
        this.id_cliente=id_cliente;
        this.id_vehiculo=id_vehiculo;
        this.latitudA=latitudA;
        this.longitudA=longitudA;
        this.profundidadA=profundidadA;
        this.latitudB=latitudB;
        this.longitudB=longitudB;
        this.profundidadB=profundidadB;
        this.fecha=fecha.toISOString();
        this.distancia=distancia;
        this.monto=0.5*distancia;
        this.hora_inicio="";
        this.hora_finalizacion="";
        this.estado="EN PROCESO";

        const connection = require('./Conexion');
        const insertTrasladoQuery = "INSERT INTO traslados VALUES (floor(RAND()*1000000), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const TrasladoValues = [this.id_chofer,this.id_cliente,this.id_vehiculo,this.latitudA,this.longitudA,this.profundidadA,this.latitudB,this.longitudB,this.profundidadB,this.distancia,this.monto,this.fecha,this.hora_inicio,this.hora_finalizacion,this.estado];

        connection.query(insertTrasladoQuery, TrasladoValues, (error, results) => {
            if (error) {
              console.error("No se pudo insertar el registro de traslado:", error);
              return callback(error);
            } else {
              console.log("Traslado iniciado Correctamente.");
              return callback(null);
            }
          });

    }

    Terminar_viaje(callback){
        const connection = require('./Conexion');
        this.estado="FINALIZADO";
        const insertTrasladoQuery = "UPDATE traslados SET status=? where id_cliente= ? , id_chofer= ?";
        const TrasladoValues=[this.estado,this.id_cliente,this.id_chofer];
        connection.query(insertTrasladoQuery, TrasladoValues, (error, results) => {
            if (error) {
              console.error("No se pudo Terminar el traslado:", error);
              return callback(error);
            } else {
              console.log("Traslado terminado correctamente.");
              const chofer=new Chofer();
              const cliente=new Cliente();
              chofer.sumarSaldo(this.id_chofer,this.monto*0,30);
              cliente.restarSaldo(this.id_cliente,this.monto);
              return callback(null);
            }
          });
    }

    Cancelar_viaje(callback){
        const connection = require('./Conexion');
        this.estado="CANCELADO";
        const insertTrasladoQuery = "UPDATE traslados SET status=? where id_cliente= ? , id_chofer= ?";
        const TrasladoValues=[this.estado,this.id_cliente,this.id_chofer];
        connection.query(insertTrasladoQuery, TrasladoValues, (error, results) => {
            if (error) {
              console.error("No se pudo Terminar el traslado:", error);
              return callback(error);
            } else {
              console.log("Traslado cancelado correctamente.");
              return callback(null);
            }
          });
    }

    extraerDeBD(id_chofer,id_cliente, callback) {
        const obtenerTrasladoQuery = "SELECT * FROM traslados WHERE id_chofer = ?, id_cliente = ?";
        connection.query(obtenerTrasladoQuery, [id_chofer,id_cliente], (error, results) => {
          if (error) {
            console.error("Error al obtener el traslado desde la base de datos:", error);
            // Llamar al callback con el error
            return callback(error, null);
          } else {
            if (results.length > 0) {
              const traslado = results[0];
              // Asignar los valores obtenidos de la base de datos a los atributos de la instancia
              this.id = traslado.id;
              this.id_chofer = traslado.id_chofer;
              this.id_cliente = traslado.id_cliente;
              this.id_vehiculo = traslado.id_vehiculo;
              this.latitudA = traslado.latitudA;
              this.longitudA = traslado.longitudA;
              this.profundidadA = traslado.profundidadA;
              this.latitudB = traslado.latitudB;
              this.longitudB = traslado.longitudB;
              this.profundidadB = traslado.profundidadB;
              this.distancia = traslado.distancia;
              this.monto = traslado.monto;
              this.fecha = traslado.fecha;
              this.hora_inicio = traslado.hora_inicio;
              this.hora_finalizacion = traslado.hora_finalizacion;
              this.estado = traslado.estado;
    
              // Llamar al callback sin error y con el objeto traslado
              callback(null, this);
            } else {
              console.log("No se encontró el traslado en la base de datos.");
              // Llamar al callback con un objeto vacío (puedes ajustar esto según tus necesidades)
              callback(null, {});
            }
          }
        });
      }

    ConsultarTrasladosDeCliente(id_cliente,callback){
         // Método para consultar registros de la tabla pruebas psicologicas 
              const connection = require('./Conexion');
              const consultarChoferQuery = "SELECT * FROM traslados where id_cliente=?";

              connection.query(consultarChoferQuery,[id_cliente], (error, results) => {
                if (error) {
                  console.error("Error al consultar registros de la tabla chofer:", error);
                  return callback(error);
                } else {
                  // Llamar al callback con los resultados
                  callback(null, results);
                }
              });
  }

  ConsultarTrasladosDeChofer(id_chofer,callback){
    // Método para consultar registros de la tabla pruebas psicologicas 
         const connection = require('./Conexion');
         const consultarChoferQuery = "SELECT * FROM traslados where id_chofer=?";

         connection.query(consultarChoferQuery,[id_chofer], (error, results) => {
           if (error) {
             console.error("Error al consultar registros de la tabla chofer:", error);
             return callback(error);
           } else {
             // Llamar al callback con los resultados
             callback(null, results);
           }
         });
  }
  
}