const mongoose = require("mongoose");

// Define el esquema para el modelo 'Persona'
const personaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
});

// Crea un modelo 'Persona' a partir del esquema definido
module.exports = mongoose.model("Persona", personaSchema);
