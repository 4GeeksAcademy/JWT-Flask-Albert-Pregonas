"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# La función create_access_token() se utiliza para generar el JWT


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Bad email or password"}), 401

    # Crea un nuevo token con el id de usuario y el email dentro
    access_token = create_access_token(identity=user.id, additional_claims={"email": user.email})
    return jsonify({"token": access_token, "user_id": user.id})


@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User()
    user.email = email
    user.password = password
    user.is_active = True
    db.session.add(user)
    db.session.commit()

    # Crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})


@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    identity = get_jwt_identity()
    claims = get_jwt()
    email = claims.get("email")
    return jsonify({"msg": "Usuari válido", "user_id": identity, "email": email}), 200
