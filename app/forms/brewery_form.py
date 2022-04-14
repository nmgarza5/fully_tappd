import profile
from flask_wtf import FlaskForm
from wtforms import (StringField, TextAreaField, BooleanField, SelectField, SubmitField)
from wtforms.validators import DataRequired, ValidationError, Length


'''Dont forget to put in a validators for:

- WEBSITE
- STREET ADDRESS FORMAT
- ADDRESS FORMAT
- POSTAL CODE FORMAT
-


'''

def valid_phone_number(form, field):
  phone_number = field.data
  if not phone_number.isnumeric():
    raise ValidationError('Phone Number must contain only digits')
  if not len(phone_number) == 10:
    raise ValidationError('Phone number must include 10 digits')

def valid_image(form, field):
  url = field.data
  if not (url.endswith('.jpg') or url.endswith('.jpeg') or url.endswith('.png') or url.endswith('.gif')):
    raise ValidationError('Image format must be .jpg, .jpeg, .png, or .gif')

class BreweryForm(FlaskForm):

    name = StringField('Name', validators=[DataRequired(), Length(min=0, max=255)])
    header = StringField('Header', validators=[DataRequired(), Length(min=0, max=255)])
    description = TextAreaField('Description')
    brewery_type = SelectField('Brewery Type', choices=["micro", "brewpub","large", "regional"], validators=[DataRequired()])
    street = StringField('Street', validators=[DataRequired(), Length(min=0, max=255)])
    city = StringField('City', validators=[DataRequired(), Length(min=0, max=255)])
    postal_code = StringField('Postal Code', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired(), Length(min=0, max=255)])
    phone_number = StringField('Phone Number', validators=[DataRequired(), valid_phone_number])
    website_url = StringField('Website', validators=[Length(min=0, max=2048)])
    submit = SubmitField('Submit')