module.exports = app => {
    const Estudiante = require("../controllers/estudiante.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", Estudiante.create);
    // Retrieve all Client
    router.get("/", Estudiante.findAll);
    // Retrieve all published Client
    router.get("/status", Estudiante.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", Estudiante.findOne);
    // Update a Client with id
    router.put("/update/:id", Estudiante.update);
    // Delete a Client with id
    router.delete("/delete/:id", Estudiante.delete);
    // Delete all Cliente
    router.delete("/delete/", Estudiante.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/customer", router);
};
