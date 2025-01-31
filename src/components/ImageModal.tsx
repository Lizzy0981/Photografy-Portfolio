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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-11/12 max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.urls.regular}
              alt={image.alt_description}
              className="w-full h-64 object-cover rounded-lg hover:opacity-90 transition-opacity"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
};