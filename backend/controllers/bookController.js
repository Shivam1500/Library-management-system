
const BookModel = require('../modal/Books');
const UserModel = require('../modal/User');

exports.listAllBooks = async (req, res) => {
    try {
        const allBooks = await BookModel.find();
        res.json(allBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error from serverSide' });
    }
}

exports.addBook = async (req, res) => {
    try {
        const { title, author, quantity } = req.body;

        if (!title || !author || !quantity) {
            return res.status(400).json({ error: 'Please provide title, author, and quantity for the book' })
        }

        const newBook = new BookModel({
            title, author, quantity
        });

        await newBook.save();
        res.status(201).json(newBook)
    } catch (error) {
        console.log("error in add book post api", error);
        res.status(500).json({ error: "error in Server Side" });
    }
}

exports.issueBook = async (userId, bookId) => {
    // console.log("idddddddddddddddddddd", userId,)
    // console.log("iddddddddddddnnnnnnnnnnnndddddddd", bookId,)
    try {
        if (!userId || !bookId) {
            throw new Error("Invalid user or book ID");
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const book = await BookModel.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }

        if (book.quantity <= 0) {
            throw new Error("Book is not available");
        }

        book.quantity -= 1;
        book.issued = true;
        await book.save();


        user.issuedBooks.push(book);
        await user.save();

        return { success: true, message: "Book issued successfully" };
    } catch (error) {
        console.error("Error issuing book:", error.message);
        return { success: false, message: error.message };
    }
};


exports.getMyBooks = async (userId) => {
    try {

        const user = await UserModel.findById(userId).populate({
            path: 'issuedBooks',
            select: 'title author',
        });

        if (!user) {
            return { success: false, message: "User not found" };
        }


        const issuedBooks = user.issuedBooks;

        return { success: true, books: issuedBooks };
    } catch (error) {
        console.error("Error getting user's issued books:", error);
        return { success: false, message: "Internal server error" };
    }
};