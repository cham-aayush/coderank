from flask import Blueprint, jsonify, request
import requests
from app.routes.streak import calculate_streak, fetch_submission_dates

bp = Blueprint('stats', __name__, url_prefix='/api/stats')

@bp.route('', methods=['GET'])
def get_stats():
    username = request.args.get('username')
    if not username:
        return jsonify({"error": "Missing username"}), 400

    url = f"https://leetcode-stats-api.herokuapp.com/{username}"
    try:
        res = requests.get(url)
        if res.status_code != 200:
            return jsonify({"error": "User not found or data unavailable"}), 404

        data = res.json()

        submission_dates = fetch_submission_dates(username)
        streak_info = calculate_streak(submission_dates)

        return jsonify({
            "summary": {
                "totalSolved": data.get("totalSolved", 0),
                "easySolved": data.get("easySolved", 0),
                "mediumSolved": data.get("mediumSolved", 0),
                "hardSolved": data.get("hardSolved", 0),
                "ranking": data.get("ranking", 0),
                "contributionPoints": data.get("contributionPoints", 0),
            },
            "streak": streak_info
        })

    except Exception as e:
        print("Error fetching user data:", e)
        return jsonify({"error": "Internal server error"}), 500
