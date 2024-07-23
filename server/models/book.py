from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Book(db.Model, SerializerMixin):
  __tablename__ = "books"

  
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  released = db.Column(db.Boolean)
  author_id = db.Column(db.Integer, db.ForeignKey("authors.id"), nullable=False)

  author = db.relationship("Author", back_populates="books")

  @validates("author_id")
  def validate_author_id(self, key, author_id):
    from models.author import Author
    # were going to check if we need to throw an error
    author = Author.query.get(author_id)
    if not author:
      raise ValueError("Author doesn't exist for author_id")
    
    return author_id
  
  @validates("title")
  def validate_title(self, key, title):
    if title == "":
      raise ValueError("Title must not be blank")
    
    return title

  def title_in_all_caps(self):
    return self.title.upper()

  serialize_rules=(
    "-author.books",
    "-author_id",
    "title_in_all_caps"
  )
  
  def __repr__(self):
    return f'<Book id={self.id} title={self.title}>'

"""
CREATE TABLE IF NOT EXIST books (
  id INTEGER PRIMARY KEY
  title TEXT
  released BOOLEAN
);
"""