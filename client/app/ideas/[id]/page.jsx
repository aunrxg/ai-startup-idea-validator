'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Globe, Info, MessageCircleWarning, Users, Zap } from 'lucide-react';

export default function IdeaDetail() {
  const params = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!params.id) return;
    
    const fetchIdea = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const res = await fetch(`${apiUrl}/ideas/${params.id}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error('Idea not found');
          throw new Error('Failed to fetch idea details');
        }
        const data = await res.json();
        setIdea(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [params.id]);

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
      <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
          <div className="h-6 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse col-span-2"></div>
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
        </div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-8 rounded-2xl text-center max-w-2xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-2">Oops!</h2>
        <p className="text-lg font-medium">{error}</p>
        <Link href="/dashboard" className="inline-block mt-6 px-6 py-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-700 dark:text-red-300 hover:bg-red-200 transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  if (!idea || !idea.report) return null;

  const { report } = idea;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors group">
        <ArrowLeft /> 
        Back to Dashboard
      </Link>

      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {idea.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 border-l-4 border-blue-500 pl-4 bg-blue-50/50 dark:bg-blue-900/20 py-3 rounded-r-lg">
          {idea.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="bg-linear-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/20 flex flex-col justify-center items-center text-center">
          <p className="text-blue-100 font-medium mb-1">Profitability Score</p>
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-black tracking-tighter">{report.profitability_score}</span>
            <span className="text-xl text-blue-200 font-medium">/100</span>
          </div>
          <div className="mt-4">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 ${getRiskColor(report.risk_level)} bg-opacity-90 dark:bg-opacity-100`}>
              {report.risk_level} Risk
            </span>
          </div>
        </div>

        {/* Justification Card */}
        <div className="md:col-span-2 bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Info />
            Analyst Justification
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            {report.justification}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Card */}
        <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <h3 className="text-lg font-bold dark:text-white mb-3 text-red-500 flex items-center gap-2">
            <MessageCircleWarning />
            The Problem
          </h3>
          <p className="text-slate-600 dark:text-slate-300">{report.problem}</p>
        </div>

        {/* Solution / Market Card */}
        <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <h3 className="text-lg font-bold dark:text-white mb-3 text-green-500 flex items-center gap-2">
            <Globe />
            Market Overview
          </h3>
          <p className="text-slate-600 dark:text-slate-300">{report.market}</p>
        </div>
      </div>

      {/* Customer Persona */}
      <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <h3 className="text-lg font-bold dark:text-white mb-3 flex items-center gap-2 text-purple-500">
          <Users />
          Customer Persona
        </h3>
        <p className="text-slate-600 dark:text-slate-300">{report.customer}</p>
      </div>

      {/* Competitors and Tech Stack Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Competitors Table */}
        <div className="lg:col-span-2 bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-8 overflow-x-auto shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Competitors</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                <th className="pb-3 font-semibold w-1/3">Company Name</th>
                <th className="pb-3 font-semibold">Their Differentiation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {report.competitor?.map((comp, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 font-medium text-slate-900 dark:text-white">{comp.name}</td>
                  <td className="py-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed pr-2">{comp.differentiation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tech Stack */}
        <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <h3 className="text-lg font-bold dark:text-white mb-6 flex items-center gap-2">
            <Zap />
            Suggested Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {report.tech_stack?.map((tech, i) => (
              <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-default shadow-sm shadow-slate-200 dark:shadow-none">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
