import { X } from 'lucide-react';
import { Photo } from '../types';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: Photo[];
}

export const ImageModal = ({ isOpen, onClose, title, images }: ImageModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 z-50 
                 backdrop-blur-sm flex items-center justify-center
                 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-900 rounded-lg p-6 w-11/12 max-w-6xl 
                   max-h-[90vh] overflow-y-auto relative shadow-2xl
                   transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full
                       transition-colors duration-200"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Cargando imágenes...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="group relative overflow-hidden rounded-lg 
                          transform transition-transform hover:scale-[1.02]"
              >
                <img
                  src={image.urls.regular}
                  alt={image.alt_description}
                  className="w-full h-64 object-cover rounded-lg 
                           transition-transform duration-300 ease-in-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 
                              transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {image.alt_description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};