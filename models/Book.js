const mongoose = require('mongoose')
const { type } = require('os')


const bookSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    resumen: {
        type: String,
        required: false
    },
    publicacion:{
        type: Date,
        required: true
    },
    disponible: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('libros', bookSchema)