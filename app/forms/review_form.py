import profile
from flask_wtf import FlaskForm
from wtforms import (StringField, TextAreaField, BooleanField, SelectField, SubmitField, DecimalField, IntegerField)
from wtforms.validators import DataRequired, ValidationError, Length, URL

# def valid_image(form, field):
#   url = field.data
#   if url and not (url.endswith('.jpg') or url.endswith('.jpeg') or url.endswith('.png') or url.endswith('.gif')):
#     raise ValidationError('Image format must be .jpg, .jpeg, .png, or .gif')

class ReviewForm(FlaskForm):

    brewery_id = IntegerField('Brewery Id', validators=[DataRequired()])
    beer_id = IntegerField('Beer Id', validators=[DataRequired()])
    rating = IntegerField("Rating", validators=[DataRequired()])
    # image_url = StringField('Image Url', validators=[DataRequired(), Length(min=0, max=2048), valid_image, URL()])
    content = TextAreaField('Content', validators=[DataRequired()])
    submit = SubmitField('Submit')
