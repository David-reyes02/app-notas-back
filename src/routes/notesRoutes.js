import express from "express";
import Note from "../models/noteModel.js";

const router = express.Router();

// Obtener todas las notas
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener una nota por id
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error al obtener una nota:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear una nota
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title y description son requeridos" });
    }

    const note = new Note({ title, description });
    const savedNote = await note.save();

    res.status(201).json({ message: "Nota creada exitosamente", data: savedNote });
  } catch (error) {
    console.error("Error al crear una nota:", error);
    res.status(500).json({ error: "Error al crear una nota" });
  }
});

// Eliminar una nota
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ error: "Nota no encontrada" });
    res.status(200).json({ message: "Nota eliminada exitosamente", data: deletedNote });
  } catch (error) {
    console.error("Error al eliminar una nota:", error);
    res.status(500).json({ error: "Error al eliminar una nota" });
  }
});

// Editar una nota
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: { ...(title && { title }), ...(description && { description }) } },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ error: "Nota no encontrada" });
    res.status(200).json({ message: "Nota actualizada exitosamente", data: updatedNote });
  } catch (error) {
    console.error("Error al editar una nota:", error);
    res.status(500).json({ error: "Error al editar una nota" });
  }
});

export default router;
