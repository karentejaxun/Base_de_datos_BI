const db = require("../models");
const Libro = db.libro;  // ← Evita conflictos de nombre
const Op = db.Sequelize.Op;

// Crear un nuevo libro
exports.create = (req, res) => {
    if (!req.body.id_libro) {
        return res.status(400).send({ message: "El ID del libro no puede estar vacío." });
    }

    const nuevoLibro = {
        id_libro: req.body.id_libro,
        autor: req.body.autor,
        aniopublicacion: req.body.aniopublicacion,
        genero: req.body.genero,
        disponible: req.body.disponible,
        status: req.body.status ? req.body.status : false
    };

    Libro.create(nuevoLibro)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al crear el libro." });
        });
};

// Obtener todos los libros (con filtro opcional por autor)
exports.findAll = (req, res) => {
    const autor = req.query.autor;
    const condition = autor ? { autor: { [Op.iLike]: `%${autor}%` } } : null;

    Libro.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener libros." });
        });
};

// Obtener un solo libro por ID
exports.findOne = (req, res) => {
    const id_libro = req.params.id_libro;

    Libro.findByPk(id_libro)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "Libro no encontrado." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al recuperar el libro con ID=" + id_libro });
        });
};

// Actualizar libro
exports.update = (req, res) => {
    const id_libro = req.params.id_libro;

    Libro.update(req.body, {
        where: { id_libro: id_libro }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Libro actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar el libro con ID=${id_libro}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar el libro con ID=" + id_libro });
        });
};

// Eliminar un libro
exports.delete = (req, res) => {
    const id_libro = req.params.id_libro;

    Libro.destroy({ where: { id_libro: id_libro } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Libro eliminado correctamente." });
            } else {
                res.send({ message: `No se encontró libro con ID=${id_libro}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al eliminar el libro con ID=" + id_libro });
        });
};

// Eliminar todos los libros
exports.deleteAll = (req, res) => {
    Libro.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} libros eliminados correctamente.` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al eliminar todos los libros." });
        });
};

// Encontrar todos los libros activos
exports.findAllStatus = (req, res) => {
    Libro.findAll({ where: { status: true } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener libros activos." });
        });
};
