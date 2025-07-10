# 🚀 Coderank

**Coderank** is a full-stack web application that analyzes LeetCode user statistics, visualizes problem-solving streaks, and recommends personalized problems to practice — all with a sleek and responsive UI powered by React and TailwindCSS.


## 🧩 Features

- 🔍 View detailed LeetCode statistics (total solved, difficulty-wise breakdown, rank, contribution points)
- 📈 Visualize daily streaks using interactive charts
- 🎯 Get AI-assisted problem recommendations based on strengths and gaps
- 🧠 Receive smart insights and upcoming target suggestions
- 🌙 Dark mode toggle for a seamless experience

---

## 🛠️ Tech Stack

| Frontend        | Backend      | Other Tools     |
|----------------|--------------|-----------------|
| React.js       | Flask (Python) | TailwindCSS     |
| Chart.js       | BeautifulSoup | RESTful API     |
| React Loader   | Custom Recommender Engine | Git + GitHub |

---

## 📁 Project Structure

```
coderank/
├── coderank-frontend/       # React + Tailwind frontend
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── index.html
├── coderank-backend/        # Flask backend
│   ├── app/
│   │   ├── services/
│   │   ├── utils/
│   │   └── data/problemset.json
│   └── app.py
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/cham-aayush/coderank.git
cd coderank
```

---

### 2. Setup the Backend (Flask)

```bash
cd coderank-backend
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py              # Starts at http://localhost:5001
```

---

### 3. Setup the Frontend (React + Tailwind)

```bash
cd ../coderank-frontend
npm install
npm start                  # Starts at http://localhost:3000
```

---

## 🔗 API Endpoints

| Endpoint                              | Description                        |
|--------------------------------------|------------------------------------|
| `/api/stats?username=<username>`     | Fetch LeetCode stats & streak      |
| `/api/recommend/<username>`          | Get personalized recommendations   |

---

## 🧪 Example Usage

You can test the app with:

```
Username: chamoliaayush
Frontend: http://localhost:3000
Backend:  http://localhost:5001
```



---

## 👨‍💻 Author

**Aayush Chamoli**  
📧 aayushchamoli2020@gmail.com  
🔗 [GitHub](https://github.com/cham-aayush)

---

> Built with ❤️ to help developers grow smarter on LeetCode.
