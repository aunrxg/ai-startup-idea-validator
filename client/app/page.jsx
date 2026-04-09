'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Loader } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;
    
    setIsSubmitting(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const res = await fetch(`${apiUrl}/ideas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      
      if (!res.ok) throw new Error('Failed to validate idea');
      
      showToast('Idea submitted successfully! Analyzing...', 'success');
      
      // Delay before redirecting to allow user to see the success message
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
      
    } catch (error) {
      showToast(error.message || 'Something went wrong', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[70vh] py-12 relative animate-in fade-in zoom-in duration-500">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-24 right-4 px-6 py-3 rounded-xl shadow-lg border backdrop-blur-md text-sm font-medium z-50 transition-all ${toast.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'}`}>
          {toast.message}
        </div>
      )}

      {/* Hero Header */}
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Validate Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">Startup Idea</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Submit your concept below and let our AI consultant analyze the market, 
          competitors, and tech stack in seconds.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="w-full bg-white dark:bg-card rounded-3xl shadow-xl shadow-blue-900/5 dark:shadow-none border border-slate-200 dark:border-slate-800 p-8 md:p-10 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-indigo-500 opacity-10 blur-3xl mix-blend-multiply"></div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Idea Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Airbnb for Boats"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              required
              className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              placeholder="Describe the core problem, target audience, and how it works..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              required
              className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50 resize-none text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !title || !description}
            className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  Validate Idea Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
