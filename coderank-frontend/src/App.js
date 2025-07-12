import React, { useState, useEffect } from "react";
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
import "@fontsource/orbitron";
import "@fontsource/press-start-2p";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

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
            borderColor: "#0ff",
            backgroundColor: "#112",
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
    <div className="min-h-screen bg-[#0f0f1a] text-[#0ff] px-4 py-8 font-[Orbitron]">
      <h1 className="text-4xl text-center font-bold glitch-text mb-6">⚡ CodeRank ⚡</h1>

      <style>{`
        .glitch-text {
          position: relative;
          color: #0ff;
          animation: glitch 1s infinite;
        }

        @keyframes glitch {
          0% { text-shadow: 2px 2px #f0f, -2px -2px #0ff; }
          20% { text-shadow: -2px -2px #0f0, 2px 2px #f0f; }
          40% { text-shadow: 2px -2px #f00, -2px 2px #0ff; }
          60% { text-shadow: -2px 2px #ff0, 2px -2px #00f; }
          100% { text-shadow: 2px 2px #0ff, -2px -2px #f0f; }
        }
      `}</style>

      <div className="flex flex-col items-center gap-4 mb-6 sm:flex-row sm:justify-center">
        <input
          type="text"
          placeholder="Enter LeetCode username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-[#111] border border-[#0ff] text-[#0ff] placeholder-[#0ff] rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#f0f]"
        />
        <button
          onClick={handleFetch}
          className="bg-[#0ff] text-[#111] hover:bg-[#f0f] px-5 py-2 rounded font-bold"
        >
          Check
        </button>
      </div>

      {error && <p className="text-red-400 text-center font-mono">{error}</p>}
      {loading && <p className="text-center text-[#0ff] font-semibold">Loading...</p>}

      {stats && (
        <div className="bg-[#111] border border-[#0ff] text-[#0ff] rounded p-6 max-w-xl mx-auto mb-6">
          <h2 className="text-xl font-bold mb-4">🚀 User Stats</h2>
          <ul className="space-y-1">
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
        <div className="bg-[#111] border border-[#0ff] rounded p-6 max-w-2xl mx-auto">
          <Line data={chartData} />
        </div>
      )}

      {username && <Recommendations username={username} />}
    </div>
  );
}

export default App;
