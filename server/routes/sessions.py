from flask import request, session
from config import db, api
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from models.user import User

class Signup(Resource):
  def post(self):
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    try:
      user = User(username=username)
      user.password_hash = password
      db.session.add(user)
      db.session.commit()
      session["user_id"] = user.id
      return user.to_dict(), 201
    except IntegrityError:
      return {"error": "username must be unique"}, 422
    
class Login(Resource):
  def post(self):
    # we need to check if user exist
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = User.query.filter_by(username=username).first()
    # if the user does exist, did they write the correct password?
    # if both are true, then we create session user_id
    if user and user.authenticate(password):
      session["user_id"] = user.id
    # return user
      return user.to_dict(), 200
    # otherwise tell whoever gave us bad information that oops they need to try again!
    else:
      return {"error": "Username or password didn't match"}, 422
    
class CheckSession(Resource):
  def get(self):
    user_id = session.get("user_id")
    if user_id:
      user = User.query.get(user_id)
      return user.to_dict(), 200
    else:
      return {"message": "user not signed in"}, 401
    # access the user that we have stored
    # return that user

class Logout(Resource):
  def delete(self):
    if session.get("user_id"):
      del session["user_id"]
      return {}, 204
    else:
      return {"error": "User is not signed in"}, 401


api.add_resource(Signup, "/api/signup")
api.add_resource(Login, "/api/login")
api.add_resource(CheckSession, "/api/check-session")
api.add_resource(Logout, "/api/logout")