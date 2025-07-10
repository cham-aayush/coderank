import requests

def fetch_user_solved_problems(username):
    url = f"https://leetcode-stats-api.herokuapp.com/{username}"

    try:
        res = requests.get(url)
        if res.status_code != 200:
            return {"error": "Failed to fetch from LeetCode Stats API"}

        data = res.json()

        if data.get("status") == "error":
            return {"error": f"User '{username}' not found"}

        solved_summary = {
            "totalSolved": data.get("totalSolved"),
            "easySolved": data.get("easySolved"),
            "mediumSolved": data.get("mediumSolved"),
            "hardSolved": data.get("hardSolved"),
            "ranking": data.get("ranking"),
            "contributionPoints": data.get("contributionPoints")
        }

        # Simulate problem details (slugs only available here)
        # You can scrape more details using GraphQL later
        dummy_solved_problems = [
            {
                "title": "Two Sum",
                "slug": "two-sum",
                "difficulty": "Easy",
                "tags": ["Array", "Hash Table"]
            },
            {
                "title": "Longest Substring Without Repeating Characters",
                "slug": "longest-substring-without-repeating-characters",
                "difficulty": "Medium",
                "tags": ["String", "Sliding Window"]
            },
            {
                "title": "Median of Two Sorted Arrays",
                "slug": "median-of-two-sorted-arrays",
                "difficulty": "Hard",
                "tags": ["Array", "Binary Search"]
            }
        ]

        return {
            "summary": solved_summary,
            "solved_problems": dummy_solved_problems
        }

    except Exception as e:
        return {"error": str(e)}
