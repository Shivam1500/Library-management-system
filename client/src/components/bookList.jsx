import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/books/getbook");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    fetchBooks();
  }, []);

  const handleIssueBook = async (bookId, quantity) => {
    if (quantity === 0) {
      toast.error("Book is out of stock");
      return;
    }

    try {
      await axios.post(`http://localhost:3001/api/books/issue/${userId}/${bookId}`);
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book._id === bookId ? { ...book, quantity: book.quantity - 1 } : book
        )
      );
      toast.success("Book issued successfully");
    } catch (error) {
      console.error("Error issuing book:", error);
    }
  };

  return (
    <div className="container" >
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4" >
        {books.map((book) => (
          <div className="col mb-4" key={book._id} >
            <div className="card h-100" >
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <p className="card-text">{book.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center" >
                <span className="badge bg-primary rounded-pill">{book.quantity} available</span>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleIssueBook(book._id, book.quantity)}
                >
                  {book.quantity === 0 ? "Out of Stock" : "Issue Book"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
