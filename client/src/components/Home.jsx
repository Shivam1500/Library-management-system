import React, { useEffect, useState } from "react";
import BookList from "./bookList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem("name");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("token");
  };

  const addBook = () => {
    navigate("/addbook");
  };

  const handleMybook = () => {
    navigate("/mybook");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button onClick={addBook} className="btn btn-sm btn-primary me-2">
            Add Book
          </button>
          <span className="navbar-brand mx-auto">{userName}</span>
          <form className="d-flex">
            <button onClick={handleMybook} className="btn btn-sm btn-primary me-2">
              My Books
            </button>
            <button className="btn btn-sm btn-outline-success" onClick={handleLogout}>
              Logout
            </button>
          </form>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center "
          style={{ margin: "50px 0px 0px 50px", justifyContent: "space-between" }}>
          <BookList />
        </div>
      </div>
    </>
  );
};

export default Home;
