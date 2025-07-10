from flask import Blueprint, jsonify
from app.utils.scraper import fetch_user_solved_problems
from app.services.recommender import get_recommendations
# from app.services.recommender import load_all_problems

bp = Blueprint('recommend', __name__)

@bp.route('/api/recommend/<username>', methods=['GET'])
def recommend(username):
    data = fetch_user_solved_problems(username)

    if "error" in data:
        return jsonify({"error": data["error"]}), 500

    # Pass the full data (summary + solved_problems) to get_recommendations
    recommendations = get_recommendations(data)

    return jsonify({
        "solved": data.get("summary", {}),
        "recommendations": recommendations
    })

@bp.route('/api/test/problems', methods=['GET'])
def test_problems():
    problems = load_all_problems()
    return jsonify({
        "count": len(problems),
        "sample": problems[:5]
    })
