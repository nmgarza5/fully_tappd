"""empty message

Revision ID: 4d89a9d284e0
Revises: 693f485914e7
Create Date: 2022-04-22 11:06:42.436473

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d89a9d284e0'
down_revision = '693f485914e7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'beer', ['name'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'beer', type_='unique')
    # ### end Alembic commands ###
