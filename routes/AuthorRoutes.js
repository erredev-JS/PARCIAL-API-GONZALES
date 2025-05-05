const express = require('express');
const router = express.Router();
const authorsControllers = require('../controllers/AuthorsController');

// CREATE /authors
router.post("/", authorsControllers.createAuthor);

// GET /authors
router.get('/', authorsControllers.getAll);

// GET /authors/:id
router.get('/:id', authorsControllers.getById);

// PUT /authors/:id
router.put('/:id', authorsControllers.putAuthorById);

// PUT add book /:id/add-book/:bookId

router.put('/:id/add-book/:bookId', authorsControllers.putBookToAuthorList);



// DELETE /authors/:id
router.delete('/:id', authorsControllers.deleteById);

module.exports = router;
