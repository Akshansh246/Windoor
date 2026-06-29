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
        width: 420,
        height: 350,
        cardDistance: 50,
        verticalDistance: 60
    })

    useEffect(() => {
        const updateLayout = () => {
            const w = window.innerWidth
            if (w < 480) {
                setLayoutConfig({
                    width: 270,
                    height: 230,
                    cardDistance: 25,
                    verticalDistance: 35
                })
            } else if (w < 768) {
                setLayoutConfig({
                    width: 330,
                    height: 280,
                    cardDistance: 35,
                    verticalDistance: 45
                })
            } else {
                setLayoutConfig({
                    width: 420,
                    height: 350,
                    cardDistance: 50,
                    verticalDistance: 60
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
        <main className="bg-windoor-background min-h-screen flex flex-col justify-between">
            {/* Products Main View */}
            <div className="flex-grow max-w-360 mx-auto px-6 sm:px-16 w-full pt-24 sm:pt-40 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center min-h-[60vh]">
                    
                    {/* Left Column: Heading and Description */}
                    <div className="lg:col-span-6 space-y-6 text-left">
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
                    <div className="lg:col-span-6 flex justify-center items-center relative min-h-[350px] sm:min-h-[480px] lg:min-h-[550px] w-full">
                        <div 
                            className="relative flex items-center justify-center"
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
                                {productCategories.map((cat, i) => (
                                    <Card 
                                        key={cat.slug} 
                                        className="cursor-pointer overflow-hidden border border-windoor-structural-grey/35 shadow-xl transition-all duration-300"
                                        style={{ 
                                            borderRadius: "16px", 
                                            background: "#ffffff"
                                        }}
                                    >
                                        <div className="w-full h-full relative group">
                                            <img 
                                                src={cat.heroImage} 
                                                alt={cat.title} 
                                                className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" 
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
                                    </Card>
                                ))}
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
