import React, { useRef, useEffect, useState } from 'react';

const PinnedStorytelling = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const scrolledPast = -rect.top;
      const windowHeight = window.innerHeight;

      // The scrolling occurs over totalHeight - windowHeight range
      const scrollableRange = totalHeight - windowHeight;
      if (scrollableRange <= 0) return;

      const progress = Math.min(Math.max(scrolledPast / scrollableRange, 0), 1);
      
      // Map progress [0, 1] to 3 states: 0, 1, 2
      if (progress < 0.33) {
        setActiveIndex(0);
      } else if (progress < 0.66) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const storytellingData = [
    {
      title: "Facade",
      desc: "Dissolving the boundaries between interior spaces and the sky with structural refinement.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMAaRrV5-NfVbQu9waPHuLoPb3S3wNhBwRTwrrTQEB6jK6Kq7IXk8D6NuslY6ut5WPos9j_T1qBBiHJ1CFyLRvUr-stYJ5niJOr6hQm5Mf5pg7aYApHLCzucbRPwM80hl9ZctOTvlf6m4XWF6E53S-96hSC0p5_G3hxitZG0vF_KFyxarDctWTvcLQYFrro83d0ax08tlQNz4iVFkZOWexigmsLqDUpjwAzjLOdRBLGaKE9LQIxaGJaUvaGtefbr3OBuFNrq6wnfU"
    },
    {
      title: "Curtain Wall",
      desc: "Monolithic glass envelopes engineered to withstand extreme wind pressures while framing panoramic views.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIgizOrbLX98JT4NypS0HgqfYIWrdk4mma-PNKBcrZBBsbw_g2zJzPgv1y5nRPBtlcG9JHcS-Fxz6Vr6sJljno21MaGPmA34osWxp9rCkRCbg52hd_eHFwuwaA3oqXYZXGV89KiR236iGXcAMZm_quyrACiDzOpQBZdf1Z0eQZl4GjzFVE9tFztXnnvFBAoYyB1nDD7lXORh3a2swIK5AAZcM63XllzcHKZ8w7Rcco27Jj7IBr9Xh1v9LT9YGAc2-DFp3cIW8HGAo"
    },
    {
      title: "Engineered Performance",
      desc: "Delivering thermal insulation and acoustic silence with German precision and architectural elegance.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnvclpg3Y0kYCAtm7wydkrF564D7tRmCIT1PFOVwQNSgSnM93FL1s1K5gEaCY3nBH8FNk8xzH5xEyQAMKoVfgbPhiEzMVgQ0Q7ImKcz-kkIeMHWSuHLoLQLTTEbt6tSYJv1FGLGsGk-BHy9_p-u1I2GeZbW8hMArLGSl1lNZTI9WZ1BF1voOWtF8I-xCpzJn2oR4VED56FcpwG6DZOdHGqAFDnEfcGDM7rXwqfffRkvjcSM6h8quOkfolIvdZce2v00lw_BT49YLg"
    }
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-windoor-primary">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row items-center">
        {/* Left Column: Fixed visual */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          {storytellingData.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                activeIndex === index ? 'opacity-40 scale-100 filter blur-0' : 'opacity-0 scale-105 filter blur-md'
              }`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover grayscale"
              />
            </div>
          ))}
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>

        {/* Right Column: Text content transitioning */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center px-6 sm:px-16 text-white bg-windoor-primary">
          <div className="max-w-md relative w-full h-48 flex items-center">
            {storytellingData.map((item, index) => (
              <div
                key={index}
                className={`absolute w-full transition-all duration-1000 ease-in-out transform ${
                  activeIndex === index
                    ? 'opacity-100 translate-y-0 filter blur-0 pointer-events-auto'
                    : 'opacity-0 translate-y-12 filter blur-[10px] pointer-events-none'
                }`}
              >
                <span className="font-windoor-main text-xs uppercase tracking-[0.2em] text-windoor-secondary mb-2 block">
                  0{index + 1} / Performance
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-windoor-main leading-tight mb-4 uppercase">
                  {item.title}
                </h2>
                <p className="text-sm text-windoor-structural-grey leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinnedStorytelling;
