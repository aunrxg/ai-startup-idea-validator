'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const res = await fetch(`${apiUrl}/ideas`);
        if (!res.ok) throw new Error('Failed to fetch ideas');
        const data = await res.json();
        setIdeas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse mb-2"></div>
          <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl h-48 animate-pulse flex flex-col justify-between">
              <div>
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded mb-6"></div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                <div className="h-8 w-28 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-8 rounded-2xl text-center">
        <p className="text-lg font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-700 dark:text-red-300 hover:bg-red-200 transition-colors duration-200">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Your Ideas</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Track and review all your analyzed startup concepts.</p>
      </div>

      {ideas.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 border-dashed dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No ideas yet</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">Submit your first idea to get actionable insights, market overview, and tech stacks.</p>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl active:scale-95">
            Submit your first idea
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map((idea) => {
            const risk = idea.report?.risk_level || 'Unknown';
            const score = idea.report?.profitability_score || 0;
            return (
              <Link key={idea._id} href={`/ideas/${idea._id}`} className="group relative bg-white dark:bg-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 transition-all outline-none focus:ring-2 focus:ring-blue-500 flex flex-col items-start overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 pr-8">{idea.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6 grow">{idea.description}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(risk)}`}>
                    Risk: {risk}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20">
                    Score: {score}/100
                  </span>
                  <span className="text-xs text-slate-400 ml-auto hidden sm:block">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  );
}
