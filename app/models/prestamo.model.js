const { ForeignKeyConstraintError, Model } = require("sequelize");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");

//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cliente"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const prestamo = sequelize.define("prestamo", {
        id_prestamo: {
            type: Sequelize.INT,
            primarykey:true,
            autoIncrement:true
        },
        id_libro: {
            type: Sequelize.INT,
            refernces: {Model:"libro",
                primarkey:"id_libro"
            }

            
        },
        carnet: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        }
    });
    return prestamo;
};