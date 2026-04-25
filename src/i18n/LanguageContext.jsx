import { createContext, useContext, useState, useCallback } from 'react';
import translations from './translations';

const LanguageContext = createContext(null);

/**
 * Get a nested value from an object using dot notation
 * e.g. get(obj, 'login.signIn') → obj.login.signIn
 */
function get(obj, path) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('uplift_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'hi' : 'en';
      try { localStorage.setItem('uplift_lang', next); } catch {}
      return next;
    });
  }, []);

  // Translation function — accepts dot-path like 'login.signIn'
  const t = useCallback((key) => {
    const val = get(translations[lang], key);
    if (val !== undefined) return val;
    // Fallback to English
    const fallback = get(translations.en, key);
    if (fallback !== undefined) return fallback;
    // Return key itself if nothing found
    return key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
