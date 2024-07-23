import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./components/navigation/Nav";
import Home from "./components/static/Home";
import BookList from "./components/books/BookList";
import BookForm from "./components/books/BookForm";
import { BookProvider } from "./context/BookContext";
import Signup from "./components/sessions/Signup";
import { UserProvider } from "./context/UserContext";
import Login from "./components/sessions/Login";

function App() {

  return (
    <Router>
      <UserProvider>
        <BookProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/new" element={<BookForm />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BookProvider>
      </UserProvider>
    </Router>
  )
}

export default App
