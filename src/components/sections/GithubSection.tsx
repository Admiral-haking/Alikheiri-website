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
  const [profileStats, setProfileStats] = useState({ publicRepos: 50, followers: 0, following: 7 });
  const [error, setError] = useState<string | null>(null);

  const cacheKey = (user: string) => `github_snapshot_${user.toLowerCase()}`;

  const fetchGithubRepos = async (userToFetch: string) => {
    playSound('click');
    setLoading(true);
    setError(null);
    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${userToFetch}`),
        fetch(`https://api.github.com/users/${userToFetch}/repos?sort=updated&per_page=8`)
      ]);
      if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API unavailable');
      const profile = await profileRes.json();
      const data = await reposRes.json();
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
            topics: r.topics || [],
            license: r.license?.spdx_id || undefined
          }));
          setRepos(formatted);
          const starsSum = formatted.reduce((acc, r) => acc + r.stars, 0);
          setTotalStars(starsSum);
          setProfileStats({ publicRepos: profile.public_repos, followers: profile.followers, following: profile.following });
          localStorage.setItem(cacheKey(userToFetch), JSON.stringify({ repos: formatted, stars: starsSum, profileStats: { publicRepos: profile.public_repos, followers: profile.followers, following: profile.following }, savedAt: Date.now() }));
      }
    } catch {
      setError(t.github.error);
      const cached = localStorage.getItem(cacheKey(userToFetch));
      if (cached) {
        const snapshot = JSON.parse(cached);
        setRepos(snapshot.repos);
        setTotalStars(snapshot.stars);
        setProfileStats(snapshot.profileStats);
      } else setRepos(fallbackGitHubRepos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem(cacheKey('Admiral-haking'));
    if (cached) {
      try {
        const snapshot = JSON.parse(cached);
        if (Date.now() - snapshot.savedAt < 10 * 60 * 1000) {
          setRepos(snapshot.repos);
          setTotalStars(snapshot.stars);
          setProfileStats(snapshot.profileStats);
          return;
        }
      } catch { /* fetch a fresh snapshot */ }
    }
    void fetchGithubRepos('Admiral-haking');
  }, []);

  return (
    <section id="github" aria-busy={loading} className="py-24 relative overflow-hidden border-t border-white/[0.06]">
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

        {/* Live profile snapshot */}
        <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Github className="w-4 h-4 text-cyan-400" />
              <span>{profileStats.publicRepos} public repositories on GitHub</span>
            </div>
            <div className="flex flex-wrap gap-4 text-slate-400 text-[11px]">
              <span><strong className="text-cyan-300">{totalStars}</strong> stars in latest repos</span>
              <span><strong className="text-cyan-300">{profileStats.followers}</strong> followers</span>
              <span><strong className="text-cyan-300">{profileStats.following}</strong> following</span>
            </div>
          </div>
          {error && <p className="text-xs text-amber-300 border border-amber-500/20 bg-amber-500/5 rounded-lg px-3 py-2">{error}</p>}
        </div>

        {/* Repository Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {loading && Array.from({ length: 4 }, (_, index) => (
            <div key={`skeleton-${index}`} className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-5 animate-pulse" aria-hidden="true">
              <div className="h-4 w-1/2 rounded bg-white/10" />
              <div className="h-10 w-full rounded bg-white/10" />
              <div className="h-3 w-3/4 rounded bg-white/10" />
            </div>
          ))}
          {!loading && repos.map(repo => (
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
                  {repo.license && <span className="text-slate-500">{repo.license}</span>}
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
