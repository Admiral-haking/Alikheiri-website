import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, ThumbsUp, Copy, Check, Share2 } from 'lucide-react';
import { BlogPost } from '../../types/portfolio';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ post, onClose, onShowToast }) => {
  const { language, t, isRtl } = useLanguage();
  const { playSound } = useTheme();
  const [claps, setClaps] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (post) {
      playSound('modal');
      setClaps(post.claps);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [post]);

  if (!post) return null;

  const title = language === 'fa' ? post.titleFa : post.title;
  const content = language === 'fa' ? post.contentFa : post.content;
  const category = language === 'fa' ? post.categoryFa : post.category;

  const handleClap = () => {
    setClaps(prev => prev + 1);
    playSound('click');
    onShowToast('+1 Helpful reaction noted!');
  };

  const handleCopyCodeSnippet = () => {
    navigator.clipboard.writeText(content);
    setCopiedCode(true);
    playSound('click');
    onShowToast('Article snippet copied to clipboard');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-3xl my-auto glass-panel-elevated rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>{category}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans leading-tight">
            {title}
          </h2>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 pb-2 border-b border-white/5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedDate}
            </span>
            <span>·</span>
            <span>AliKheiri</span>
          </div>

          {/* Formatted Content */}
          <div className="readable-copy rtl-safe text-sm text-slate-300 leading-relaxed font-sans space-y-4 whitespace-pre-line font-normal">
            {content}
          </div>

          {/* Tags */}
          <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
            {post.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span>#{tag}</span>
                {idx < post.tags.length - 1 && <span className="text-slate-600">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Reader Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClap}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span className="tabular-nums font-bold">{claps}</span>
              <span className="hidden sm:inline">{t.blog.reactions}</span>
            </button>
            <button
              onClick={handleCopyCodeSnippet}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-mono transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            {t.blog.closeArticle}
          </button>
        </div>
      </div>
    </div>
  );
};
