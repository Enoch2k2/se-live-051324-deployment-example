from flask import request, g, session
from flask_restful import Resource
from config import db, api, app
from models.author import Author
from sqlalchemy.exc import IntegrityError

@app.before_request
def check_author():
  if request.endpoint == "author":
    id = request.view_args.get("id")
    author = Author.query.get(id)
    if author:
      g.author = author
    else:
      return {"error": "Author doesn't exist"}, 422

class AuthorsResource(Resource):
  def get(self):
    print(session)
    authors = [author.to_dict() for author in Author.query.all()]
    return authors, 200
  
  def post(self):
    # name = request.get_json().get('name')
    data = request.get_json()
    name = data.get('name')
    try:
      author = Author(name=name)
      db.session.add(author)
      db.session.commit()
      return author.to_dict(), 201
    except IntegrityError as e:
      return {"error": e.orig.args[0]}, 422
  

class AuthorResource(Resource):
  def get(self, id):
    return g.author.to_dict(), 200
  
  def patch(self, id):
    data = request.get_json()
    try:
      for key, value in data.items():
        if hasattr(g.author, key):
          setattr(g.author, key, value)
        else:
          return {"message": f"{key} is not an attribute of Author"}, 422
      db.session.add(g.author)
      db.session.commit()
      return g.author.to_dict(), 200
    except IntegrityError as e:
      return {"error": e.orig.args[0]}, 422
    
  def delete(self, id):
      db.session.delete(g.author)
      db.session.commit()
      return {}, 204
  
api.add_resource(AuthorsResource, "/api/authors", endpoint="authors")
api.add_resource(AuthorResource, "/api/authors/<int:id>", endpoint="author")
