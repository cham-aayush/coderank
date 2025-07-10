import json
import random
from collections import Counter

from app.services.recommender_utils import (
    generate_insights,
    suggest_problem_streaks,
    random_sample,
)

# Load preprocessed LeetCode problems
with open("app/data/problemset.json", "r") as f:
    ALL_PROBLEMS = json.load(f)

def get_recommendations(user_data):
    summary = user_data["summary"]
    solved_problems = user_data["solved_problems"]

    # 1. Normalize and extract slugs of solved problems
    solved_slugs = set(p["slug"].strip().lower() for p in solved_problems)

    # 2. Filter unsolved problems
    unsolved_problems = [p for p in ALL_PROBLEMS if p["slug"].strip().lower() not in solved_slugs]

    # 3. Get top user tags from solved problems
    tag_counter = Counter(tag for prob in solved_problems for tag in prob.get("tags", []))
    top_tags = set(tag for tag, _ in tag_counter.most_common(5))

    def filter_by_difficulty(difficulty, count):
        # Filter unsolved problems by difficulty
        pool = [p for p in unsolved_problems if p["difficulty"] == difficulty]
        # Score based on overlap with top user tags
        scored = sorted(pool, key=lambda p: len(top_tags.intersection(set(p.get("tags", [])))), reverse=True)
        return random.sample(scored[:20], min(count, len(scored[:20])))

    # 4. Balanced recommendations
    recommended = (
        filter_by_difficulty("Easy", 3) +
        filter_by_difficulty("Medium", 4) +
        filter_by_difficulty("Hard", 3)
    )

    # 5. Remove duplicates (by slug)
    seen = set()
    unique_recommendations = []
    for p in recommended:
        slug = p["slug"]
        if slug not in seen:
            seen.add(slug)
            unique_recommendations.append(p)

    # 6. Generate insights and next target
    insights = generate_insights(summary)
    next_target = suggest_problem_streaks(summary)

    return {
        "recommendations": {
            "insights": insights,
            "nextTarget": next_target,
            "suggestedProblems": unique_recommendations
        },
        "solved": summary
    }
