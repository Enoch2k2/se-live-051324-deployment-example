from flask import request, g
from config import app, db, api
from flask_restful import Resource
from models.book import Book
from sqlalchemy.exc import IntegrityError

@app.before_request
def run_logic_before_any_route():
  # if request.endpoint != "books" or request.method != "GET":
  #   return make_response({"error": "You don't ahve permission to do anything but grab all of the books"}, 401)
  if request.endpoint == "book":
    id = request.view_args.get('id')
    g.book = Book.query.get(id)
    if not g.book:
      return {"error": "Book doesn't exist"}, 422

# @app.route("/books", methods=["GET", "POST"], endpoint="books")
# def books_route():
#   if request.method == "GET":
#     books = [book.to_dict() for book in Book.query.all()]
#     return make_response(books, 200)
#   else:
#     data = request.get_json()
#     title = data.get("title")
#     released = data.get("released")
#     author_id = data.get("author_id")
#     book = Book(title=title, released=released, author_id=author_id)
#     db.session.add(book)
#     db.session.commit()
#     return make_response(book.to_dict(), 201)

class BooksResource(Resource):
  def get(self):
    books = [book.to_dict() for book in Book.query.all()]
    return books, 200
  
  def post(self):
    data = request.get_json()
    title = data.get("title")
    released = data.get("released")
    author_id = data.get("author_id")
    try:
      book = Book(title=title, released=released, author_id=author_id)
      db.session.add(book)
      db.session.commit()
      return book.to_dict(), 201
    except IntegrityError as e:
      return {"error": e.orig.args[0]}, 422
    except ValueError as e:
      return {"error": str(e)}, 422
  
api.add_resource(BooksResource, "/api/books", endpoint="books")
  
# @app.route("/books/<int:id>", methods=["GET", "PATCH"], endpoint="book")
# def book_route(id):
#   return make_response(g.book.to_dict(), 200)

class BookResource(Resource):
  def get(self, id):
    return g.book.to_dict(), 200
  
  def patch(self, id):
    # book = Book.query.get(id)
    data = request.get_json()
    try:
      for key, value in data.items():
        if hasattr(g.book, key):
          setattr(g.book, key, value)
        else:
          return {"message": f"{key} is not an attribute of Book"}, 422
      db.session.add(g.book)
      db.session.commit()
      return g.book.to_dict(), 200
    except IntegrityError as e:
      return {"error": e.orig.args[0]}, 422
    except ValueError as e:
      return {"error": str(e)}, 422
  
  def delete(self, id):
    db.session.delete(g.book)
    db.session.commit()
    return {}, 204

api.add_resource(BookResource, "/api/books/<int:id>", endpoint="book")

"""
Restful Routing!
* GET /resources - Index (Read) (give us a list of resources)
* POST /resources - Create (creating one new resource and saving it to the database )
* GET /resources/:id - Show (read) (gives us one resource by id)
* PATCH /resources/:id - UPDATE (updates a resource found by id)
* DELETE /resources/:id - DELETE (deletes a resource found by id)

CRUD: Create, Read, Update, Delete

"""