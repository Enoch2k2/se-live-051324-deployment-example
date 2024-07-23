from config import app, db
from models.book import Book
from models.author import Author

with app.app_context():
  print("Starting Seeding")
  print('delete books...')
  Book.query.delete()
  print('delete authors...')
  Author.query.delete()

  db.session.commit()

  print('creating authors...')
  author_1 = Author(name="J.R.R. Tolkein")
  db.session.add(author_1)
  db.session.commit()

  print('creating books...')
  book_1 = Book(title="The Hobbit", released=True, author_id=author_1.id)
  book_2 = Book(title="The Fellowship Of The Ring", released=True, author_id=author_1.id)
  book_3 = Book(title="The Two Towers", released=True, author_id=author_1.id)
  book_4 = Book(title="The Return Of The King", released=True, author_id=author_1.id)

  books = [book_1, book_2, book_3, book_4]

  db.session.add_all(books)
  db.session.commit()
  print('Finished Seeding')

