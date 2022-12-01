from enum import unique
import bcrypt
from datetime import datetime
from flask import Flask, render_template, redirect, url_for, request
from flask.helpers import flash
from flask.templating import render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import form
from flask_wtf.form import FlaskForm
from sqlalchemy.orm import backref, session
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from wtforms.widgets.core import Input
from flask_bcrypt import Bcrypt


# app instance
app = Flask(__name__)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Secret key protects session from being accessed
app.config['SECRET_KEY'] = 'my secretsss'
#app.secret_key = "my secretsss"

# allow app and flask to work together to handle logins
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"
# allow load users from id stored in session
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# Creating table for login db
class User(db.Model, UserMixin):
    # identity column
    id = db.Column(db.Integer, primary_key=True)
    # username column - unique so no same usernames
    username = db.Column(db.String(20), nullable=False, unique=True)
    # nullable for now...
    email = db.Column(db.String(30), nullable=True, unique=True)
    # password column - 80 characters once hashed
    password = db.Column(db.String(80), nullable=False)
    authenticated = db.Column(db.Boolean, default=False)
    logs = db.relationship('Log', backref = 'user', lazy='dynamic')

    def __repr__(self):
        return f'{self.name}'


class Log(db.Model, UserMixin):
    # identity column
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), index=True, unique=True)
    previous = db.Column(db.String, unique=False, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    tags = db.Column(db.String, unique=False, nullable=False)
    u_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
            return f'{self.content}'


class RegisterForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)],
    render_kw={"placeholder": "Username"})

    email = StringField(validators=[InputRequired(), Length(min=4, max=30)],
    render_kw={"placeholder": "Email"})

    password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)],
    render_kw={"placeholder": "Password"})

    submit = SubmitField("Register")

    def validate_username(self, username):
        # Checks db for existing username
        existing_user_username = User.query.filter_by(
            username=username.data).first()
        # existing_user_email = User.query.filter_by(
        #     email=email.data).first()
        if existing_user_username:
            raise ValidationError("That username already exists. Please choose a different one.")
        # if existing_user_email:
        #     raise ValidationError("That email already has an account. Please use a different one.")

class LoginForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)],
    render_kw={"placeholder": "Username"})

    password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)],
    render_kw={"placeholder": "Password"})

    submit = SubmitField("Login")

# Setting up first route with decorator
@app.route('/', methods=['GET', 'POST'])
@login_required
def home():
    form = LoginForm()

    if form.validate_on_submit():
        # check if user is in db
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                login_user(user)
                return redirect(url_for('sitecontents'))
            else:
                error = 'Invalid credentials'

    # return render_template("index.html")
     # return "Hello World!"
    return render_template("login.html", form=form, error=error)

# Setting up Site Contents route
@app.route('/sitecontents', methods = ['GET', 'POST'])
@login_required
def sitecontents():
    return render_template("sitecontents.html")

# Setting up login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        # check if user is in db
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                login_user(user)
                flash('You were successfully logged in')
                return redirect(url_for('sitecontents'))
            else:
                error = 'Invalid credentials'


    return render_template('login.html', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()

    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data)
        new_user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html', form=form)


@app.route('/logout', methods = ['GET', 'POST'])
@login_required
def logout():
    logout_user()
    # session.pop('logged_in', None)
    flash('You were just logged out!')
    return redirect(url_for('login'))


@app.route('/editor', methods = ['GET', 'POST'])
#@login_required
def editor():
    return render_template("editor.html")


@app.route('/media', methods = ['GET'])
#@login_required
def media():
    return render_template("media.html")

@app.route('/viewlog', methods = ['GET'])
#@login_required
def viewlog():
    return render_template("viewlog.html")


if __name__ == '__main__':
    app.run(debug=True)
