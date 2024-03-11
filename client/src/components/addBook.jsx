import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../actions/bookActions";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !quantity) return;

    dispatch(addBook({ title, author, quantity }));
    setTitle("");
    setAuthor("");
    setQuantity("");
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="container-lg d-flex justify-content-center align-items-center vh-100 " >
      <form onSubmit={handleSubmit} className="border p-4 rounded" style={{ background: "#ADD8E6" }}>
        <h3>Add Book</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Book Name
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author Name
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-sm btn-primary me-2">
            Add Book
          </button>
          <button onClick={handleBack} className="btn btn-sm btn-secondary">
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;




