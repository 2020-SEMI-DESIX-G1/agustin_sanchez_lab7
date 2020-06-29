require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const connectDb = require("./config/dbConfig");
const Estudiantes = require("./models/Estudiantes");

const PORT = 3000;

// Intermediarios
app.use(bodyParser.json());

// Controladores - API
app.get("/api/estudiantes/", async (req, res) => {
  const estudiantes = await Estudiantes.find().select("nombre edad");
  res.json({
    estudiantes,
    cantidad: estudiantes.length,
  });
});
app.post("/api/estudiantes/", async (req, res) => {
  const { nombre, edad } = req.body;
  await Estudiantes.create({ nombre, edad });
  res.json({ nombre, edad });
});
app.get("/api/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiantes.findById(req.params.id).select(
      "nombre edad"
    );
    res.json(estudiante);
  } catch (error) {
    console.log(error);
    res.json({});
  }
});

app.put("/api/estudiantes/:id", async (req, res) => {
  const { nombre, edad } = req.body;
  await Estudiantes.findByIdAndUpdate(req.params.id, {
    $set: { nombre, edad },
  })
    .then(() => {
      res.status(200).json(x, y);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.delete("/api/estudiantes/:id", async (req, res) => {
  await Estudiantes.findByIdAndDelete(req.params.id),
    then(() => {
      res.status(200).json(`${req.params.id} deleted`);
    }).catch((err) => {
      res.status(500).json(err);
    });
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Ejecutando en el puerto ${PORT}`);
  });
});
