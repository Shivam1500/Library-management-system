import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyBook = () => {
  const navigate = useNavigate();
  const [myBooks, setMyBooks] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          console.error("Token or userId not found");
          return;
        }

        const response = await axios.get(`http://localhost:3001/api/books/mybooks/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMyBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching user's books:", error.message);
      }
    };

    fetchMyBooks();

    const storedUserName = localStorage.getItem("name");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>My Books</h1>
        {myBooks.length === 0 && <p>Welcome, {userName}</p>}
        {myBooks.length === 0 && <p>No books issued yet</p>}
      </div>
      {myBooks.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
              </tr>
            </thead>
            <tbody>
              {myBooks.map((book, index) => (
                <tr key={book._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button onClick={handleBack} className="btn btn-sm btn-outline-primary position-fixed top-0 end-0 m-3" style={{ width: "150px", fontWeight: "bold" }}>
        Home
      </button>
    </div>
  );
};

export default MyBook;
