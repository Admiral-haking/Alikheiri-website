import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, RefreshCw, Code2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { fallbackGitHubRepos } from '../../data/realPortfolioData';
import { GitHubRepo } from '../../types/portfolio';

export const GithubSection: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const { playSound } = useTheme();

  const [username, setUsername] = useState('Admiral-haking');
  const [repos, setRepos] = useState<GitHubRepo[]>(fallbackGitHubRepos);
  const [loading, setLoading] = useState(false);
  const [totalStars, setTotalStars] = useState(7);

  const fetchGithubRepos = async (userToFetch: string) => {
    playSound('click');
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/users/${userToFetch}/repos?sort=updated&per_page=4`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted: GitHubRepo[] = data.map((r: any) => ({
            id: r.id,
            name: r.name,
            description: r.description || 'Public open source software repository.',
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language || 'TypeScript',
            updatedAt: r.updated_at.split('T')[0],
            htmlUrl: r.html_url,
            topics: r.topics || []
          }));
          setRepos(formatted);
          const starsSum = formatted.reduce((acc, r) => acc + r.stars, 0);
          setTotalStars(starsSum);
        }
      }
    } catch {
      // Graceful fallback to verified repositories
      setRepos(fallbackGitHubRepos);
    } finally {
      setLoading(false);
    }
  };

  // Simulated 52-week commit activity matrix (7 rows x 52 cols)
  const commitMatrix = Array.from({ length: 52 }, (_, colIdx) =>
    Array.from({ length: 7 }, (_, rowIdx) => {
      const seed = Math.sin(colIdx * 7 + rowIdx) * 10000;
      const rand = seed - Math.floor(seed);
      if (rand < 0.25) return 0;
      if (rand < 0.55) return 1;
      if (rand < 0.85) return 2;
      return 3;
    })
  );

  return (
    <section id="github" className="py-24 relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              {t.github.kicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight text-balance">
              {t.github.title}
            </h2>
            <p className="text-sm text-slate-400 font-sans">
              {t.github.description}
            </p>
          </div>

          {/* Interactive GitHub user lookup */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="github username"
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 w-36 sm:w-44"
              />
            </div>
            <button
              onClick={() => fetchGithubRepos(username)}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-colors flex items-center gap-1.5 border border-white/10"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{t.github.lookupBtn}</span>
            </button>
          </div>
        </div>

        {/* Git Commit Calendar Heatmap Strip */}
        <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Github className="w-4 h-4 text-cyan-400" />
              <span>50 public repositories on GitHub</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-xs bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-xs bg-cyan-900" />
              <span className="w-2.5 h-2.5 rounded-xs bg-cyan-500" />
              <span className="w-2.5 h-2.5 rounded-xs bg-cyan-300" />
              <span>More</span>
            </div>
          </div>

          {/* Commit Matrix View */}
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[680px]">
              {commitMatrix.map((week, wIdx) =>
                week.map((level, dIdx) => {
                  let bgClass = 'bg-white/5';
                  if (level === 1) bgClass = 'bg-cyan-950 border border-cyan-800/40';
                  if (level === 2) bgClass = 'bg-cyan-600/70 shadow-[0_0_4px_rgba(0,245,255,0.3)]';
                  if (level === 3) bgClass = 'bg-cyan-400 shadow-[0_0_8px_rgba(0,245,255,0.6)]';

                  return (
                    <div
                      key={`${wIdx}-${dIdx}`}
                      className={`w-3 h-3 rounded-[2px] transition-colors hover:scale-125 ${bgClass}`}
                      title={`Activity index: ${level}`}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Repository Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {repos.map(repo => (
            <div
              key={repo.id}
              className="lift-on-hover p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold font-mono text-white">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span>{repo.name}</span>
                  </div>
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
              </div>

              {/* Repo Stats & Language */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1 hover:text-yellow-300 transition-colors">
                    <Star className="w-3.5 h-3.5 text-yellow-400" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    {repo.forks}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">{repo.updatedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
