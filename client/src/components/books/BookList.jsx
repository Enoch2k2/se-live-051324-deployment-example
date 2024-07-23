import { useContext } from 'react'
import { BookContext } from '../../context/BookContext'
import BookCard from './BookCard'

const BookList = () => {
  const { books } = useContext(BookContext)

  const bookCards = books.map(book => <BookCard key={ book.id } book={book} />)

  return (
    <div>
      <h1>Book List</h1>
      { bookCards }
    </div>
  )
}

export default BookList