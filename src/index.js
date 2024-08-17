const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Importar y registrar las rutas
const personas = require("../routes/personas");
app.use("/api/personas", personas);

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/personas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB..."))
  .catch((err) => console.error("No se pudo conectar a MongoDB...", err));

// Escuchar el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
