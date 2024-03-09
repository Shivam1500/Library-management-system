
const BookModel = require('../modal/Books');
const UserModel = require('../modal/User');

exports.listAvailableBooks = async (req, res) => {
    try {
        const availableBooks = await Book.find({ quantity: { $gt: 0 } });
        res.json(availableBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error from serverSide' });
    }
}

exports.issueBook = async (req, res) => {
    const { bookId, userId } = req.body;

    try {

        const book = await BookModel.findOne({ _id: bookId, quantity: { $gt: 0 } });
        if (!book) {
            return res.status(404).json({ error: 'Requested book is not available' });
        }


        book.quantity -= 1;
        await book.save();

        const user = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $push: { issuedBooks: bookId } },
            { new: true }
        );

        res.json({ message: 'Book issued successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error from server' });
    }
};

exports.listIssuedBooksByUser = async (req, res) => {
    const userId = req.params.userId;

    try {

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        const issuedBooks = await BookModel.find({ _id: { $in: user.issuedBooks } });

        res.json(issuedBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};