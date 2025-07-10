from flask import Blueprint, jsonify, request
import requests
from datetime import datetime, timedelta

bp = Blueprint('streak', __name__, url_prefix='/streak')


def fetch_submission_dates(username):
    url = f"https://leetcode-stats-api.herokuapp.com/{username}"
    try:
        res = requests.get(url)
        if res.status_code != 200:
            return []

        data = res.json()
        submissions = data.get("submissionCalendar", {})
        if not submissions:
            return []

        # submissionCalendar is a dict with UNIX timestamps as keys
        dates = set()
        for ts in submissions.keys():
            dt = datetime.fromtimestamp(int(ts)).date()
            dates.add(dt)

        return sorted(dates)
    except Exception:
        return []


def calculate_streak(dates):
    if not dates:
        return {"streak": 0, "dates": []}

    streak = 1
    streak_dates = [dates[-1]]  # Start from most recent
    for i in range(len(dates) - 2, -1, -1):
        if (dates[i + 1] - dates[i]).days == 1:
            streak += 1
            streak_dates.insert(0, dates[i])
        else:
            break

    return {
        "streak": streak,
        "dates": [d.strftime("%Y-%m-%d") for d in streak_dates]
    }


@bp.route('', methods=['GET'])
def get_streak():
    username = request.args.get('username')
    if not username:
        return jsonify({"error": "Missing username"}), 400

    submission_dates = fetch_submission_dates(username)
    streak_info = calculate_streak(submission_dates)
    return jsonify(streak_info)


    return jsonify(streak_info)
