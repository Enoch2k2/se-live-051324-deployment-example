from flask import render_template
from config import app
from models.book import Book
from models.author import Author
from models.user import User

from routes.books import *
from routes.authors import *
from routes.sessions import *

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

if __name__ == "__main__":
  app.run(port=5555, debug=True)