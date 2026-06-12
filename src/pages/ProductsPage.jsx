import { useRef, useState, useEffect } from 'react'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'
import { sliders, casements, ventilation } from '../data/productsData'

const getGalleryLayout = (total) => {
    if (total <= 0) return [];
    
    // Base repeating bento patterns of spans and aspects
    const basePattern = [
        { span: 8, aspect: "aspect-video" },
        { span: 4, aspect: "aspect-square" },
        { span: 6, aspect: "aspect-video" },
        { span: 6, aspect: "aspect-video" },
        { span: 4, aspect: "aspect-square" },
        { span: 4, aspect: "aspect-square" },
        { span: 4, aspect: "aspect-square" },
        { span: 12, aspect: "aspect-video sm:aspect-[21/9]" }
    ];
    
    const layout = [];
    let currentRowSpan = 0;
    
    for (let i = 0; i < total; i++) {
        const patternItem = basePattern[i % basePattern.length];
        let span = patternItem.span;
        let aspect = patternItem.aspect;
        
        // If this is the last element, we must ensure it doesn't leave an incomplete row
        if (i === total - 1) {
            // How many columns are already filled in the current row?
            const currentPositionInRow = currentRowSpan % 12;
            
            if (currentPositionInRow > 0) {
                // The current row is incomplete.
                // Stretch the last element to fill the remaining columns of this row.
                const remaining = 12 - currentPositionInRow;
                span = remaining;
                if (remaining === 4) {
                    aspect = "aspect-square";
                } else if (remaining === 6 || remaining === 8) {
                    aspect = "aspect-video";
                } else {
                    aspect = "aspect-video sm:aspect-[21/9]";
                }
            } else {
                // The current row is complete, so this last element starts a new row.
                // To avoid a single small card on a new row, we make it fill the entire width (12 columns).
                span = 12;
                aspect = "aspect-video sm:aspect-[21/9]";
            }
        }
        
        layout.push({
            span: span === 12 ? "col-span-12" : `col-span-12 md:col-span-${span}`,
            aspect: aspect
        });
        
        currentRowSpan += span;
    }
    
    return layout;
};

const renderGallery = (images, openLightbox) => {
    if (!images || images.length === 0) return null;
    const layout = getGalleryLayout(images.length);
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {images.map((img, index) => {
                const itemLayout = layout[index] || { span: "col-span-12", aspect: "aspect-video" };
                return (
                    <div 
                        key={index}
                        className={`${itemLayout.span} ${itemLayout.aspect} overflow-hidden border border-windoor-secondary bg-windoor-container-low cursor-pointer premium-card relative group`}
                        onClick={() => openLightbox(images, index)}
                        data-cursor="view"
                    >
                        <ImageReveal src={img.src} alt={img.label} aspectClass="h-full w-full" delay={(index % 4) * 0.1} />
                        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-1.5 border border-windoor-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-nowrap select-none pointer-events-none">
                            <span className="font-windoor-main text-[10px] uppercase tracking-widest">{img.label}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const ProductsPage = () => {
    const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });
    const slidersRef = useRef(null)
    const casementsRef = useRef(null)
    const ventilationRef = useRef(null)

    const [activeSection, setActiveSection] = useState('sliders')

    const openLightbox = (images, index) => {
        setLightbox({ isOpen: true, images, index });
    };

    const closeLightbox = () => {
        setLightbox({ isOpen: false, images: [], index: 0 });
    };

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        setLightbox((prev) => ({
            ...prev,
            index: (prev.index + 1) % prev.images.length
        }));
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        setLightbox((prev) => ({
            ...prev,
            index: (prev.index - 1 + prev.images.length) % prev.images.length
        }));
    };

    useEffect(() => {
        if (!lightbox.isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightbox.isOpen, lightbox.images.length]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 250
            const slidersTop = slidersRef.current?.offsetTop || 0
            const casementsTop = casementsRef.current?.offsetTop || 0
            const ventilationTop = ventilationRef.current?.offsetTop || 0

            if (scrollPos >= ventilationTop) {
                setActiveSection('ventilation')
            } else if (scrollPos >= casementsTop) {
                setActiveSection('casements')
            } else {
                setActiveSection('sliders')
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            const hash = window.location.hash;
            if (hash === '#sliders' && slidersRef.current) {
                scrollToSection(slidersRef);
            } else if (hash === '#casements' && casementsRef.current) {
                scrollToSection(casementsRef);
            } else if (hash === '#ventilation' && ventilationRef.current) {
                scrollToSection(ventilationRef);
            }
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (ref) => {
        if (ref.current) {
            const offset = 140
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = ref.current.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    };

    return (
        <main className="pt-18">

            {/* Hero */}
            <header className="px-6 sm:px-16 max-w-360 mx-auto pt-20 sm:pt-28 lg:pt-32 mb-12 sm:mb-20">
                <TextReveal mode="words">
                    <span className="font-windoor-main uppercase tracking-widest text-xs text-windoor-secondary block mb-4">Architectural Solutions</span>
                </TextReveal>
                <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-bold font-windoor-main max-w-4xl text-windoor-primary leading-tight">
                    <TextReveal mode="words" delay={0.2} speed={0.06}>
                        Architectural Products Portfolio.
                    </TextReveal>
                </h1>
                <TextReveal mode="block" delay={0.5}>
                    <p className="text-base sm:text-lg text-windoor-secondary max-w-2xl mt-4 sm:mt-6">
                        Explore our curated gallery of primary architectural categories. Built for aesthetic transparency and premium minimal design.
                    </p>
                </TextReveal>
            </header>

            {/* Category Sub-navigation */}
            <div className="sticky top-[52px] sm:top-[64px] z-40 bg-windoor-background/80 backdrop-blur-md border-b border-windoor-structural-grey/30 py-4 px-6 sm:px-16 transition-all duration-300">
                <div className="max-w-360 mx-auto flex flex-wrap gap-3 sm:gap-4 font-windoor-main text-[10px] sm:text-xs uppercase tracking-widest">
                    <button 
                        onClick={() => scrollToSection(slidersRef)} 
                        className={`transition-all duration-300 cursor-pointer border px-4 sm:px-5 py-2 sm:py-2.5 ${
                            activeSection === 'sliders' 
                                ? 'bg-windoor-primary text-white border-windoor-primary font-bold shadow-sm' 
                                : 'text-windoor-secondary border-windoor-structural-grey/40 hover:border-windoor-primary bg-white'
                        }`}
                    >
                        01 / Sliders ↓
                    </button>
                    <button 
                        onClick={() => scrollToSection(casementsRef)} 
                        className={`transition-all duration-300 cursor-pointer border px-4 sm:px-5 py-2 sm:py-2.5 ${
                            activeSection === 'casements' 
                                ? 'bg-windoor-primary text-white border-windoor-primary font-bold shadow-sm' 
                                : 'text-windoor-secondary border-windoor-structural-grey/40 hover:border-windoor-primary bg-white'
                        }`}
                    >
                        02 / Casements ↓
                    </button>
                    <button 
                        onClick={() => scrollToSection(ventilationRef)} 
                        className={`transition-all duration-300 cursor-pointer border px-4 sm:px-5 py-2 sm:py-2.5 ${
                            activeSection === 'ventilation' 
                                ? 'bg-windoor-primary text-white border-windoor-primary font-bold shadow-sm' 
                                : 'text-windoor-secondary border-windoor-structural-grey/40 hover:border-windoor-primary bg-white'
                        }`}
                    >
                        03 / Ventilation ↓
                    </button>
                </div>
            </div>

            {/* Products Main Container */}
            <div className="px-6 sm:px-16 max-w-360 mx-auto pb-16 sm:pb-32 space-y-20 sm:space-y-32">

                {/* Section 1: Sliders */}
                <section ref={slidersRef} className="space-y-12 sm:space-y-16">
                    <div className="border-b border-windoor-primary/20 pb-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-windoor-main text-windoor-primary">01 / SLIDERS</h2>
                        <p className="text-sm text-windoor-secondary mt-2">Precision-engineered sliding systems offering smooth horizontal movement and endless transparency.</p>
                    </div>

                    <div className="space-y-16 sm:space-y-24">
                        {sliders.map((sub, idx) => (
                            <div key={sub.title} className="space-y-6 sm:space-y-8">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                    <div className="max-w-xl">
                                        <span className="font-windoor-main text-xs uppercase text-windoor-secondary tracking-[0.2em] mb-2 block">Series 0{idx + 1}</span>
                                        <h3 className="text-lg sm:text-xl font-bold font-windoor-main text-windoor-primary uppercase">{sub.title}</h3>
                                    </div>
                                    <p className="text-sm text-windoor-secondary max-w-md leading-relaxed">{sub.desc}</p>
                                </div>
                                <div className="w-full">
                                    {renderGallery(sub.images, openLightbox)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2: Casements */}
                <section ref={casementsRef} className="space-y-12 sm:space-y-16">
                    <div className="border-b border-windoor-primary/20 pb-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-windoor-main text-windoor-primary">02 / CASEMENTS</h2>
                        <p className="text-sm text-windoor-secondary mt-2">Classic hinged profiles refined with modern concealed hardware and multi-point security locks.</p>
                    </div>

                    <div className="space-y-16 sm:space-y-24">
                        {casements.map((sub, idx) => (
                            <div key={sub.title} className="space-y-6 sm:space-y-8">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                    <div className="max-w-xl">
                                        <span className="font-windoor-main text-xs uppercase text-windoor-secondary tracking-[0.2em] mb-2 block">Series 0{idx + 1}</span>
                                        <h3 className="text-lg sm:text-xl font-bold font-windoor-main text-windoor-primary uppercase">{sub.title}</h3>
                                    </div>
                                    <p className="text-sm text-windoor-secondary max-w-md leading-relaxed">{sub.desc}</p>
                                </div>
                                <div className="w-full">
                                    {renderGallery(sub.images, openLightbox)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Ventilation Options */}
                <section ref={ventilationRef} className="space-y-12 sm:space-y-16">
                    <div className="border-b border-windoor-primary/20 pb-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-windoor-main text-windoor-primary">03 / VENTILATION OPTIONS</h2>
                        <p className="text-sm text-windoor-secondary mt-2">Acoustically insulated ventilation slots integrated directly into structural glazing profiles.</p>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                            <div className="max-w-xl">
                                <span className="font-windoor-main text-xs uppercase text-windoor-secondary tracking-[0.2em] mb-2 block">System Integration</span>
                                <h3 className="text-lg sm:text-xl font-bold font-windoor-main text-windoor-primary uppercase">{ventilation.title}</h3>
                            </div>
                            <p className="text-sm text-windoor-secondary max-w-md leading-relaxed">{ventilation.desc}</p>
                        </div>
                        <div className="w-full">
                            {renderGallery(ventilation.images, openLightbox)}
                        </div>
                    </div>
                </section>
            </div>

            {/* Lightbox / Fullscreen Preview Modal */}
            {lightbox.isOpen && lightbox.images.length > 0 && (
                <div 
                    className="fixed inset-0 bg-neutral-950/98 z-[99999] flex flex-col justify-center items-center p-4 md:p-8 cursor-zoom-out select-none"
                    onClick={closeLightbox}
                >
                    {/* Top bar with counter and Close */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[100000]">
                        <div className="text-white/60 font-windoor-main text-xs uppercase tracking-widest bg-neutral-900/40 px-3 py-1.5 border border-white/5 backdrop-blur-sm select-none">
                            {String(lightbox.index + 1).padStart(2, '0')} / {String(lightbox.images.length).padStart(2, '0')}
                        </div>
                        <button 
                            className="text-white/80 hover:text-white font-windoor-main text-xs uppercase tracking-widest bg-neutral-900/40 hover:bg-neutral-800/80 px-4 py-2 border border-white/10 hover:border-white/20 transition-all cursor-pointer backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeLightbox();
                            }}
                        >
                            Close ✕
                        </button>
                    </div>

                    {/* Navigation Buttons */}
                    {lightbox.images.length > 1 && (
                        <>
                            {/* Left Chevron */}
                            <button
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-neutral-900/40 hover:bg-neutral-800/80 p-3 md:p-4 border border-white/5 hover:border-white/20 transition-all cursor-pointer z-[100000] backdrop-blur-sm"
                                onClick={prevImage}
                                aria-label="Previous Image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            {/* Right Chevron */}
                            <button
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-neutral-900/40 hover:bg-neutral-800/80 p-3 md:p-4 border border-white/5 hover:border-white/20 transition-all cursor-pointer z-[100000] backdrop-blur-sm"
                                onClick={nextImage}
                                aria-label="Next Image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </>
                    )}
                    
                    {/* Main Image Container */}
                    <div 
                        className="relative max-w-full max-h-[75vh] md:max-h-[80vh] flex items-center justify-center cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={lightbox.images[lightbox.index].src} 
                            alt={lightbox.images[lightbox.index].label} 
                            className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain select-none border border-white/10 shadow-2xl transition-all duration-300"
                            key={lightbox.index}
                        />
                    </div>
                    
                    {/* Label/Title */}
                    {lightbox.images[lightbox.index].label && (
                        <p className="text-white/80 font-windoor-main text-[11px] md:text-xs uppercase tracking-[0.2em] mt-6 bg-neutral-900/40 border border-white/5 px-4 py-2 backdrop-blur-sm text-center max-w-md">
                            {lightbox.images[lightbox.index].label}
                        </p>
                    )}
                </div>
            )}

            <Footer />
        </main>
    )
}

export default ProductsPage

