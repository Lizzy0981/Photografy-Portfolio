import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { categories } from './config/categories';
import { ThemeToggle } from './components/ThemeToggle';
import { CategoryCard } from './components/CategoryCard';
import { ImageModal } from './components/ImageModal';
import { Category } from './types';

const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: images, isLoading } = useQuery({
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
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
            Monique Wright
          </h1>
          <h2 className="text-2xl text-purple-600 dark:text-purple-400">
            Fotografía de Moda
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </div>

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