'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { HeroSlider } from '@/components/HeroSlider';
import { ScrollingTicker } from '@/components/ScrollingTicker';
import { TrustBadges } from '@/components/TrustBadges';
import { ObjectiveSlider } from '@/components/ObjectiveSlider';
import { PromoCardsGrid } from '@/components/PromoCardsGrid';
import { ProductGrid } from '@/components/ProductGrid';
import { ReviewsSection } from '@/components/ReviewsSection';
import { Footer } from '@/components/Footer';
import { SocialProofToast } from '@/components/SocialProofToast';
import { WhatsAppFloatingWidget } from '@/components/WhatsAppFloatingWidget';
import { useCMS } from '@/context/CMSContext';
import { FitnessObjective } from '@/types';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedObjective, setSelectedObjective] = useState<FitnessObjective>('todos');
  const { content } = useCMS();

  const bundles = content.products.filter(p => p.category === 'bundles');

  const scrollToCatalog = (cat?: string) => {
    if (cat) setSelectedCategory(cat);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToObjectives = () => {
    const el = document.getElementById('objetivos-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCombos = () => {
    const el = document.getElementById('combos-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectObjective = (obj: FitnessObjective) => {
    setSelectedObjective(obj);
    scrollToCatalog();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* 1. Timmy Top Announcement Bar with Carousel */}
      <AnnouncementBar />

      {/* 2. Main Navbar with real BARK Red Logo */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="flex-1">
        {/* 3. Hero Slideshow (2.33:1 format like Timmy) */}
        <HeroSlider
          onExplore={() => scrollToCatalog('todos')}
          onExploreObjectives={scrollToObjectives}
          onExploreCombos={scrollToCombos}
        />

        {/* 4. Scrolling Marquee Promotion (Exact Timmy section m-scrolling-promotion) */}
        <ScrollingTicker />

        {/* 5. Trust strip */}
        <TrustBadges />

        {/* 6. Iconic "Elige tu objetivo" (Exact Timmy objective-slider) */}
        <ObjectiveSlider
          activeObjective={selectedObjective}
          onSelectObjective={handleSelectObjective}
        />

        {/* 7. "Combos En Promo" (Exact Timmy promo_cards_home) */}
        <PromoCardsGrid bundles={bundles} />

        {/* 8. Categorías destacadas & Product Tabs */}
        <ProductGrid
          products={content.products}
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          activeObjective={selectedObjective}
          onClearObjective={() => setSelectedObjective('todos')}
        />

        {/* 9. Reviews & Social Proof */}
        <ReviewsSection />
      </main>

      {/* 10. Footer with Peruvian RUC & Libro de Reclamaciones */}
      <Footer />

      {/* --- MARKETING & CRO TOOLS --- */}
      {/* Live Social Proof Notification Toast */}
      <SocialProofToast />

      {/* Floating WhatsApp Coach Support */}
      <WhatsAppFloatingWidget />
    </div>
  );
}
