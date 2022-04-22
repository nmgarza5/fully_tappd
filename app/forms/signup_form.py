from email.utils import parsedate
from flask_wtf import FlaskForm
from sqlalchemy import Boolean, DateTime
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length, URL
from app.models import User
from datetime import datetime


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



def date_format(form, field):
        # receive date as string
        try:
            birthdate_str = field.data
            # replace characters to create date format
            new = birthdate_str.replace("T", " ")
            next = new[0:19]
            # change to date format
            birthdate  = datetime.fromisoformat(next)
            # print("\n\n FROM-ISOFORMAT ------", birthdate, '\n\n')
            return birthdate
        except:
            raise ValidationError('You must enter a valid birthdate')

def calculate_age(form, field):
        birthdate = date_format(form, field)
        current_time = datetime.utcnow()
        # print("\n\n current_time ------", current_time, '\n\n')
        delta = (birthdate - current_time).days
        # print("\n\n delta ------", delta, '\n\n')
        # add 5 to offset to correct date, shift from leap years
        age_difference = delta + 21*365 + 5
        # print("\n\n age-def ------", age_difference, '\n\n')
        # this part is weird but if 'age_difference' > 0 the user is younger than 21 years old
        if age_difference >= 0:
            raise ValidationError('You must be over the age of 21 to sign up for FullyTappd')

class SignUpForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), username_exists])
    first_name = StringField('First Name', validators=[DataRequired(), Length(min=0, max=50)])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(min=0, max=50)])
    birthdate = StringField("Birthdate", validators=[DataRequired(), calculate_age])
    email = StringField('Email', validators=[DataRequired(), user_exists, Email(), Length(min=0, max=255)])
    password = StringField('Password', validators=[DataRequired(), Length(min=6), EqualTo('confirm_password', message="Passwords do not match."), Length(min=0, max=50)])
    confirm_password = StringField('Confirm Password', validators=[DataRequired()])
    header = StringField('Header', validators=[Length(min=0, max=255)])
    # bio = TextAreaField('Bio')
    profile_image = StringField('Profile Image', validators=[Length(min=0, max=2048), valid_image, URL()])
    # banner_image = StringField('Banner Image', validators=[Length(min=0, max=2048), valid_image])
    submit = SubmitField('Submit')
