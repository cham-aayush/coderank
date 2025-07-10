import React, { useEffect, useState } from 'react';

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
            className="animate-pulse p-4 rounded-lg shadow-md bg-gray-100 space-y-2"
          >
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10 w-full max-w-3xl px-4">
      <h2 className="text-2xl font-bold mb-4 text-green-600">🔥 Recommendations</h2>

      {insights.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">💡 Insights</h3>
          <ul className="list-disc list-inside text-gray-700">
            {insights.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {nextTarget && (
        <div className="bg-yellow-100 p-4 rounded mb-6 border border-yellow-300">
          <h4 className="font-semibold mb-1">🎯 Your Next Target</h4>
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
            <div key={idx} className="p-4 border rounded shadow-sm bg-white">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}{' '}
                <span className="text-sm text-gray-500">({item.difficulty})</span>
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Tags:</strong> {item.tags.join(', ')}
              </p>
              <a
                href={`https://leetcode.com/problems/${item.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline mt-1 inline-block"
              >
                View on LeetCode
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
