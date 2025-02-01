export const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Realizado por Elizabeth Diaz Familia
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/Lizzy0981"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <i className="ri-github-fill text-2xl" />
          </a>
          <a
            href="https://linkedin.com/in/eli-familia/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <i className="ri-linkedin-fill text-2xl" />
          </a>
          <a
            href="https://twitter.com/Lizzyfamilia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <i className="ri-twitter-x-fill text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};