const db = require("../models");
const Estudiante = db.Estudiante;  // ← Evita conflictos de nombre
const Op = db.Sequelize.Op;

// Crear un nuevo libro
exports.create = (req, res) => {
    if (!req.body.id_estudiante) {
        return res.status(400).send({ message: "El ID del  no puede estar vacío." });
    }

    const nuevoEstudiante = {
        id_estudiante: req.body.id_estudiante,
        nombre: req.body.nombre,
        carnet: req.body.carnet,
        correo: req.body.correo,
        status: req.body.status ? req.body.status : false
    };

    Estudiante.create(nuevoEstudiante)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al crear estudiante." });
        });
};

// Obtener todos los libros (con filtro opcional por autor)
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Estudiante.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener estudiante." });
        });
};

// Obtener un solo libro por ID
exports.findOne = (req, res) => {
    const id_estudiante = req.params.id_estudiante;

    Estudiante.findByPk(id_estudiante)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "estudiante no encontrado." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al recuperar el estudiante con ID=" + id_estudiante });
        });
};

// Actualizar libro
exports.update = (req, res) => {
    const id_estudiante = req.params.id_estudiante;

    Estudiante.update(req.body, {
        where: { id_estudiante: id_estudiante }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Estudiante actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar estudiante con ID=${id_estudiante}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar estuadiante con ID=" + id_estudiante });
        });
};

// Eliminar un libro
exports.delete = (req, res) => {
    const id_estudiante = req.params.id_estudiante;

    Estudiante.destroy({ where: { id_estudiante: id_estudiante } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "estudiante eliminado correctamente." });
            } else {
                res.send({ message: `No se encontró estudiante con ID=${id_estudiante}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al eliminar estudiante con ID=" + id_estudiante });
        });
};

// Eliminar todos los libros
exports.deleteAll = (req, res) => {
    Estudiante.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} estudiantes eliminados correctamente.` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al eliminar todos los estudiantes." });
        });
};

// Encontrar todos los libros activos
exports.findAllStatus = (req, res) => {
    Estudiante.findAll({ where: { status: true } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener estudiantes activos." });
        });
};
