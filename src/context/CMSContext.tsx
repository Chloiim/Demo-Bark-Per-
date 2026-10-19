'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CmsContent, DEFAULT_CMS_CONTENT } from '@/data/cms';

const STORAGE_KEY = 'bark_cms_content';

interface CMSContextValue {
  content: CmsContent;
  isHydrated: boolean;
  updateContent: (updates: Partial<CmsContent>) => void;
  resetContent: () => void;
}

const CMSContext = createContext<CMSContextValue | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<CmsContent>(DEFAULT_CMS_CONTENT);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setContent({ ...DEFAULT_CMS_CONTENT, ...JSON.parse(stored) });
      }
    } catch (error) {
      console.error('No se pudo cargar el contenido guardado del CMS.', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const updateContent = (updates: Partial<CmsContent>) => {
    setContent(previous => {
      const next = { ...previous, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (error) {
        console.error('No se pudo guardar el contenido del CMS.', error);
      }
      return next;
    });
  };

  const resetContent = () => {
    setContent(DEFAULT_CMS_CONTENT);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('No se pudo restablecer el contenido del CMS.', error);
    }
  };

  return (
    <CMSContext.Provider value={{ content, isHydrated, updateContent, resetContent }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
