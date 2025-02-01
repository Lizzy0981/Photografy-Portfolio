import { useEffect, useRef, useState } from 'react';

const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const featuredCategories = [
  {
    query: 'fashion editorial photography',
    title: 'Moda Editorial',
    description: 'Colección Primavera 2025'
  },
  {
    query: 'professional portrait photography',
    title: 'Retratos',
    description: 'Estudio y Naturaleza'
  },
  {
    query: 'fashion event photography',
    title: 'Eventos',
    description: 'Momentos Especiales'
  }
];

export const FeaturedGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<Array<{ url: string; title: string; description: string }>>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await Promise.all(
          featuredCategories.map(async (category) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?query=${category.query}&per_page=1`,
              {
                headers: {
                  Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
                },
              }
            );
            const data = await response.json();
            return {
              url: data.results[0].urls.regular,
              title: category.title,
              description: category.description
            };
          })
        );
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching featured images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [images]);

  return (
    <section className="py-20 px-4" ref={galleryRef}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Trabajos Destacados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="gallery-item opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="group relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};