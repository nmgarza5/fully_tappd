from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_image(form, field):
  url = field.data
  if url and not (url.endswith('.jpg') or url.endswith('.jpeg') or url.endswith('.png') or url.endswith('.gif')):
    raise ValidationError('Image format must be .jpg, .jpeg, .png, or .gif')


class SignUpForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), user_exists, Email()])
    password = StringField('Password', validators=[DataRequired(), EqualTo(
        'confirm_password', message="Passwords do not match.")])
    confirm_password = StringField(
        'Confirm Password', validators=[DataRequired()])
    header = StringField('Header', validators=[
                         DataRequired(), Length(min=0, max=255)])
    bio = TextAreaField('Bio', validators=[DataRequired()])
    profile_image = StringField('Profile Image', validators=[DataRequired(), Length(min=0, max=2048), valid_image])
    banner_image = StringField('Banner Image', validators=[Length(min=0, max=2048), valid_image])
