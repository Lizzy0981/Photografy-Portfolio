import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { categories } from './config/categories';
import { ThemeToggle } from './components/ThemeToggle';
import { CategoryCard } from './components/CategoryCard';
import { ImageModal } from './components/ImageModal';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { FeaturedGallery } from './components/FeaturedGallery';
import { Category } from './types';

const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Efecto Parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: images } = useQuery({
    queryKey: ['images', selectedCategory?.query],
    queryFn: async () => {
      if (!selectedCategory || !UNSPLASH_API_KEY) return [];
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${selectedCategory.query}&per_page=30`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      return data.results;
    },
    enabled: !!selectedCategory && !!UNSPLASH_API_KEY,
  });

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ThemeToggle />
      
      {/* Hero Section con Parallax */}
      <HeroSection />

      {/* Contenido Principal */}
      <main className="relative z-10">
        {/* Galería Destacada */}
        <FeaturedGallery />

        {/* Categorías */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              Servicios Fotográficos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  {...category}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {selectedCategory && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCategory(null);
          }}
          title={selectedCategory.title}
          images={images || []}
        />
      )}
    </div>
  );
}