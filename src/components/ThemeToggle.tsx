import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Verificar preferencia del sistema
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 
                 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all
                 text-gray-800 dark:text-gray-200 z-50"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <Sun className="w-6 h-6 hover:text-yellow-500 transition-colors" />
      ) : (
        <Moon className="w-6 h-6 hover:text-blue-500 transition-colors" />
      )}
    </button>
  );
};