import React, { useState } from 'react';
import { BookOpen, Search, ArrowUpRight, Clock, Calendar, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { blogPosts } from '../../data/realContentData';
import { BlogPost } from '../../types/portfolio';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost }) => {
  const { t, isRtl, language } = useLanguage();
  const { playSound } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'AI Architecture', 'Distributed Systems', 'Creative Engineering'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-24 relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              {t.blog.kicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight text-balance">
              {t.blog.title}
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] max-w-sm">
            <Search className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.blog.searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2" dir={isRtl ? 'rtl' : 'ltr'}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                playSound('click');
                setActiveCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              {cat === 'all' ? t.blog.allArticles : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {filteredPosts.map(post => {
            const title = language === 'fa' ? post.titleFa : post.title;
            const excerpt = language === 'fa' ? post.excerptFa : post.excerpt;
            const category = language === 'fa' ? post.categoryFa : post.category;

            return (
              <article
                key={post.id}
                onClick={() => {
                  playSound('modal');
                  onSelectPost(post);
                }}
                className="lift-on-hover p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-all cursor-pointer group flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Clean unboxed metadata with dot separators (Section 1.A) */}
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <span>{category}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-sans group-hover:text-cyan-300 transition-colors leading-snug">
                    {title}
                  </h3>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                    {excerpt}
                  </p>
                </div>

                {/* Footer info & CTA */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    {post.publishedDate}
                  </span>
                  <div className="flex items-center gap-1 text-cyan-300 group-hover:translate-x-1 transition-transform">
                    <span>{t.blog.readArticle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
