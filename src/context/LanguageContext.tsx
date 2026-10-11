import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types/portfolio';
import { translations } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRtl: boolean;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('alikheiri_portfolio_lang') as Language;
      if (saved === 'en' || saved === 'fa') {
        return saved;
      }
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('alikheiri_portfolio_lang', language);
    const isRtl = language === 'fa';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
    const seo = language === 'fa'
      ? {
          title: 'علی خیری | توسعه‌دهنده بک‌اند و فول‌استک',
          description: 'نمونه‌کارهای علی خیری؛ دانشجوی مهندسی کامپیوتر و توسعه‌دهنده بک‌اند و فول‌استک با تمرکز بر هوش مصنوعی دفاعی و امنیت داده.',
          locale: 'fa_IR'
        }
      : {
          title: 'AliKheiri | Backend & Full-Stack Developer',
          description: 'Portfolio of AliKheiri, a computer engineering student and backend/full-stack developer focused on defensive AI, data security, and reliable systems.',
          locale: 'en_US'
        };
    document.title = seo.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', seo.description);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    ogDescription?.setAttribute('content', seo.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle?.setAttribute('content', seo.title);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    ogLocale?.setAttribute('content', seo.locale);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'fa' : 'en'));
  };

  const isRtl = language === 'fa';
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isRtl,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
