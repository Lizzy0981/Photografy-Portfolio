import { Category } from '../types';

interface CategoryCardProps extends Category {
  onClick: () => void;
}

export const CategoryCard = ({ title, description, onClick }: CategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl 
                 transform hover:scale-105 transition-all cursor-pointer overflow-hidden
                 group"
    >
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 
                    group-hover:opacity-20 transition-opacity" />
    </div>
  );
};