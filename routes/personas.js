const express = require("express");
const router = express.Router();
const Persona = require("../models/persona.js");

// Listar todas las personas
router.get("/", async (req, res) => {
  // Manejador de ruta GET para obtener todas las personas
  const personas = await Persona.find();
  res.send(personas);
});

// Crear una nueva persona
router.post("/", async (req, res) => {
  // Manejador de ruta POST para crear una nueva persona
  try {
    const { nombre, edad, correo } = req.body;

    // Verifica que todos los campos requeridos estén presentes
    if (!nombre || !edad || !correo) {
      return res.status(400).send("Faltan datos en el cuerpo de la solicitud.");
    }

    // Crea una nueva instancia de `Persona` con los datos proporcionados
    let persona = new Persona({
      nombre,
      edad,
      correo,
    });

    persona = await persona.save();
    res.status(201).send(persona);
  } catch (error) {
    console.error("Error al crear la persona:", error);
    res.status(500).send("Error al crear la persona.");
  }
});

// Actualizar una persona
router.put("/:id", async (req, res) => {
  // Manejador de ruta PUT para actualizar una persona existente
  const persona = await Persona.findByIdAndUpdate(
    req.params.id,
    {
      nombre: req.body.nombre,
      edad: req.body.edad,
      correo: req.body.correo,
    },
    { new: true }
  );

  // Si no se encuentra la persona, envíar un error 404
  if (!persona)
    return res.status(404).send("La persona con el ID dado no fue encontrada.");

  // Envíar la persona actualizada como respuesta
  res.send(persona);
});

// Eliminar una persona
router.delete("/:id", async (req, res) => {
  // Manejador de ruta DELETE para eliminar una persona existente
  const persona = await Persona.findByIdAndDelete(req.params.id);

  // Si no se encuentra la persona, envíar un error 404
  if (!persona)
    return res.status(404).send("La persona con el ID dado no fue encontrada.");

  // Envíar la persona eliminada como respuesta (puedes enviar un mensaje de éxito si lo prefieres)
  res.send(persona);
});

module.exports = router;
