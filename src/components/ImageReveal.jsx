import React, { useEffect, useRef, useState } from 'react';

const ImageReveal = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspectClass = 'aspect-video',
  delay = 0,
}) => {
  const containerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`image-reveal-container ${aspectClass} ${isIntersecting ? 'active' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}s`,
      }}
    >
      <img
        src={src}
        alt={alt}
        className={`image-reveal-img ${imgClassName}`}
        loading="lazy"
      />
    </div>
  );
};

export default ImageReveal;
