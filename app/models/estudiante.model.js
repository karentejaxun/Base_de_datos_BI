//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cliente"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const estudiante = sequelize.define("estudiante", {
        id_estudiante: {
            type: Sequelize.INT,
            primarykey:true,
            autoIncrement:true
        },
        nombre: {
            type: Sequelize.STRING
        },
        carnet: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        }
    });
    return estudiante;
};