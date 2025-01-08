const express = require("express");
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path"); // Necesario para manejar rutas


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); // Parsear JSON en el cuerpo de la solicitud
app.use(express.json()); // Para manejar JSON en requests

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/views")));

// Rutas de la API
app.use('/api', userRoutes);  // La ruta /api es donde llamamos para obtener los países

// Definir la ruta base para usuarios
app.use("/api/users", userRoutes);

// Rutas de autenticación
app.use('/api/auth', userRoutes);

// Definir otras rutas y el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
