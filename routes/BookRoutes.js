const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/BooksController');

// CREATE /books
router.post("/", bookControllers.createBook)

// GET /books
router.get('/', bookControllers.getAll);

// GET /books/:id
router.get('/:id', bookControllers.getById);


// PUT /books/:id
router.put('/:id', bookControllers.putBookById);

// DELETE /books/:id
router.delete('/:id', bookControllers.deleteById);



module.exports = router;
