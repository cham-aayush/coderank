import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Typical from 'react-typical';

const Recommendations = ({ username }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [insights, setInsights] = useState([]);
  const [nextTarget, setNextTarget] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    fetch(`http://localhost:5001/api/recommend/${username}`)
      .then((res) => res.json())
      .then((data) => {
        const rec = data?.recommendations?.recommendations;
        setRecommendations(rec?.suggestedProblems || []);
        setInsights(rec?.insights || []);
        setNextTarget(rec?.nextTarget || null);
      })
      .catch((err) => {
        console.error('Error fetching recommendations:', err);
        setRecommendations([]);
        setInsights([]);
        setNextTarget(null);
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="space-y-4 mt-8 w-full max-w-3xl mx-auto">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse p-4 rounded-lg shadow-md bg-[#111] border border-[#0ff] space-y-2"
          >
            <div className="h-5 bg-[#0ff3] rounded w-1/2"></div>
            <div className="h-4 bg-[#0ff2] rounded w-3/4"></div>
            <div className="h-4 bg-[#0ff1] rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10 w-full max-w-3xl px-4 text-[#0ff]">
      <div className="text-center mb-4">
        <Typical
          steps={["🔥 Recommendations", 2000, "⚡ Your CodeRank Journey", 2000]}
          loop={Infinity}
          wrapper="h2"
          className="text-2xl font-bold glitch-text"
        />
      </div>

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

      {insights.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">💡 Insights</h3>
          <ul className="list-disc list-inside text-[#0ffb]">
            {insights.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {nextTarget && (
        <div className="bg-[#111] border border-yellow-400 p-4 rounded mb-6 animate-pulse">
          <h4 className="font-semibold mb-1 text-yellow-300">🎯 Your Next Target</h4>
          <p>
            Solve <strong>{nextTarget.mediumTarget}</strong> Medium and{' '}
            <strong>{nextTarget.hardTarget}</strong> Hard problems to improve.
          </p>
        </div>
      )}

      {recommendations.length === 0 ? (
        <p className="text-red-500">No problem recommendations available.</p>
      ) : (
        <div className="grid gap-4">
          {recommendations.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-4 border border-[#0ff8] rounded shadow-md bg-[#111] transition-transform duration-300 hover:shadow-[0_0_20px_#0ff8]"
            >
              <h3 className="text-lg font-semibold">
                {item.title}{' '}
                <span className="text-sm text-[#0ffb]">({item.difficulty})</span>
              </h3>
              <p className="text-sm mt-1">
                <strong>Tags:</strong> {item.tags.join(', ')}
              </p>
              <a
                href={`https://leetcode.com/problems/${item.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0ff] underline text-sm mt-2 inline-block hover:text-[#f0f]"
              >
                View on LeetCode
              </a>
              <div className="mt-2 w-full h-2 bg-[#222] rounded">
                <div className="h-2 bg-cyan-400 rounded" style={{ width: `${Math.random() * 100}%` }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
