import { useNavigate, Link } from 'react-router'
import CardSwap, { Card } from '../components/CardSwap'
import { productCategories } from '../data/productsData'
import useSEO from '../hooks/useSEO'
import Footer from '../components/Footer'

import { useState, useEffect } from 'react'

const ProductsPage = () => {
    const navigate = useNavigate()

    useSEO({
        title: "Architectural Systems & Product Categories - Windoor",
        description: "Explore our collection of sliding systems, minimalist casements, and ventilation solutions designed to integrate seamlessly into modern luxury architecture."
    })

    const [layoutConfig, setLayoutConfig] = useState({
        width: 460,
        height: 560,
        cardDistance: 45,
        verticalDistance: 45
    })

    useEffect(() => {
        const updateLayout = () => {
            const w = window.innerWidth
            if (w < 480) {
                setLayoutConfig({
                    width: 260,
                    height: 320,
                    cardDistance: 25,
                    verticalDistance: 30
                })
            } else if (w < 768) {
                setLayoutConfig({
                    width: 320,
                    height: 400,
                    cardDistance: 35,
                    verticalDistance: 40
                })
            } else if (w < 1280) {
                setLayoutConfig({
                    width: 380,
                    height: 480,
                    cardDistance: 40,
                    verticalDistance: 40
                })
            } else {
                setLayoutConfig({
                    width: 460,
                    height: 560,
                    cardDistance: 45,
                    verticalDistance: 45
                })
            }
        }
        updateLayout()
        window.addEventListener('resize', updateLayout)
        return () => window.removeEventListener('resize', updateLayout)
    }, [])

    const handleCardClick = (idx) => {
        const category = productCategories[idx]
        if (category) {
            navigate(`/products/${category.slug}`)
        }
    }

    return (
        <main className="bg-windoor-background min-h-screen flex flex-col justify-between overflow-x-hidden">
            {/* Products Main View */}
            <div className="flex-grow max-w-360 mx-auto px-6 sm:px-16 w-full flex items-center min-h-[calc(100vh-80px)] py-14 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center w-full">
                    
                    {/* Left Column: Heading and Description */}
                    <div className="lg:col-span-7 space-y-6 text-left lg:self-start lg:pt-12">
                        <span 
                            className="font-windoor-main uppercase block tracking-[0.25em]"
                            style={{ fontSize: "11px", color: "rgba(11, 12, 12, 0.45)" }}
                        >
                            ✦ ARCHITECTURAL SYSTEMS
                        </span>
                        
                        <h1 
                            className="m-0 leading-[1.1] text-windoor-primary uppercase font-bold"
                            style={{ 
                                fontSize: "clamp(32px, 3.8vw, 56px)",
                                tracking: "-0.02em"
                            }}
                        >
                            Our Products
                        </h1>
                        
                        <p className="font-windoor-main text-windoor-secondary text-sm sm:text-base leading-relaxed max-w-lg mt-4">
                            Discover high-performance minimal frame window and sliding systems, precision-engineered casements, and custom ventilation options built for transparency, durability, and luxury living.
                        </p>
 
                        {/* Interactive Text Fallback Menu */}
                        <div className="space-y-4 pt-8 max-w-md">
                            {productCategories.map((cat, i) => (
                                <Link
                                    key={cat.slug}
                                    to={`/products/${cat.slug}`}
                                    className="flex items-center justify-between border-b border-windoor-structural-grey/30 pb-3 group text-decoration-none"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="font-windoor-main text-[10px] text-windoor-secondary tracking-widest">0{i + 1}</span>
                                        <span className="font-windoor-main font-bold uppercase text-xs sm:text-sm text-windoor-primary group-hover:text-windoor-primary transition-colors">
                                            {cat.title}
                                        </span>
                                    </div>
                                    <span className="text-windoor-secondary group-hover:translate-x-2 transition-transform duration-300 text-sm">→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
 
                    {/* Right Column: CardSwap Stack */}
                    <div className="lg:col-span-5 flex lg:justify-start justify-center items-center relative min-h-[350px] sm:min-h-[480px] lg:min-h-[600px] xl:min-h-[700px] w-full">
                        <div 
                            className="relative flex items-center justify-center lg:-translate-x-[5%] xl:-translate-x-[10%] transition-transform duration-500"
                            style={{ width: `${layoutConfig.width}px`, height: `${layoutConfig.height}px` }}
                        >
                            <CardSwap
                                width={layoutConfig.width}
                                height={layoutConfig.height}
                                cardDistance={layoutConfig.cardDistance}
                                verticalDistance={layoutConfig.verticalDistance}
                                delay={4500}
                                pauseOnHover={true}
                                onCardClick={handleCardClick}
                                skewAmount={4}
                                easing="elastic"
                            >
                                {productCategories.map((cat, i) => {
                                    const cardImage = cat.heroImage || (cat.sections.find(s => s.img)?.img) || ""
                                    
                                    // Premium browser-like window header icons based on slug
                                    const renderCardIcon = () => {
                                        switch (cat.slug) {
                                            case 'sliders':
                                                return (
                                                    <svg className="w-3.5 h-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                                    </svg>
                                                )
                                            case 'casements':
                                                return (
                                                    <svg className="w-3.5 h-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5m16.5-16.5v16.5m-16.5-16.5h16.5m-16.5 16.5h16.5M12 3.75v16.5" />
                                                    </svg>
                                                )
                                            case 'ventilation':
                                                return (
                                                    <svg className="w-3.5 h-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                                    </svg>
                                                )
                                            case 'interior-solutions':
                                                return (
                                                    <svg className="w-3.5 h-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                    </svg>
                                                )
                                            default:
                                                return <span className="text-white/40 text-xs">✦</span>
                                        }
                                    }

                                    return (
                                    <Card 
                                        key={cat.slug} 
                                        className="cursor-pointer overflow-hidden border border-windoor-structural-grey/35 shadow-xl transition-all duration-300"
                                        style={{ 
                                            borderRadius: "16px", 
                                            background: "#161617"
                                        }}
                                    >
                                        <div className="w-full h-full relative group flex flex-col">
                                            {/* Premium Header Bar matching screenshot style */}
                                            <div className="h-12 w-full bg-neutral-900 border-b border-white/5 flex items-center px-5 gap-3 shrink-0 rounded-t-2xl select-none">
                                                {renderCardIcon()}
                                                <span className="text-white/80 font-windoor-main uppercase text-[10px] tracking-[0.2em] font-bold">
                                                    {cat.title}
                                                </span>
                                            </div>
                                            
                                            {/* Image Area */}
                                            <div className="relative flex-grow overflow-hidden">
                                                <img 
                                                    src={cardImage} 
                                                    alt={cat.title} 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                                                <div className="absolute bottom-6 left-6 text-white text-left pointer-events-none">
                                                    <span className="font-windoor-main text-[9px] uppercase tracking-widest text-white/50 mb-1.5 block">0{i + 1} / CATEGORY</span>
                                                    <h3 className="font-windoor-main text-base sm:text-lg font-bold uppercase m-0 tracking-wide text-white leading-tight">
                                                        {cat.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="font-windoor-main text-[9px] tracking-widest uppercase text-white/80">EXPLORE</span>
                                                        <span className="text-white text-xs">→</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    )})}
                            </CardSwap>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </main>
    )
}

export default ProductsPage
