import { Category } from '../types';

interface CategoryCardProps extends Category {
  onClick: () => void;
}

export const CategoryCard = ({ title, description, onClick }: CategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl 
                 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden
                 group"
    >
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        <div className="mt-4 text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Click para ver más →
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 
                    group-hover:opacity-10 transition-opacity duration-300" />
    </div>
  );
};