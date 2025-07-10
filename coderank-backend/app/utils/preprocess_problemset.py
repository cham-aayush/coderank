import json
import random

def normalize_leetcode_problemset(raw_data):
    difficulty_map = {1: "Easy", 2: "Medium", 3: "Hard"}

    normalized = []
    for prob in raw_data:
        stat = prob["stat"]
        normalized.append({
            "id": stat["frontend_question_id"],
            "title": stat["question__title"],
            "slug": stat["question__title_slug"],
            "difficulty": difficulty_map.get(prob["difficulty"]["level"], "Easy"),
            "paid_only": prob["paid_only"],
            "tags": random.sample(["Array", "DP", "Greedy", "String", "Math", "Tree", "Graph"], k=random.randint(1, 3))  # temporary random tags
        })

    return normalized

if __name__ == "__main__":
    with open("app/data/all_problems.json", "r") as infile:
        raw = json.load(infile)

    processed = normalize_leetcode_problemset(raw)

    with open("app/data/problemset.json", "w") as outfile:
        json.dump(processed, outfile, indent=2)

    print(f"✅ Normalized {len(processed)} problems.")
