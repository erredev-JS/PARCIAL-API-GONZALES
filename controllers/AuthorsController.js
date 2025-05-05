const Author = require('../models/Author');
const Book = require('../models/Book')

// POST /authors
exports.createAuthor = async (req, res) => {
    try {
        const author = new Author(req.body);
        if (!author) {
            return res.status(400).json({ error: "Error al crear el autor" });
        }
        await author.save();
        res.status(200).json(author);
    } catch (err) {
        res.status(400).json({ error: "Error al crear el autor", details: err });
    }
};

// GET /authors
exports.getAll = async (req, res) => {
    try {
        const authorsList = await Author.find();
        if (authorsList.length === 0) {
            return res.status(200).json({ resultado: 'No hay autores agregados.' });
        }
        res.status(200).json(authorsList);
    } catch (err) {
        res.status(400).json({ error: 'Error al buscar los autores', details: err });
    }
};

// GET /authors/:id
exports.getById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        res.status(200).json(author);
    } catch (err) {
        res.status(400).json({ error: 'Error al buscar el autor', details: err });
    }
};

// PUT /authors/:id
exports.putAuthorById = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAuthor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        res.status(200).json(updatedAuthor);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el autor', details: err });
    }
};

// PUT /authors/:id/addBook/:bookId: Agregar un libro a la lista del autor.


exports.putBookToAuthorList = async (req, res) => {
    const id = req.params.id;
    const bookId = req.params.bookId;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }

        // Verificar si el libro ya está asignado a otro autor
        const otherAuthor = await Author.findOne({ _id: { $ne: id }, libros: bookId });
        if (otherAuthor) {
            return res.status(400).json({ 
                error: 'Este libro ya está asignado a otro autor',
                autorExistente: otherAuthor._id 
            });
        }

        // Agregar el libro al autor si no está duplicado
        const authorUpdated = await Author.findByIdAndUpdate(
            id,
            { $addToSet: { libros: bookId } },
            { new: true }
        );

        if (!authorUpdated) {
            return res.status(500).json({ error: 'No se pudo actualizar el autor' });
        }

        res.status(200).json(authorUpdated);
    } catch (err) {
        res.status(500).json({ error: 'Error interno', details: err });
    }
};




// DELETE /authors/:id
exports.deleteById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedAuthor = await Author.findByIdAndDelete(id);
        if (!deletedAuthor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        res.status(200).json({ mensaje: 'Autor eliminado exitosamente' });
    } catch (err) {
        res.status(400).json({ error: 'Error al eliminar el autor', details: err });
    }
};
