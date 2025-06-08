from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from passlib.hash import pbkdf2_sha256

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['JWT_SECRET_KEY'] = 'super-secret-key'  # Cambia esto en producción
CORS(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'msg': 'Email and password required'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'msg': 'User already exists'}), 409
    hashed_password = pbkdf2_sha256.hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'User created successfully'}), 201

@app.route('/token', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or not pbkdf2_sha256.verify(password, user.password):
        return jsonify({'msg': 'Bad email or password'}), 401
    access_token = create_access_token(identity=email)
    return jsonify({'token': access_token}), 200

@app.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify({'msg': f'Hello, {current_user}! This is a private message.'}), 200

if __name__ == '__main__':
    app.run(debug=True) 