const Species = require("../models/species.js");

const speciesController = {
    getAllSpecies: (req, res) => {
        Species.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },

    getSpeciesById: (req, res) => {
        const { id } = req.params;
    
        Species.getById(id, (err, result) => {
            if (err) {
                return res.status(404).json({ message: "Especie no encontrada" });
            }
            res.json(result);
        });
    },

    createSpecies: (req, res) => {
        const { nombre_comercial, nombre_cientifico } = req.body;
        if (!nombre_comercial || !nombre_cientifico) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
        Species.create(req.body, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Especie creada correctamente", id: result.insertId });
        });
    },

    updateSpecies: (req, res) => {
        const { id } = req.params;
        const { nombre_comercial, nombre_cientifico } = req.body;
        if (!nombre_comercial || !nombre_cientifico) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
        Species.update(id, req.body, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Especie actualizada correctamente" });
        });
    },

    deleteSpecies: (req, res) => {
        const { id } = req.params;
    
        Species.delete(id, (err, result) => {
            if (err) {
                return res.status(404).json({ message: err.message || "Error al eliminar la especie" });
            }
            return res.json(result);
        });
    }
};

module.exports = speciesController;
