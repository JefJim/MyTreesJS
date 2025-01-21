const express = require("express");
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const bodyParser = require('body-parser');
const path = require("path"); // Neccesary for handling paths

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); // Parsear JSON en el cuerpo de la solicitud
app.use(express.json()); // Para manejar JSON en requests

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/uploads")));
app.use(express.static(path.join(__dirname, "public/views")));
app.use(express.static(path.join(__dirname, "public/views/admin")));
app.use(express.static(path.join(__dirname, "public/views/general")));

// protected routes
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/species", adminRoutes);

// API routes
app.use('/api', userRoutes);  // Route api to userRoutes and get countries

// base route for users
app.use("/api/users", userRoutes);
app.use("/api/stats", adminRoutes);

// auth routes
app.use('/api/auth', authRoutes);


// server routes
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
