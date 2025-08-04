module.exports = app => {
    const libro = require("../controllers/libro.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", libro.create);
    // Retrieve all Client
    router.get("/", libro.findAll);
    // Retrieve all published Client
    router.get("/status", libro.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", libro.findOne);
    // Update a Client with id
    router.put("/update/:id", id_libro.update);
    // Delete a Client with id
    router.delete("/delete/:id", libro.delete);
    // Delete all Cliente
    router.delete("/delete/", libro.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/customer", router);
};
