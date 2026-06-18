import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import Footer from "../components/Footer"
import TextReveal from "../components/TextReveal"
import ImageReveal from "../components/ImageReveal"
import Particles from "../components/Particles"
import { sliders, casements, ventilation } from "../data/productsData"
import { projects } from "../data/projectData"
import { showrooms } from "../data/showroomData"
import { partners } from "../data/partnersData"

const ProjectImageCarousel = ({ project, index }) => {
    const images = Array.from(
        new Set(
            [
                project.img,
                project.heroImg,
                project.gallery?.main?.img,
                ...(project.gallery?.grid || []).map((g) => g.img),
            ].filter(Boolean)
        )
    )

    const [currentIdx, setCurrentIdx] = useState(0)

    useEffect(() => {
        if (images.length <= 1) return
        const timer = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % images.length)
        }, 3000 + index * 500)
        return () => clearInterval(timer)
    }, [images.length, index])

    if (images.length === 0) return null

    return (
        <div className="relative w-full h-full">
            {images.map((src, i) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        i === currentIdx ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <img
                        src={src}
                        alt={`${project.title} - view ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent z-15 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">
                    {images.map((_, i) => (
                        <span
                            key={i}
                            className={`h-1 rounded-full transition-all duration-500 bg-white ${
                                i === currentIdx ? "w-4 opacity-90" : "w-1.5 opacity-40"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const HomePage = () => {
    const [counts, setCounts] = useState({ years: 0, villas: 0, projects: 0, tostem: 0 })
    const statsRef = useRef(null)
    const partnerTrackRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const updateScrollButtons = () => {
        const container = partnerTrackRef.current
        if (!container) return
        setCanScrollLeft(container.scrollLeft > 5)
        setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 5)
    }

    useEffect(() => {
        const container = partnerTrackRef.current
        if (!container) return

        updateScrollButtons()

        const handleScroll = () => {
            updateScrollButtons()
        }

        container.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("resize", updateScrollButtons)

        // Delay updating scroll buttons to account for image load and layout settling
        const timeoutId = setTimeout(updateScrollButtons, 500)

        return () => {
            container.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", updateScrollButtons)
            clearTimeout(timeoutId)
        }
    }, [])

    const handleScrollClick = (direction) => {
        const container = partnerTrackRef.current
        if (!container) return

        const cards = container.querySelectorAll(".premium-card")
        if (cards.length === 0) return

        const cardWidth = cards[0].getBoundingClientRect().width
        const gap = parseFloat(getComputedStyle(container).gap) || 0
        const step = cardWidth + gap

        const currentScroll = container.scrollLeft
        let targetScroll

        if (direction === "left") {
            const currentIndex = Math.round(currentScroll / step)
            targetScroll = Math.max(0, (currentIndex - 1) * step)
        } else {
            const currentIndex = Math.round(currentScroll / step)
            const maxScroll = container.scrollWidth - container.clientWidth
            targetScroll = Math.min(maxScroll, (currentIndex + 1) * step)
        }

        container.scrollTo({
            left: targetScroll,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        const section = statsRef.current
        if (!section) return

        const startCounting = () => {
            const targets = { years: 35, villas: 200, projects: 100, tostem: 100 }
            const duration = 1500
            const startTime = performance.now()

            const animate = (timestamp) => {
                const progress = Math.min((timestamp - startTime) / duration, 1)
                setCounts({
                    years: Math.floor(targets.years * progress),
                    villas: Math.floor(targets.villas * progress),
                    projects: Math.floor(targets.projects * progress),
                    tostem: Math.floor(targets.tostem * progress),
                })
                if (progress < 1) requestAnimationFrame(animate)
                else setCounts(targets)
            }
            requestAnimationFrame(animate)
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) { startCounting(); observer.unobserve(section) }
                })
            },
            { threshold: 0.3 }
        )
        observer.observe(section)
        return () => observer.disconnect()
    }, [])



    return (
        <>
        <main className="flex flex-col pt-18">

            {/* ── Video section ─────────────────────────────────────────── */}
            <div className="w-full h-screen relative overflow-hidden">
                <div className="hero-video-container">
                    <video className="hero-video" muted autoPlay loop src="/mainVideo.mp4"></video>
                </div>
                
                <div className="absolute bottom-16 sm:bottom-40 w-fit font-windoor-main left-6 sm:left-16 flex flex-col gap-4 sm:gap-5 text-white max-w-[90vw] z-20">
                    <TextReveal mode="words" delay={0.1}>
                        <p className="tracking-[3px] uppercase text-[10px] sm:text-xs text-white/60">Excellence in Fenestration</p>
                    </TextReveal>
                    <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl italic leading-tight font-bold">
                        <TextReveal mode="words" delay={0.3} speed={0.06}>
                            Crafting the Finer Details of Architecture.
                        </TextReveal>
                    </h1>
                    <div className="text-xs sm:text-sm font-extralight text-white/60 max-w-md">
                        <TextReveal mode="block" delay={0.8}>
                            <p>Engineering the threshold between interior luxury and external landscapes with over 35 years of structural mastery.</p>
                        </TextReveal>
                    </div>
                    <div className="uppercase flex flex-wrap font-windoor-main text-xs gap-3 mt-4 sm:mt-7 tracking-widest">
                        <Link className="btn px-5 py-3 sm:py-4" to="/products">Explore Products</Link>
                        <Link className="bg-windoor-background text-windoor-primary backdrop-blur-lg px-5 py-3 sm:py-4 border border-windoor-primary/50 hover:bg-windoor-primary hover:text-white transition-all" to="/projects">View Projects</Link>
                    </div>
                </div>
                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-6 sm:left-16 animate-bounce z-20">
                    <svg className="text-white w-6 h-6 opacity-60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* ── About Windoor ──────────────────────────────────────────── */}
            <div className="w-full flex flex-col md:flex-row gap-10 items-center justify-center min-h-screen py-16 md:py-24 border-b border-windoor-structural-grey/40 px-6 sm:px-16">
                <div className="w-full md:w-1/2 lg:w-5/12 text-sm flex flex-col gap-6">
                    <TextReveal mode="words">
                        <p className="tracking-[3px] font-windoor-main uppercase text-xs text-windoor-text-muted">Our Legacy</p>
                    </TextReveal>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main tracking-tight">
                        <TextReveal mode="words" delay={0.2} speed={0.06}>
                            REDEFINING THE MODERN FAÇADE
                        </TextReveal>
                    </h2>
                    <TextReveal mode="block" delay={0.4}>
                        <p className="text-windoor-text-muted text-sm leading-relaxed">With over 35 years of expertise, Windoor Marketing specializes in delivering premium fenestration solutions for luxury residences and high-end architectural projects. We believe that windows and facades define the character and experience of a space.</p>
                    </TextReveal>
                    <TextReveal mode="block" delay={0.6}>
                        <p className="text-windoor-text-muted text-sm leading-relaxed">As proud partners of globally renowned brands like TOSTEM and Keller Minimal Windows, we combine Japanese precision with European elegance to help architects and homeowners bring visionary spaces to life.</p>
                    </TextReveal>
                    <Link to={'/about'} className="uppercase font-bold font-windoor-main border-b-2 border-windoor-primary w-fit hover:opacity-70 transition-opacity">Read Our Story</Link>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3" data-cursor="view">
                    <ImageReveal src="/images/logo.jpeg" alt="Windoor Architecture" aspectClass="aspect-4/5" />
                </div>
            </div>

            {/* ── Stats ─────────────────────────────────────────────────── */}
            <div ref={statsRef} className="w-full py-12 sm:py-16 px-4 sm:px-8">
                <TextReveal mode="block">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-360 mx-auto uppercase font-windoor-main">
                        <div className="text-center py-6 px-4 border border-windoor-secondary/20 bg-windoor-container-low/40 premium-card">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-windoor-primary">{counts.years}+</h2>
                            <p className="text-[10px] sm:text-xs font-windoor-main text-windoor-text-muted mt-2 tracking-wider">Years of Expertise</p>
                        </div>
                        <div className="text-center py-6 px-4 border border-windoor-secondary/20 bg-windoor-container-low/40 premium-card">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-windoor-primary">{counts.villas}+</h2>
                            <p className="text-[10px] sm:text-xs font-windoor-main text-windoor-text-muted mt-2 tracking-wider">Premium Villas Delivered</p>
                        </div>
                        <div className="text-center py-6 px-4 border border-windoor-secondary/20 bg-windoor-container-low/40 premium-card">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-windoor-primary">{counts.projects}+</h2>
                            <p className="text-[10px] sm:text-xs font-windoor-main text-windoor-text-muted mt-2 tracking-wider">Landmark Projects</p>
                        </div>
                        <div className="text-center py-6 px-4 border border-windoor-secondary/20 bg-windoor-container-low/40 premium-card">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-windoor-primary">{counts.tostem}-Yr</h2>
                            <p className="text-[10px] sm:text-xs font-windoor-main text-windoor-text-muted mt-2 tracking-wider">TOSTEM Japanese Leader</p>
                        </div>
                    </div>
                </TextReveal>
            </div>

            {/* ── Collaborations ────────────────────────────────────────── */}
            <section className="py-20 sm:py-32 md:py-40 bg-windoor-container-low border-b border-windoor-structural-grey/40 relative">
                <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                <div className="w-full flex flex-col justify-center">
                    <div className="w-full max-w-360 mx-auto px-6 sm:px-16 mb-8 sm:mb-12">
                        <TextReveal mode="words">
                            <p className="tracking-[3px] font-windoor-main uppercase text-xs text-windoor-text-muted mb-2">Collaborations</p>
                        </TextReveal>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main tracking-tight">
                            <TextReveal mode="words" delay={0.2} speed={0.06}>
                                WORLD-CLASS PARTNERS
                            </TextReveal>
                        </h2>
                    </div>
                    
                    <div 
                        className="relative w-full"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Left Arrow Button */}
                        <button
                            onClick={() => handleScrollClick("left")}
                            className={`absolute left-6 sm:left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 border border-windoor-structural-grey/60 text-windoor-primary shadow-sm transition-all duration-300 hover:bg-windoor-primary hover:text-white hover:border-windoor-primary cursor-pointer ${
                                isHovered && canScrollLeft ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                            }`}
                            aria-label="Scroll left"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Right Arrow Button */}
                        <button
                            onClick={() => handleScrollClick("right")}
                            className={`absolute right-6 sm:right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 border border-windoor-structural-grey/60 text-windoor-primary shadow-sm transition-all duration-300 hover:bg-windoor-primary hover:text-white hover:border-windoor-primary cursor-pointer ${
                                isHovered && canScrollRight ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                            }`}
                            aria-label="Scroll right"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div 
                            ref={partnerTrackRef} 
                            className="w-full overflow-x-auto flex gap-6 sm:gap-8 px-6 sm:px-16 scroll-smooth no-scrollbar scroll-pl-6 sm:scroll-pl-16"
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none"
                            }}
                        >
                            {partners.map((partner, index) => (
                                <div 
                                    key={index} 
                                    className="w-[80vw] sm:w-[45vw] md:w-[40vw] lg:w-[32vw] max-w-[480px] flex-shrink-0 border border-windoor-secondary group cursor-pointer overflow-hidden bg-white premium-card" 
                                    data-cursor="explore"
                                >
                                    <div className="h-56 sm:h-72 w-full overflow-hidden relative">
                                        <ImageReveal src={partner.img} alt={partner.title.toLowerCase()} aspectClass="h-full w-full" />
                                    </div>
                                    <div className="p-6 sm:p-10 flex flex-col gap-4 items-start bg-transparent">
                                        <div className="font-windoor-main flex justify-between w-full items-start">
                                            <div>
                                                <h4 className="text-lg sm:text-xl font-bold uppercase">{partner.title}</h4>
                                                <p className="uppercase text-xs text-windoor-text-muted">{partner.subtitle}</p>
                                            </div>
                                            <span className="text-windoor-primary text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300">↗</span>
                                        </div>
                                        <p className="text-sm text-windoor-text-muted">{partner.desc}</p>
                                        <Link to={partner.link} className="border border-windoor-primary px-5 py-2 uppercase font-windoor-main text-xs sm:text-sm cursor-pointer mt-3 hover:bg-windoor-primary hover:text-white transition-all duration-300">Learn More</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            

            {/* ── Architectural Systems ──────────────────────────────────── */}
            <section className="py-20 sm:py-32 md:py-40 bg-windoor-background">
                <div className="px-6 sm:px-16 max-w-360 mx-auto">
                    <div className="mb-12 sm:mb-20">
                        <TextReveal mode="words">
                            <p className="tracking-[3px] font-windoor-main uppercase text-xs text-windoor-text-muted mb-4">Our Expertise</p>
                        </TextReveal>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main tracking-tight">
                            <TextReveal mode="words" delay={0.2} speed={0.06}>
                                ARCHITECTURAL PRODUCTS
                            </TextReveal>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:auto-rows-[360px]">
                        {[
                            {
                                title: sliders[3]?.title || "Motorised & Minimal System",
                                desc: sliders[3]?.desc || "State-of-the-art motorized sliding systems with ultra-slim 20mm visual sightlines.",
                                img: sliders[3]?.images?.[0]?.src || "/images/Keller.jpg",
                                link: "/products#sliders",
                                isFeatured: true
                            },
                            {
                                title: casements[3]?.title || "Minimal Casements",
                                desc: casements[3]?.desc || "Concealed hinges and micro-frames designed to frame exterior landscapes seamlessly.",
                                img: casements[3]?.images?.[0]?.src || "/images/tostem_main.jpg",
                                link: "/products#casements"
                            },
                            {
                                title: sliders[1]?.title || "DGU System",
                                desc: sliders[1]?.desc || "Double Glazed Units built with advanced thermal profiles to maximize insulation.",
                                img: sliders[1]?.images?.[0]?.src || "/images/tostem_main.jpg",
                                link: "/products#sliders"
                            },
                            {
                                title: casements[2]?.title || "Grants Casements",
                                desc: casements[2]?.desc || "Luxury large-span casement systems featuring hidden friction stays and perimeter seals.",
                                img: casements[2]?.images?.[0]?.src || "/images/tostem_main.jpg",
                                link: "/products#casements"
                            },
                            {
                                title: sliders[4]?.title || "Curved Sliding System",
                                desc: sliders[4]?.desc || "Bespoke curved tracks that align with custom architectural radiuses without sacrificing smooth operation.",
                                img: sliders[4]?.images?.[0]?.src || "/images/Keller.jpg",
                                link: "/products#sliders"
                            },
                            {
                                title: ventilation.title || "Ventilation Options",
                                desc: ventilation.desc || "Acoustically buffered ventilation slots and micro-vents designed to bring natural air circulation.",
                                img: ventilation.images?.[0]?.src || "/images/facade.jpg",
                                link: "/products#ventilation"
                            }
                        ].map((prod, idx) => {
                            const gridClass = prod.isFeatured
                                ? 'col-span-12 lg:col-span-8 lg:row-span-2'
                                : 'col-span-12 md:col-span-1 lg:col-span-4'

                            return (
                                <Link 
                                    key={idx} 
                                    to={prod.link} 
                                    className={`${gridClass} group border border-windoor-secondary bg-windoor-container-low p-4 sm:p-6 flex flex-col justify-between premium-card overflow-hidden`} 
                                    data-cursor="explore"
                                >
                                    <div className="flex flex-col h-full justify-between gap-4 bg-transparent">
                                        <div className="relative overflow-hidden bg-windoor-container flex-grow aspect-[3/2] lg:aspect-auto">
                                            <ImageReveal src={prod.img} alt={prod.title} aspectClass="w-full h-full object-cover" delay={idx * 0.05} />
                                        </div>
                                        <div className="space-y-2 bg-transparent">
                                            <h4 className="font-windoor-main text-base sm:text-lg font-bold uppercase text-windoor-primary">{prod.title}</h4>
                                            <p className="text-xs sm:text-sm text-windoor-text-muted leading-relaxed line-clamp-2">{prod.desc}</p>
                                        </div>
                                        <div className="self-start font-windoor-main text-[10px] uppercase tracking-widest font-bold border-b border-windoor-primary pb-1 group-hover:pr-4 transition-all duration-300">
                                            Explore
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── Select Projects preview ───────────────────────────────── */}
            <section className="py-20 sm:py-32 md:py-40 bg-windoor-container-low border-t border-windoor-structural-grey/40">
                <div className="px-6 sm:px-16 max-w-360 mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 sm:mb-20">
                        <div className="space-y-3">
                            <TextReveal mode="words">
                                <p className="tracking-[3px] font-windoor-main uppercase text-xs text-windoor-text-muted">Portfolio</p>
                            </TextReveal>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main tracking-tight">
                                <TextReveal mode="words" delay={0.2} speed={0.06}>
                                    SELECT PROJECTS
                                </TextReveal>
                            </h2>
                        </div>
                        <Link to="/projects" className="font-windoor-main text-xs uppercase tracking-widest border-b border-windoor-primary pb-1 hover:opacity-70 transition-opacity shrink-0">View All Projects</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
                        {projects.slice(0, 3).map((p, idx) => (
                            <Link key={p.id} to={`/projects/${p.slug}`} className="group cursor-pointer block" data-cursor="explore">
                                <div className="aspect-3/4 overflow-hidden border border-windoor-secondary mb-6 sm:mb-8 relative">
                                    <ProjectImageCarousel project={p} index={idx} />
                                </div>
                                <h4 className="font-windoor-main text-base sm:text-xl font-bold uppercase">{p.title}</h4>
                                <p className="font-windoor-main text-xs uppercase text-windoor-secondary tracking-widest mt-2">{p.location} | {p.type}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Showrooms preview ─────────────────────────────────────── */}
            <section className="py-20 sm:py-32 md:py-40 bg-windoor-background border-t border-windoor-structural-grey/40">
                <div className="px-6 sm:px-16 max-w-360 mx-auto">
                    <div className="mb-12 sm:mb-20 text-center">
                        <TextReveal mode="words">
                            <p className="tracking-[3px] font-windoor-main uppercase text-xs text-windoor-text-muted mb-4">Our Presence</p>
                        </TextReveal>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main tracking-tight">
                            <TextReveal mode="words" delay={0.2} speed={0.06}>
                                OUR EXPERIENCE CENTERS
                            </TextReveal>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:auto-rows-[350px]">
                        {showrooms.map((room, idx) => {
                            const isAhmedabad = room.id === 'ahmedabad'
                            const gridClass = isAhmedabad 
                                ? 'col-span-12 lg:col-span-8 lg:row-span-2' 
                                : room.id === 'gandhinagar'
                                    ? 'col-span-12 md:col-span-1 lg:col-span-8'
                                    : 'col-span-12 md:col-span-1 lg:col-span-4'

                            return (
                                <Link 
                                    key={room.id} 
                                    to={`/showrooms#${room.id}`} 
                                    className={`${gridClass} group cursor-pointer border border-windoor-secondary bg-white p-4 sm:p-6 flex flex-col justify-between premium-card overflow-hidden`}
                                    data-cursor="view"
                                >
                                    <div className="flex flex-col h-full justify-between gap-4 bg-transparent">
                                        <div className="relative overflow-hidden bg-windoor-container flex-grow aspect-[3/2] lg:aspect-auto">
                                            {room.img ? (
                                                <ImageReveal src={room.img} alt={`${room.city} Showroom`} aspectClass="h-full w-full" delay={idx * 0.05} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-windoor-charcoal/5">
                                                    <span className="font-windoor-main text-xs uppercase tracking-wider text-windoor-secondary">Image Coming Soon</span>
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 border border-windoor-secondary/30 z-10">
                                                <span className="font-windoor-main text-[10px] uppercase tracking-wider">{room.label}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center bg-transparent">
                                            <div>
                                                <h4 className="font-windoor-main text-base sm:text-lg font-bold uppercase text-windoor-primary">{room.city}</h4>
                                                <p className="text-[10px] sm:text-xs text-windoor-secondary uppercase font-windoor-main tracking-widest truncate max-w-sm sm:max-w-md">{room.hours}</p>
                                            </div>
                                            <span className="text-windoor-primary group-hover:translate-x-2 transition-transform duration-500 text-lg">→</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── Contact CTA ───────────────────────────────────────────── */}
            <section className="py-16 sm:py-20 bg-windoor-background border-y border-windoor-structural-grey/40">
                <div className="px-6 sm:px-16 max-w-360 mx-auto text-center space-y-8 sm:space-y-12">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main uppercase tracking-tight">
                        <TextReveal mode="words" speed={0.06}>
                            Ready to start your project?
                        </TextReveal>
                    </h3>
                    <div className="flex justify-center">
                        <Link to="/contact" className="btn px-10 sm:px-16 py-5 sm:py-6 font-windoor-main text-xs uppercase tracking-[0.2em]">
                            Request a Consultation
                        </Link>
                    </div>
                </div>
            </section>

        </main>
        <Footer />
        </>
    )
}

export default HomePage
