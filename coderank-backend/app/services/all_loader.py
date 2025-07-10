import requests

def load_all_problems():
    url = "https://leetcode.com/api/problems/all/"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    try:
        response = requests.get(url, headers=headers)
        data = response.json()
        problems = []

        for item in data["stat_status_pairs"]:
            stat = item["stat"]
            difficulty_map = {1: "Easy", 2: "Medium", 3: "Hard"}

            problems.append({
                "id": stat["frontend_question_id"],
                "title": stat["question__title"],
                "slug": stat["question__title_slug"],
                "difficulty": difficulty_map.get(item["difficulty"]["level"], "Unknown"),
                "paid_only": item.get("paid_only", False),
                "tags": []  # we’ll populate tags later via extra scraping if needed
            })

        return problems

    except Exception as e:
        print(f"Error fetching problems: {e}")
        return []
