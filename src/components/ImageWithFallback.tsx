import React, { useState } from 'react';
import { Crown, Sparkles, Shirt, ShoppingBag, Watch } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: 'men' | 'women' | 'children' | 'watch' | 'shoes' | 'jewelry' | 'bag' | string;
  category?: 'men' | 'women' | 'children' | 'watch' | 'shoes' | 'jewelry' | 'bag' | string;
}

export const resolveImagePath = (url?: string): string => {
  if (!url) return '/images/hero_luxury_fashion_banner.jpg';

  // If path starts with /src/assets/images/, convert to /images/
  if (url.startsWith('/src/assets/images/')) {
    const filename = url.replace('/src/assets/images/', '');
    return `/images/${filename}`;
  }

  // If path is already /images/ or http, keep it
  return url;
};

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'M.SHAHEER Haute Couture',
  className = '',
  fallbackCategory = 'men',
  category,
  ...props
}) => {
  const [errorCount, setErrorCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const activeCategory = category || fallbackCategory;

  const initialSrc = resolveImagePath(src);

  const categoryFallbacks: Record<string, string> = {
    men: '/images/category_men_collection.jpg',
    women: '/images/category_women_collection.jpg',
    children: '/images/category_children_collection.jpg',
    watch: '/images/product_luxury_watch_gold.jpg',
    shoes: '/images/product_oxford_shoes_leather.jpg',
    jewelry: '/images/product_bridal_jewelry_gold.jpg',
    bag: '/images/product_luxury_handbag_leather.jpg',
  };

  const getSource = () => {
    if (errorCount === 0) return initialSrc;
    if (errorCount === 1) return categoryFallbacks[activeCategory] || '/images/hero_luxury_fashion_banner.jpg';
    return null;
  };

  const currentSrc = getSource();

  // If all image attempts fail, render luxury CSS/SVG placeholder
  if (!currentSrc || errorCount >= 2) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 text-neutral-400 p-4 select-none ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
          <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Crown size={16} />
          </div>
          <span className="font-serif text-[11px] font-bold tracking-[0.2em] text-neutral-200 uppercase">
            M.SHAHEER
          </span>
          <span className="text-[10px] text-amber-400/80 tracking-wider uppercase font-mono">
            Haute Couture
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
          <Sparkles size={16} className="text-amber-500/20" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setErrorCount(prev => prev + 1)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
