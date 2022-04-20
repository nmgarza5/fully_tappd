from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    business_user = db.Column(db.Boolean, default=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    birthdate = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    header = db.Column(db.String(255), nullable=False)
    # bio = db.Column(db.Text, nullable=True)
    profile_image = db.Column(db.String(2048), nullable=False)
    banner_image = db.Column(db.String(2048), nullable=True)
    # FORMAT: 2022-04-02 13:27:25.457314
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # def user_status(self):
    #     if not self.business_user:
    #          self.business_user = True
    #     elif not bool(self.breweries):
    #          self.business_user = False
    #     else:
    #         self.business_user = True

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'business_user': self.business_user,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'header': self.header,
            # 'bio': self.bio,
            'profile_image': self.profile_image,
            'banner_image': self.banner_image,
            'breweries': {brewery.id: brewery.to_dict() for brewery in self.breweries}
        }
