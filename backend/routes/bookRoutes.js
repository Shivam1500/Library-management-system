const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require('../middleware/tokenMiddleware');



router.get('/getbook', bookController.listAllBooks);
// router.post('/books/issue', bookController.issueBook);
// router.get('/api/user/:userId/books', bookController.listIssuedBooksByUser);
router.post('/addbook/Post', bookController.addBook);
router.get("/mybooks/:userId", async (req, res) => {
    const { userId } = req.params;
    const result = await bookController.getMyBooks(userId);
    console.log("result", result);

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(404).json(result);
    }
});
router.post("/issue/:userId/:bookId", async (req, res) => {
    const { userId, bookId } = req.params;
    try {
        const result = await bookController.issueBook(userId, bookId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
router.post("/return/:id", async (req, res) => {
    const { id } = req.params;
    const result = await bookController.returnBook(id);
    res.status(result.success ? 200 : 500).json(result);
});

module.exports = router;