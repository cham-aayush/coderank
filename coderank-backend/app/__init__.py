from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Import and register blueprint
    from app.routes.recommend import bp as recommend_bp
    app.register_blueprint(recommend_bp)

    from app.routes.streak import bp as streak_bp
    app.register_blueprint(streak_bp)

    from app.routes.stats import bp as stats_bp
    app.register_blueprint(stats_bp)


    return app
