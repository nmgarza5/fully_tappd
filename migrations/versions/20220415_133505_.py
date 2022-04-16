"""empty message

Revision ID: 14890d7fd43c
Revises: 16e298dc8cb6
Create Date: 2022-04-15 13:35:05.195003

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '14890d7fd43c'
down_revision = '16e298dc8cb6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('beer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('brewery_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('style', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('abv', sa.Float(), nullable=False),
    sa.Column('ibu', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['brewery_id'], ['breweries.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('beer')
    # ### end Alembic commands ###