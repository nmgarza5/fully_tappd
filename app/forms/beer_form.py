from app.models import Beer
from flask_wtf import FlaskForm
from wtforms import (StringField, TextAreaField, BooleanField, SelectField, SubmitField, DecimalField, IntegerField)
from wtforms.validators import DataRequired, ValidationError, Length


beer_choices = [
    "Altbier", "Amber Ale", "Barley Wine", "Belgian", "Berliner Weisse", "Blonde Ale", "Bock", "Brown Ale", "Cream Ale", "Dopplebock",
    "English Bitter", "English Mild", "Fruit Beer", "Gose", "Gueze", "Hefeweizen", "Helles Bock", "IPA", "Kolsch",
    "Lager", "Lambic", "Oktoberfestbier", "Pale Ale", "Pilsner", "Porter", "Red Ale", "Saison", "Stout", "Witbier",
]

def valid_value(form, field):
  value = field.data
  if value < 1:
    raise ValidationError('Value must be greater than 0')


class BeerForm(FlaskForm):

    name = StringField('Name', validators=[DataRequired(), Length(min=0, max=255)])
    brewery_id = IntegerField('Brewery Id', validators=[DataRequired()])
    style = SelectField('Beer Style', choices=beer_choices, validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    abv = DecimalField('ABV', places=2, validators=[DataRequired(), valid_value])
    ibu = IntegerField('IBU', validators=[DataRequired(), valid_value])
    submit = SubmitField('Submit')
