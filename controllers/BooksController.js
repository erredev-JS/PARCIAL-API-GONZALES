const Book = require('../models/Book');

// Post /books

exports.createBook = async (req, res) => {
try {
    const newBook = Book(req.body)
    if(!newBook){
        res.status(400).json({error: "Error al crear el book"})
    }
    newBook.save()
    res.status(200).json(newBook)
} catch (err) {
    res.status(400).json({error: "Error al crear el book", details: err })
}
}

// GET /books
exports.getAll = async (req, res) => {
    try {
        const booksList = await Book.find();
        if (booksList.length === 0) {
            return res.status(200).json({ resultado: 'No hay tareas agregadas.' });
        }
        res.status(200).json(booksList);
    } catch (err) {
        res.status(400).json({ error: 'Error al buscar los libros', details: err });
    }
};

// GET /books/:id
exports.getById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ error: 'Error al buscar el libro', details: err });
    }
};

// PUT /books/:id: Editar un libro.


exports.putBookById = async (req, res) => {
    const id = req.params.id
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true})
        if (!updatedBook) {
            return res.status(404).json({ error: 'Error al actualizar'});
        }
    } catch (err) {
        res.status(400).json({ error: 'Error al buscar el libro', details: err });
    }
}


exports.deleteById = async (req, res) => {
    const id = req.params.id
    try {
        const deletedBook = await Book.findByIdAndDelete(id)
        if (!deletedBook) {
            return res.status(404).json({ error: 'Error al eliminar'});
        }
    } catch (err) {
        res.status(400).json({ error: 'Error al eliminar el libro', details: err });
    }
}