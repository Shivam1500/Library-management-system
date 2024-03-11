import axios from 'axios';

export const addBook = (book) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token not found");

            const response = await axios.post(
                "http://localhost:3001/api/books/addbook/Post",
                {
                    title: book.title,
                    author: book.author,
                    quantity: parseInt(book.quantity),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status >= 200 && response.status < 300) {
                dispatch({
                    type: 'ADD_BOOK',
                    payload: book,
                });
                return { success: true, message: "Book added successfully" };
            } else {
                throw new Error("Failed to add book: " + response.statusText);
            }
        } catch (error) {
            console.error("Error in adding book:", error);
            return { success: false, message: "Failed to add book: " + error.message };
        }
    };
};