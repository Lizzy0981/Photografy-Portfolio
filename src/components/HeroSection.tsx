import { useState, useEffect } from 'react';

const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const heroQueries = [
  'fashion photography studio',
  'professional fashion model runway',
  'high fashion editorial photography'
];

export const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const fetchedImages = await Promise.all(
          heroQueries.map(async (query) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=1`,
              {
                headers: {
                  Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
                },
              }
            );
            const data = await response.json();
            return data.results[0].urls.regular;
          })
        );
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching hero images:', error);
      }
    };

    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Imágenes del slider */}
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: currentImage === index ? 1 : 0,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Contenido */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 
          className="text-6xl md:text-7xl font-bold mb-6 opacity-0 animate-slide-up"
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          Monique Wright
        </h1>
        <h2 
          className="text-2xl md:text-3xl text-purple-300 font-light mb-8 opacity-0 animate-slide-up"
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          Fotografía de Moda
        </h2>
        <p 
          className="max-w-2xl text-center text-lg text-gray-200 opacity-0 animate-slide-up"
          style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
        >
          Capturando momentos únicos y creando arte visual que perdura en el tiempo
        </p>

        {/* Botón de llamada a la acción */}
        <button
          className="mt-8 px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full
                     transform hover:-translate-y-1 transition-all duration-300
                     opacity-0 animate-slide-up"
          style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
        >
          Ver Portafolio
        </button>
      </div>

      {/* Indicadores del slider */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImage === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};