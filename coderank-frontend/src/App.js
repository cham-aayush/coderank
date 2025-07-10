import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Recommendations from "./components/Recommendations.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);
function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="absolute top-4 right-4 px-4 py-1 rounded-md border dark:border-gray-200 border-gray-800 bg-white dark:bg-black text-black dark:text-white"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
function App() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:5001/api/stats?username=${username}`);
      const data = await res.json();

      if (!data?.streak?.dates || !data?.summary) {
        setError("Invalid data or user not found.");
        setChartData(null);
        setStats(null);
        return;
      }

      setStats(data.summary);
      setChartData({
        labels: data.streak.dates,
        datasets: [
          {
            label: "Streak Progress",
            data: data.streak.dates.map((_, i) => i + 1),
            borderColor: "#10b981",
            backgroundColor: "#d1fae5",
            tension: 0.4,
          },
        ],
      });
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
     
    <div className="min-h-screen bg-gray-50 px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">LeetCode Stats & Streak</h1>

      <div className="flex flex-col items-center gap-4 mb-6 sm:flex-row sm:justify-center">
        <input
          type="text"
          placeholder="Enter LeetCode username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleFetch}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
        >
          Check
        </button>
      </div>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {loading && <p className="text-center text-green-600 font-semibold">Loading...</p>}

      {stats && (
        <div className="bg-white rounded shadow p-6 max-w-xl mx-auto mb-6">
          <h2 className="text-xl font-semibold mb-4">User Stats</h2>
          <ul className="space-y-1 text-gray-700">
            <li><strong>Total Solved:</strong> {stats.totalSolved}</li>
            <li><strong>Easy:</strong> {stats.easySolved}</li>
            <li><strong>Medium:</strong> {stats.mediumSolved}</li>
            <li><strong>Hard:</strong> {stats.hardSolved}</li>
            <li><strong>Ranking:</strong> #{stats.ranking}</li>
            <li><strong>Contribution Points:</strong> {stats.contributionPoints}</li>
          </ul>
        </div>
      )}

      {chartData && (
        <div className="bg-white rounded shadow p-6 max-w-2xl mx-auto">
          <Line data={chartData} />
        </div>
      )}

      {username && <Recommendations username={username} />}
    </div>
  );
}

export default App;
