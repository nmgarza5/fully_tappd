"""empty message

Revision ID: 3907bf406966
Revises: 2f858c813c52
Create Date: 2022-04-22 12:43:37.734766

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3907bf406966'
down_revision = '2f858c813c52'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'header')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('header', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
    # ### end Alembic commands ###