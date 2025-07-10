import requests
def fetch_user_solved_problems(username):
    url = f"https://leetcode-stats-api.herokuapp.com/{username}"

    try:
        res = requests.get(url)
        if res.status_code != 200:
            return []

        data = res.json()
        print(data)  # <- add this for debugging

        # Depending on structure, adapt this:
        solved_slugs = data.get("solvedQuestions")  # or change if different

        if not solved_slugs or not isinstance(solved_slugs, list):
            return []

        all_problems = load_all_problems()

        solved_problems = [p for p in all_problems if p["slug"] in solved_slugs]

        return solved_problems

    except Exception as e:
        print(f"Error fetching user data: {e}")
        return []
