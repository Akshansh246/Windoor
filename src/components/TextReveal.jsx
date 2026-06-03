import React, { useEffect, useRef, useState } from 'react';

const TextReveal = ({ children, mode = 'words', delay = 0, speed = 0.04, className = '' }) => {
  const elementRef = useRef(null);
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

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (mode === 'words' && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <span ref={elementRef} className={`inline-block ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="inline-block whitespace-nowrap">
            <span className="word-wrapper">
              <span
                className={`reveal-text-word ${isIntersecting ? 'active' : ''}`}
                style={{
                  transitionDelay: `${delay + i * speed}s`,
                }}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </span>
    );
  }

  return (
    <div
      ref={elementRef}
      className={`reveal-block ${isIntersecting ? 'active' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default TextReveal;
