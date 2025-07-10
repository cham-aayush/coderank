# app/data/fetch_leetcode_all.py
import requests
import json

def fetch_and_save():
    url = "https://leetcode.com/api/problems/all/"
    res = requests.get(url)
    res.raise_for_status()
    data = res.json()
    with open("app/data/all_problems.json", "w") as f:
        json.dump(data["stat_status_pairs"], f)

if __name__ == "__main__":
    fetch_and_save()
