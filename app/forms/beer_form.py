import profile
from flask_wtf import FlaskForm
from wtforms import (StringField, TextAreaField, BooleanField, SelectField, SubmitField, DecimalField, IntegerField)
from wtforms.validators import DataRequired, ValidationError, Length


beer_choices = [
    "Altbier", "Amber Ale", "Barley Wine", "Berliner Weisse", "Blonde Ale", "Bock", "Brown Ale", "Cream Ale", "Dopplebock",
    "Doppelbock", "English Bitter", "English Mild", "Gose", "Gueze", "Hefeweizen", "Helles Bock", "India Pale Ale", "Kolsch",
    "Lager", "Lambic", "Oktoberfestbier", "Pale Ale", "Pilsner", "Porter", "Red Ale", "Saison", "Stout", "Witbier",
]

'''Dont forget to put in a validators for:

- FLOAT DATA TYPES

'''

def valid_image(form, field):
  url = field.data
  if url and not (url.endswith('.jpg') or url.endswith('.jpeg') or url.endswith('.png') or url.endswith('.gif')):
    raise ValidationError('Image format must be .jpg, .jpeg, .png, or .gif')

class BeerForm(FlaskForm):

    name = StringField('Name', validators=[DataRequired(), Length(min=0, max=255)])
    style = SelectField('Brewery Type', choices=beer_choices, validators=[DataRequired()])
    description = TextAreaField('Description')
    price = DecimalField('Price', places=2, validators=[DataRequired()])
    abv = DecimalField('Price', places=2, validators=[DataRequired()])
    ibu = IntegerField('Price', validators=[DataRequired()])
    # beer_image = StringField('Beer Image', validators=[DataRequired(), Length(min=0, max=2048), valid_image])
    submit = SubmitField('Submit')
