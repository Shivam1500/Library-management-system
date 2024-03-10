import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Protected from "./components/Protected";
import bookList from "./components/bookList";
import addBook from "./components/addBook";
import myBook from "./components/myBook";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Protected Component={Home} />} />
          <Route
            path="/booklist"
            element={<Protected Component={bookList} />}
          />
          <Route
            path="/addbook"
            element={<Protected Component={addBook} />}
          />
          <Route
            path="/mybook"
            element={<Protected Component={myBook} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
