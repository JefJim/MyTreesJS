const Species = require("../models/species");

// Obtener todas las especies
exports.getAllSpecies = async (req, res) => {
    try {
        const species = await Species.findAll();
        res.status(200).json(species);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener especies", error });
    }
};

// Obtener especie por ID
exports.getSpeciesById = async (req, res) => {
    try {
        const species = await Species.findByPk(req.params.id);
        if (!species) return res.status(404).json({ message: "Especie no encontrada" });

        res.status(200).json(species);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la especie", error });
    }
};

// Crear una nueva especie
exports.createSpecies = async (req, res) => {
    try {
        const newSpecies = await Species.create(req.body);
        res.status(201).json(newSpecies);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la especie", error });
    }
};

// Actualizar una especie
exports.updateSpecies = async (req, res) => {
    try {
        const species = await Species.findByPk(req.params.id);
        if (!species) return res.status(404).json({ message: "Especie no encontrada" });

        await species.update(req.body);
        res.status(200).json(species);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la especie", error });
    }
};

// Eliminar una especie
exports.deleteSpecies = async (req, res) => {
    try {
        const species = await Species.findByPk(req.params.id);
        if (!species) return res.status(404).json({ message: "Especie no encontrada" });

        await species.destroy();
        res.status(200).json({ message: "Especie eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la especie", error });
    }
};
