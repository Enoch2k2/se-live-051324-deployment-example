import { useEffect, createContext, useState } from "react";
import { headers } from "../Globals";
import { useNavigate } from "react-router-dom";

const BookContext = createContext({})

function BookProvider({ children }) {
  const [books, setBooks] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const loadBooks = async () => {
      const resp = await fetch("/api/books")
      const data = await resp.json()
      setBooks(data)
    }

    loadBooks()
  }, [])

  async function addBook(bookValues) {
    const resp = await fetch("/api/books", {
      method: "POST",
      headers,
      body: JSON.stringify(bookValues)
    })
    const book = await resp.json()
    setBooks([...books, book])
    navigate("/books")
  }

  return <BookContext.Provider value={{ books, addBook }}>{ children }</BookContext.Provider>
}

export { BookContext, BookProvider }