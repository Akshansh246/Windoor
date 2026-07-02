import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'
import useSEO from '../hooks/useSEO'
import { productCategories } from '../data/productsData'

const ProductCategoryPage = () => {
    const { category } = useParams()
    const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 })

    const currentIdx = productCategories.findIndex(c => c.slug === category)
    
    // Redirect if category doesn't exist
    if (currentIdx === -1) {
        return <Navigate to="/products" replace />
    }

    const currentCategory = productCategories[currentIdx]

    // Navigation logic (next & prev)
    const prevIdx = (currentIdx - 1 + productCategories.length) % productCategories.length
    const nextIdx = (currentIdx + 1) % productCategories.length
    const prevCategory = productCategories[prevIdx]
    const nextCategory = productCategories[nextIdx]

    // Scroll to top on page load/change
    // Collect all section images for lightbox navigation
    const sectionImages = currentCategory.sections
        .filter(section => section.type !== 'break' && !section.video && section.img)
        .map((section) => ({
            src: section.img,
            label: section.title || 'Product highlight'
        }))

    const openLightbox = (imageSrc) => {
        const index = sectionImages.findIndex(img => img.src === imageSrc)
        if (index !== -1) {
            setLightbox({ isOpen: true, index })
        }
    }

    const closeLightbox = () => {
        setLightbox({ isOpen: false, index: 0 })
    }

    const nextImage = (e) => {
        if (e) e.stopPropagation()
        setLightbox((prev) => ({
            ...prev,
            index: (prev.index + 1) % sectionImages.length
        }))
    }

    const prevImage = (e) => {
        if (e) e.stopPropagation()
        setLightbox((prev) => ({
            ...prev,
            index: (prev.index - 1 + sectionImages.length) % sectionImages.length
        }))
    }

    // Scroll to top on page load/change
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [category])

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (!lightbox.isOpen) return

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                nextImage()
            } else if (e.key === 'ArrowLeft') {
                prevImage()
            } else if (e.key === 'Escape') {
                closeLightbox()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [lightbox.isOpen])

    // Update SEO dynamically
    useSEO({
        title: `${currentCategory.title} | Premium Architectural Glazing - Windoor`,
        description: currentCategory.introText
    })

    return (
        <main className="bg-windoor-background text-windoor-primary min-h-screen">
            {/* SECTION 1 — HERO */}
            <section className="relative w-full h-[85vh] sm:h-screen overflow-hidden flex items-end">
                {/* Hero Background Image or Video */}
                <div className="absolute inset-0 z-0">
                    {currentCategory.heroVideo ? (
                        <video 
                            src={currentCategory.heroVideo} 
                            autoPlay muted loop playsInline
                            className="w-full h-full object-cover brightness-[0.7]" 
                        />
                    ) : (
                        <img 
                            src={currentCategory.heroImage} 
                            alt={currentCategory.title} 
                            className="w-full h-full object-cover brightness-[0.7]" 
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                
                {/* Hero Overlay Content */}
                <div className="relative z-10 w-full max-w-360 mx-auto px-6 sm:px-16 pb-20 sm:pb-32 text-white">
                    <div className="max-w-3xl">
                        <span className="font-windoor-main uppercase tracking-[0.25em] text-xs text-white/70 mb-4 block">
                            {currentCategory.label}
                        </span>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-windoor-main leading-tight mb-6">
                            {currentCategory.title}
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-white/80 font-windoor-main leading-relaxed max-w-2xl">
                            {currentCategory.introText}
                        </p>
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
                    <span className="font-windoor-main uppercase tracking-[0.2em] text-[10px] text-white/50">Scroll</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50">
                        <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </section>

            {/* PRODUCT STORY SECTIONS — Alternating Layouts */}
            <div className="w-full max-w-360 mx-auto px-6 sm:px-16 py-20 sm:py-32 space-y-24 sm:space-y-40">
                {currentCategory.sections
                    .filter(section => section.type !== 'break')
                    .map((section, idx) => {
                    const isEven = idx % 2 === 0
                    return (
                        <section 
                            key={idx} 
                            className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center"
                        >
                            <div className={`md:col-span-7 ${isEven ? 'order-1' : 'order-1 md:order-2'} aspect-[4/3] overflow-hidden border border-windoor-secondary`}>
                                {section.video ? (
                                    <video 
                                        src={section.video} 
                                        autoPlay muted loop playsInline
                                        className="h-full w-full object-cover" 
                                    />
                                ) : (
                                    <div 
                                        onClick={() => openLightbox(section.img)}
                                        className="h-full w-full cursor-zoom-in"
                                    >
                                        <ImageReveal src={section.img} alt={section.title || 'Product highlight'} aspectClass="h-full w-full" />
                                    </div>
                                )}
                            </div>
                            <div className={`md:col-span-5 ${isEven ? 'order-2' : 'order-2 md:order-1'} flex flex-col justify-center`}>
                                <div className="w-12 h-[1px] bg-windoor-primary mb-6" />
                                {section.title && (
                                    <h2 className="text-2xl sm:text-3xl font-bold font-windoor-main text-windoor-primary mb-4 leading-tight">
                                        {section.title}
                                    </h2>
                                )}
                                <p className="text-base sm:text-lg text-windoor-secondary font-windoor-main leading-relaxed italic">
                                    "{section.text}"
                                </p>
                            </div>
                        </section>
                    )
                })}
            </div>

            {/* BOTTOM — Installation / Usage Showcase */}
            {currentCategory.bottomMedia && currentCategory.bottomMedia.src && (
                <section className="relative w-full h-[60vh] sm:h-[75vh] overflow-hidden">
                    {currentCategory.bottomMedia.type === 'video' ? (
                        <video 
                            src={currentCategory.bottomMedia.src} 
                            autoPlay muted loop playsInline
                            className="w-full h-full object-cover brightness-[0.75]" 
                        />
                    ) : (
                        <img 
                            src={currentCategory.bottomMedia.src} 
                            alt={`${currentCategory.title} — Installation & Usage`} 
                            className="w-full h-full object-cover brightness-[0.75]" 
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full px-6 sm:px-16 pb-16 sm:pb-24 z-10">
                        <div className="max-w-360 mx-auto">
                            <span className="font-windoor-main uppercase tracking-[0.25em] text-xs text-white/60 mb-3 block">
                                Installation & Application
                            </span>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-windoor-main text-white leading-tight">
                                See It In Action
                            </h2>
                        </div>
                    </div>
                </section>
            )}

            {/* PREVIOUS / NEXT NAVIGATION */}
            <div className="w-full border-t border-windoor-structural-grey/40 bg-windoor-background py-16 sm:py-24">
                <div className="max-w-360 mx-auto px-6 sm:px-16 flex justify-between items-center">
                    <Link 
                        to={`/products/${prevCategory.slug}`}
                        className="group flex flex-col items-start gap-1 sm:gap-2 uppercase text-left decoration-none"
                    >
                        <span className="font-windoor-main text-[10px] tracking-widest text-windoor-secondary group-hover:text-windoor-primary transition-colors">← PREVIOUS</span>
                        <span className="font-windoor-main font-bold text-sm sm:text-lg text-windoor-primary group-hover:-translate-x-1 transition-transform">
                            {prevCategory.title}
                        </span>
                    </Link>

                    <div className="w-[1px] h-12 bg-windoor-structural-grey/40 hidden sm:block" />

                    <Link 
                        to={`/products/${nextCategory.slug}`}
                        className="group flex flex-col items-end gap-1 sm:gap-2 uppercase text-right decoration-none"
                    >
                        <span className="font-windoor-main text-[10px] tracking-widest text-windoor-secondary group-hover:text-windoor-primary transition-colors">NEXT →</span>
                        <span className="font-windoor-main font-bold text-sm sm:text-lg text-windoor-primary group-hover:translate-x-1 transition-transform">
                            {nextCategory.title}
                        </span>
                    </Link>
                </div>
            </div>

            {/* Lightbox / Fullscreen Preview Modal */}
            {lightbox.isOpen && sectionImages.length > 0 && (
                <div 
                    className="fixed inset-0 bg-neutral-950/98 z-[99999] flex flex-col justify-center items-center p-4 md:p-8 cursor-zoom-out select-none"
                    onClick={closeLightbox}
                >
                    {/* Top bar with counter and Close */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[100000]">
                        <div className="text-white/60 font-windoor-main text-xs uppercase tracking-widest bg-neutral-900/40 px-3 py-1.5 border border-white/5 backdrop-blur-sm select-none">
                            {String(lightbox.index + 1).padStart(2, '0')} / {String(sectionImages.length).padStart(2, '0')}
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
                    {sectionImages.length > 1 && (
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
                            src={sectionImages[lightbox.index].src} 
                            alt={sectionImages[lightbox.index].label} 
                            className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain select-none border border-white/10 shadow-2xl transition-all duration-300"
                            key={lightbox.index}
                        />
                    </div>
                    
                    {/* Label/Title */}
                    {sectionImages[lightbox.index].label && (
                        <p className="text-white/80 font-windoor-main text-[11px] md:text-xs uppercase tracking-[0.2em] mt-6 bg-neutral-900/40 border border-white/5 px-4 py-2 backdrop-blur-sm text-center max-w-md">
                            {sectionImages[lightbox.index].label}
                        </p>
                    )}
                </div>
            )}

            <Footer />
        </main>
    )
}

export default ProductCategoryPage
