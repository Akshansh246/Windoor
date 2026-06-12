import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'
import { brands } from '../data/partnersData'

const VideoReveal = ({ src }) => {
    const containerRef = useRef(null)
    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={containerRef}
            className={`image-reveal-container h-full w-full ${isIntersecting ? 'active' : ''}`}
        >
            <video
                src={src}
                className="image-reveal-img w-full h-full object-cover"
                muted
                autoPlay
                loop
                playsInline
            />
        </div>
    )
}

const AboutPage = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            const hash = window.location.hash
            if (hash) {
                const element = document.getElementById(hash.substring(1))
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
            }
        }, 300)
        return () => clearTimeout(timer)
    }, [])

    return (
        <main className="pt-18">

            {/* Hero Section */}
            <section className="max-w-360 mx-auto px-6 sm:px-16 pt-20 sm:pt-28 lg:pt-32 mb-16 sm:mb-28 lg:mb-40">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end">
                    <div className="md:col-span-8">
                        <TextReveal mode="words">
                            <span className="font-windoor-main uppercase tracking-[0.2em] text-xs text-windoor-secondary mb-4 sm:mb-8 block">Est. 1989</span>
                        </TextReveal>
                        <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-bold font-windoor-main leading-tight mb-6 sm:mb-12">
                            <TextReveal mode="words" delay={0.2} speed={0.06}>
                                Defining the threshold between architecture and atmosphere for 35 years.
                            </TextReveal>
                        </h1>
                    </div>
                    <div className="md:col-span-4 pb-4">
                        <TextReveal mode="block" delay={0.5}>
                            <p className="text-base sm:text-lg text-windoor-text-muted leading-relaxed">
                                Windoor began with a single vision: to dissolve the boundaries of the traditional home. Today, we are the vanguard of architectural glazing, blending structural integrity with pure aesthetic transparency.
                            </p>
                        </TextReveal>
                    </div>
                </div>

                <div className="mt-10 sm:mt-20 relative overflow-hidden group aspect-video sm:aspect-21/9" data-cursor="view">
                    <VideoReveal src="/Keller.mov" />
                    <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 bg-windoor-background p-4 sm:p-8 border border-windoor-secondary max-w-50 sm:max-w-xs z-10">
                        <p className="font-windoor-main text-windoor-primary uppercase text-xs leading-tight">
                            Where architecture meets the horizon. Discover the ultra-slim profile systems by Keller minimal windows.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our System Portfolios */}
            <section className="bg-windoor-background text-windoor-primary py-16 sm:py-24 lg:py-40 border-t border-windoor-structural-grey/40">
                <div className="max-w-360 mx-auto px-6 sm:px-16">
                    <div className="text-center mb-12 sm:mb-24">
                        <TextReveal mode="words">
                            <span className="font-windoor-main uppercase tracking-[0.2em] text-xs text-windoor-secondary mb-4 block">Strategic Partnerships</span>
                        </TextReveal>
                        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main text-windoor-primary">
                            <TextReveal mode="words" delay={0.2}>
                                Curated Global Excellence
                            </TextReveal>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                        {brands.map((brand) => {
                            const gridClass = brand.id === 'tostem' 
                                ? 'col-span-12 lg:col-span-5' 
                                : brand.id === 'keller' 
                                    ? 'col-span-12 lg:col-span-7' 
                                    : brand.id === 'facade-systems' 
                                        ? 'col-span-12 lg:col-span-8' 
                                        : 'col-span-12 lg:col-span-4'

                            return (
                                <div 
                                    key={brand.id} 
                                    id={brand.id}
                                    className={`${gridClass} border border-windoor-secondary/35 bg-white premium-card p-6 sm:p-8 flex flex-col justify-between group overflow-hidden`} 
                                    data-cursor="explore"
                                >
                                    <div className="flex flex-col h-full justify-between gap-4 bg-transparent">
                                        {/* Image */}
                                        <div className="relative aspect-[3/2] overflow-hidden border border-windoor-secondary/20 bg-windoor-container-low shrink-0">
                                            <ImageReveal src={brand.img} alt={brand.name} aspectClass="h-full w-full" />
                                            <div className="absolute top-4 left-4 bg-white/95 text-windoor-primary backdrop-blur-sm px-3 py-1.5 border border-windoor-secondary/40 z-10">
                                                <span className="font-windoor-main text-[10px] uppercase tracking-wider">{brand.subtitle}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Text Content */}
                                        <div className="space-y-4 flex-grow pt-4 bg-transparent">
                                            <h3 className={`text-xl sm:text-2xl font-bold uppercase tracking-tight text-windoor-primary font-windoor-main ${brand.style}`}>
                                                {brand.name}
                                            </h3>
                                            <p className="text-sm text-windoor-text-muted leading-relaxed">{brand.desc}</p>
                                        </div>
                                        
                                        {/* Action link */}
                                        <div className="pt-6 border-t border-windoor-secondary/35 mt-6 flex justify-between items-center bg-transparent shrink-0">
                                            <Link className="font-windoor-main text-xs uppercase tracking-widest text-windoor-primary hover:text-windoor-secondary transition-colors border-b border-windoor-primary pb-0.5" to={brand.href}>
                                                {brand.link} →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 sm:py-32 lg:py-40 text-center max-w-2xl mx-auto px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-windoor-main mb-8 sm:mb-12">
                    <TextReveal mode="words">
                        Start your architectural journey.
                    </TextReveal>
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                    <Link to="/contact" className="btn font-windoor-main text-xs px-8 sm:px-10 py-4 sm:py-5 uppercase tracking-widest text-center flex items-center justify-center">Request a Consultation</Link>
                    <Link to="/products" className="border-2 border-windoor-primary text-windoor-primary font-windoor-main text-xs px-8 sm:px-10 py-4 sm:py-5 uppercase tracking-widest hover:bg-windoor-primary hover:text-white transition-all text-center flex items-center justify-center">Explore Products</Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default AboutPage
