// Ejemplo de uso en otroArchivo.js
const Chofer=require('./Chofer');



const nuevoChofer = new Chofer();
nuevoChofer.id_user=987654321;

// Llamar al método insertar_enBD para insertar el nuevo cliente en la base de datos
nuevoChofer.eliminar_deBD((error) => {
    if (error) {
      console.error("Error al eliminar chofer de la base de datos:", error);
    } else {
      console.log("Chofer eliminado de la base de datos correctamente.");
    }
  });





