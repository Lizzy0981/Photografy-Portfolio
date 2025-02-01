export interface Category {
  id: string;
  title: string;
  description: string;
  query: string;
}

export interface Photo {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}