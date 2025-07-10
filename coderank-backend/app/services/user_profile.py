def analyze_user_stats(solved_problems):
    stats = {
        "totalSolved": len(solved_problems),
        "easySolved": sum(1 for prob in solved_problems if prob.get("difficulty") == "Easy"),
        "mediumSolved": sum(1 for prob in solved_problems if prob.get("difficulty") == "Medium"),
        "hardSolved": sum(1 for prob in solved_problems if prob.get("difficulty") == "Hard"),
        "ranking": 0,  # placeholder for future GraphQL integration
        "contributionPoints": 0  # placeholder too
    }
    return jsonify(stats)
