import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  const numberRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!numberRef.current) return;
      const moveX = (e.clientX - window.innerWidth / 2) / 60;
      const moveY = (e.clientY - window.innerHeight / 2) / 60;
      numberRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <main className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center relative overflow-hidden bg-windoor-background">
        {/* Architectural Grid Background Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
          style={{
            backgroundSize: '40px 40px',
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                              linear-gradient(to bottom, #000 1px, transparent 1px)`
          }}
        />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-16 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Structural Line Overlay Left (Decorative) */}
          <div className="hidden md:block col-span-1 border-l border-windoor-structural-grey/30 h-96"></div>
          
          <div className="col-span-1 md:col-span-10 text-center md:text-left select-none">
            {/* Large 404 Title */}
            <h1 
              ref={numberRef}
              className="font-windoor-main text-[120px] sm:text-[180px] md:text-[240px] leading-none text-windoor-primary tracking-tighter opacity-[0.06] select-none will-change-transform"
            >
              404
            </h1>
            
            <div className="space-y-6 sm:space-y-8 -mt-8 sm:-mt-16 md:-mt-24 relative z-10">
              <p className="font-windoor-main text-xs uppercase tracking-[0.3em] text-windoor-secondary border-l-2 border-windoor-primary pl-4 md:inline-block">
                PAGE NOT FOUND
              </p>
              
              <h2 className="font-windoor-main text-xl sm:text-2xl md:text-3xl max-w-2xl text-windoor-primary font-bold leading-tight">
                The threshold you are looking for does not exist or has been moved.
              </h2>
              
              <div className="pt-4">
                <Link 
                  to="/" 
                  className="inline-flex items-center bg-windoor-primary text-white font-windoor-main text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:px-10 sm:py-5 transition-all hover:bg-windoor-secondary group cursor-pointer"
                >
                  RETURN TO HOMEPAGE
                  <span className="ml-3 transition-transform group-hover:translate-x-1 duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Structural Line Overlay Right (Decorative) */}
          <div className="hidden md:block col-span-1 border-r border-windoor-structural-grey/30 h-96"></div>
        </div>

        {/* Abstract Architectural Lines */}
        <div className="absolute bottom-20 right-0 w-1/3 h-px bg-windoor-structural-grey/30 hidden md:block" />
        <div className="absolute top-40 left-0 w-1/4 h-px bg-windoor-structural-grey/30 hidden md:block" />
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;
