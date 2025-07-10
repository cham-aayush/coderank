import random
from collections import Counter

def filter_unsolved_problems(all_problems, solved_slugs):
    """Filter out problems that have already been solved."""
    return [prob for prob in all_problems if prob['slug'] not in solved_slugs]

def sort_by_difficulty(problems):
    """Sort problems by difficulty: Easy < Medium < Hard."""
    diff_order = {"Easy": 0, "Medium": 1, "Hard": 2}
    return sorted(problems, key=lambda x: diff_order.get(x['difficulty'], 3))

def tag_match_score(problems, weak_tags):
    """Score problems based on number of matching weak tags."""
    for prob in problems:
        prob['score'] = sum(tag in weak_tags for tag in prob.get('tags', []))
    return sorted(problems, key=lambda x: -x['score'])

def random_sample(problems, k=10):
    """Return a random sample of problems."""
    return random.sample(problems, min(k, len(problems)))

def generate_insights(stats):
    """Generate user-specific performance insights."""
    insights = []
    if stats['mediumSolved'] < stats['easySolved']:
        insights.append("Try more medium problems to balance your profile.")
    if stats['hardSolved'] < 30:
        insights.append("Start mixing in hard problems to boost confidence.")
    if stats['easySolved'] > (stats['mediumSolved'] + stats['hardSolved']):
        insights.append("You've nailed easy problems — time to level up!")
    return insights

def suggest_problem_streaks(stats):
    """Suggest next problem streak targets."""
    return {
        "mediumTarget": stats['mediumSolved'] + 10,
        "hardTarget": stats['hardSolved'] + 5
    }

def get_weak_tags(solved_problems, min_count=3):
    """Return tags that have been solved fewer than `min_count` times."""
    tag_counter = Counter()
    for prob in solved_problems:
        for tag in prob.get('tags', []):
            tag_counter[tag] += 1
    return [tag for tag, count in tag_counter.items() if count < min_count]

def balance_recommendations(unsolved_recs, weak_tags, user_stats, max_recs=10):
    """Balance recommendations by weak tags and difficulty targets."""
    tagged_recs = [p for p in unsolved_recs if any(t in weak_tags for t in p.get('tags', []))]
    recommendations = []

    # Define difficulty-based targets
    easy_target = max(0, user_stats.get('easyTarget', 10) - user_stats.get('easySolved', 0))
    medium_target = max(0, user_stats.get('mediumTarget', 10) - user_stats.get('mediumSolved', 0))
    hard_target = max(0, user_stats.get('hardTarget', 10) - user_stats.get('hardSolved', 0))

    targets = {'Easy': easy_target, 'Medium': medium_target, 'Hard': hard_target}

    for diff, target in targets.items():
        if target <= 0:
            continue
        filtered = [p for p in tagged_recs if p['difficulty'] == diff]
        recommendations.extend(filtered[:target])

    if len(recommendations) < max_recs:
        remaining = [p for p in unsolved_recs if p not in recommendations]
        recommendations.extend(remaining[: max_recs - len(recommendations)])

    return recommendations[:max_recs]
