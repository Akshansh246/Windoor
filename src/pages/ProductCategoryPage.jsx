import { useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'
import useSEO from '../hooks/useSEO'
import { productCategories } from '../data/productsData'

const ProductCategoryPage = () => {
    const { category } = useParams()

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
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [category])

    // Update SEO dynamically
    useSEO({
        title: `${currentCategory.title} | Premium Architectural Glazing - Windoor`,
        description: currentCategory.introText
    })

    return (
        <main className="bg-windoor-background text-windoor-primary min-h-screen">
            {/* SECTION 1 — HERO */}
            <section className="relative w-full h-[85vh] sm:h-screen overflow-hidden flex items-end">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={currentCategory.heroImage} 
                        alt={currentCategory.title} 
                        className="w-full h-full object-cover grayscale brightness-[0.7]" 
                    />
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
            </section>

            {/* PRODUCT STORY SECTIONS */}
            <div className="w-full max-w-360 mx-auto px-6 sm:px-16 py-20 sm:py-32 space-y-24 sm:space-y-40">
                {currentCategory.sections.map((section, idx) => {
                    if (section.type === 'intro') {
                        const isLeft = section.layout === 'left'
                        return (
                            <section 
                                key={idx} 
                                className={`grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center`}
                            >
                                <div className={`md:col-span-6 ${isLeft ? 'order-1' : 'order-1 md:order-2'}`}>
                                    <span className="font-windoor-main text-xs uppercase tracking-widest text-windoor-secondary mb-4 block">Overview</span>
                                    <h2 className="text-2xl sm:text-4xl font-bold font-windoor-main text-windoor-primary mb-4 leading-tight">
                                        {section.title}
                                    </h2>
                                    <p className="text-sm sm:text-base text-windoor-secondary leading-relaxed font-windoor-main">
                                        {section.text}
                                    </p>
                                </div>
                                <div className={`md:col-span-6 ${isLeft ? 'order-2' : 'order-2 md:order-1'} aspect-[4/3] overflow-hidden border border-windoor-secondary`}>
                                    <ImageReveal src={section.img} alt={section.title} aspectClass="h-full w-full" />
                                </div>
                            </section>
                        )
                    }

                    if (section.type === 'break') {
                        return (
                            <section key={idx} className="w-full py-6 sm:py-10">
                                <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                                    <img 
                                        src={section.img} 
                                        alt="Architectural break scene" 
                                        className="w-full h-full object-cover grayscale" 
                                    />
                                </div>
                            </section>
                        )
                    }

                    if (section.type === 'story') {
                        // Alternate layouts throughout the page
                        const isEven = idx % 2 === 0
                        return (
                            <section 
                                key={idx} 
                                className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center"
                            >
                                <div className={`md:col-span-7 ${isEven ? 'order-1' : 'order-1 md:order-2'} aspect-[4/3] overflow-hidden border border-windoor-secondary`}>
                                    <ImageReveal src={section.img} alt="Product story highlight" aspectClass="h-full w-full" />
                                </div>
                                <div className={`md:col-span-5 ${isEven ? 'order-2' : 'order-2 md:order-1'} flex flex-col justify-center`}>
                                    <div className="w-12 h-[1px] bg-windoor-primary mb-6" />
                                    <p className="text-base sm:text-lg text-windoor-secondary font-windoor-main leading-relaxed italic">
                                        "{section.text}"
                                    </p>
                                </div>
                            </section>
                        )
                    }

                    return null
                })}
            </div>

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

            <Footer />
        </main>
    )
}

export default ProductCategoryPage
