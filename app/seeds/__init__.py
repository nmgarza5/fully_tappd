from flask.cli import AppGroup

# from .images import seed_images, undo_images
from .breweries import seed_breweries, undo_breweries
from .users import seed_users, undo_users
from .beer import seed_beer, undo_beer
from .reviews import seed_reviews, undo_reviews

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_breweries()
    seed_beer()
    seed_reviews()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    # undo_images()
    undo_breweries()
    undo_users()
    undo_beer()
    undo_reviews()
    # Add other undo functions here
