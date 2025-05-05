require('dotenv').config(); // debe ir al principio
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(`${process.env.MONGO_URL}`, {
    dbName: `${process.env.dbName}`
}).then(() => {
    console.log('Conexión exitosa');
}).catch((err) => console.error('Error de conexión:', err));

// Rutas books
const BookRoutes = require('./routes/BookRoutes');
app.use('/books', BookRoutes);

// Rutas authors

const AuthorRoutes = require('./routes/AuthorRoutes');
app.use('/authors', AuthorRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`App corriendo en puerto ${PORT}.`);
});
