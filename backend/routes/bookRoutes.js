const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require('../middleware/tokenMiddleware');



router.get('/books', verifyToken, bookController.listAvailableBooks);
router.post('/books/issue', verifyToken, bookController.issueBook);
router.get('/api/user/:userId/books', verifyToken, bookController.listIssuedBooksByUser);

module.exports = router;