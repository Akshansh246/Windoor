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
    const partnerContainerRef = useRef(null)
    const partnerTrackRef = useRef(null)
    const targetTranslateX = useRef(0)
    const currentTranslateX = useRef(0)
    const animationFrameId = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            if (!partnerContainerRef.current || !partnerTrackRef.current) return
            const rect = partnerContainerRef.current.getBoundingClientRect()
            const totalHeight = rect.height
            const scrolledPast = -rect.top
            const windowHeight = window.innerHeight
            const scrollableRange = totalHeight - windowHeight

            if (scrollableRange <= 0) {
                targetTranslateX.current = 0
                return
            }

            const progress = Math.min(Math.max(scrolledPast / scrollableRange, 0), 1)
            const trackWidth = partnerTrackRef.current.scrollWidth
            const viewWidth = window.innerWidth
            const maxScroll = Math.max(trackWidth - viewWidth, 0)

            targetTranslateX.current = progress * maxScroll
        }

        const updateAnimation = () => {
            const lerpFactor = 0.08
            currentTranslateX.current += (targetTranslateX.current - currentTranslateX.current) * lerpFactor
            const currentX = Math.round(currentTranslateX.current * 100) / 100

            if (partnerTrackRef.current) {
                partnerTrackRef.current.style.transform = `translate3d(-${currentX}px, 0, 0)`
            }

            animationFrameId.current = requestAnimationFrame(updateAnimation)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("resize", handleScroll)
        animationFrameId.current = requestAnimationFrame(updateAnimation)
        handleScroll()

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleScroll)
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
        }
    }, [])

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
                <Particles />
                
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
                    <ImageReveal src="/images/about.jpeg" alt="Windoor Architecture" aspectClass="aspect-4/5" />
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
            <div ref={partnerContainerRef} className="relative h-[250vh] w-full bg-windoor-container-low">
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-8 sm:py-12">
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
                    <div className="w-full overflow-visible">
                        <div 
                            ref={partnerTrackRef} 
                            className="flex gap-6 sm:gap-8 px-6 sm:px-16 w-fit will-change-transform animate-ease-out"
                            style={{ transform: 'translate3d(0px, 0, 0)' }}
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
            </div>

            

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                title: sliders[3]?.title || "Motorised & Minimal System",
                                desc: sliders[3]?.desc || "State-of-the-art motorized sliding systems with ultra-slim 20mm visual sightlines.",
                                img: sliders[3]?.images?.[0]?.src || "https://lh3.googleusercontent.com/aida-public/AB6AXuD_IC0U17ysGAzEVw3lPm7GrCRhZo5Ka6RqnWGpbRb3ORrnXLyyUAZwCLcfVLXCcVnonNsG8iRrE7eMa01khafPRAGRKU0yHGRFrc_kT--wTa414h5rX7dAKuAJAs9vZsnGVr6K2-HA7NKsQ2_82BDUq-_XzmeZYg4eBcU24YAiAJFp6ch79s-IhXwQM1IYHzSc6bm6jDdtKGD6Knb5jgHvNIc4ihYedQ-h3uC-VuPCbMx6OoQkDGUfitXZOs9nh4lNl-cQqk7sh0c",
                                link: "/products#sliders"
                            },
                            {
                                title: casements[3]?.title || "Minimal Casements",
                                desc: casements[3]?.desc || "Concealed hinges and micro-frames designed to frame exterior landscapes seamlessly.",
                                img: casements[3]?.images?.[0]?.src || "https://lh3.googleusercontent.com/aida-public/AB6AXuBKge9VRB473RWyzVVtPQtvHb0CwRZgYroHxoIx6HoU8ZVpeViTduE0eKc-uOL6gud8IGCkvEpS7ik-RPfqUIgfz4AvmuS85K_G0fx9yer6rh_u1gXLLqaR5tKsLX9NiA6oScZVPtmDu1eOcqlkTsbl0VEJa6NJw9nCdnldpAtYZwJ5zZCKHEZwpXucxfJu3rHpzn_0XuyQ4XgYAbvfER0MhgkvZ3OH8Q9kzPmPDddbiibpp0zoZ-7rentBAACcpkjG8j0B-ARVxy4",
                                link: "/products#casements"
                            },
                            {
                                title: sliders[1]?.title || "DGU System",
                                desc: sliders[1]?.desc || "Double Glazed Units built with advanced thermal profiles to maximize insulation.",
                                img: sliders[1]?.images?.[0]?.src || "https://lh3.googleusercontent.com/aida-public/AB6AXuDp3Q_mA_D4q0JmJmecWpU43GZbV_Ay_C9acZtoHmRY_AdrbKVqQQRJSudT1JRpDI050fHbbKbzOwKo7TmNlPRc7gkJ4JyQKlJ1cOlkQEr9Nd6wsMNewTlMMSsj1Phr3kkdpCjhvtXIsYflQIz5Vl48lyTvl_o9TGKZfigvfRKQAtT8SzSXAq4SbDI8W9_nSwemeasmLRji3phO-N43_auermZ1DIG9aBLZvYWhULM0ph0sXccFeskg4DCst6gnEfD8h0Qmuv0khz0",
                                link: "/products#sliders"
                            },
                            {
                                title: casements[2]?.title || "Grants Casements",
                                desc: casements[2]?.desc || "Luxury large-span casement systems featuring hidden friction stays and perimeter seals.",
                                img: casements[2]?.images?.[0]?.src || "https://lh3.googleusercontent.com/aida-public/AB6AXuCpK32tqoZqhdzrsHmhmR5tpKJLm8oI8fQ-cxxm0-nfs468_5dPTXR-Jso0DPv4uGfpvXkdO41Gkcz_DE38kL6AYTN6n5FeW_DgbZz1BzUXf-7USGDL3CpgD0aV5seJ3Hq7q8QulmmdDlaTGhbYb-1MeWZ0F2X9TJIpUE8AO0AZl2BUB47sQ683yINhBU72VyZIyJBJoC_jmzWWRCVAqvoe_nYcBZShxQiXF822qJ89QC5FfgsVtC-F5wUfD3_B3V6woX49DfW7ddI",
                                link: "/products#casements"
                            },
                            {
                                title: sliders[4]?.title || "Curved Sliding System",
                                desc: sliders[4]?.desc || "Bespoke curved tracks that align with custom architectural radiuses without sacrificing smooth operation.",
                                img: sliders[4]?.images?.[0]?.src || "https://lh3.googleusercontent.com/aida-public/AB6AXuBmpxckI9kpMmbOPOp_npxGtwKzNiW6FTykynnKN1gJB_R4YUjU_fac1-OdtuHb3rpbeWCdaLoDyPSOsv4ZDm0Al0qRGzdqFBhaumCOP-X0O9EE_o6PGcDq21_3oPyae4nimCmpRhe498ExvAvkTWVv9_JjMLU4pIgE00cqz3UFN7pd9VMwAPKZmPa46VU4xvoOSFIUtMGbDY7jnXz5GWiFKccte6p-5IXtNgMX9gr3Oq-sLh2CG1ZTwk2bU7T82hCojo9_WVUjkcA",
                                link: "/products#sliders"
                            },
                            {
                                title: ventilation.title || "Ventilation Options",
                                desc: ventilation.desc || "Acoustically buffered ventilation slots and micro-vents designed to bring natural air circulation.",
                                img: ventilation.images?.[0]?.src || "/images/facade.png",
                                link: "/products#ventilation"
                            }
                        ].map((prod, idx) => (
                            <div key={prod.title} className="group border border-windoor-secondary bg-windoor-container-low p-6 sm:p-8 flex flex-col justify-between min-h-95 sm:min-h-112.5 premium-card" data-cursor="explore">
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="aspect-square bg-windoor-container overflow-hidden flex items-center justify-center relative">
                                        <ImageReveal src={prod.img} alt={prod.title} aspectClass="w-full h-full" delay={idx * 0.05} />
                                    </div>
                                    <h4 className="font-windoor-main text-base sm:text-xl font-bold uppercase">{prod.title}</h4>
                                    <p className="text-sm text-windoor-text-muted leading-relaxed">{prod.desc}</p>
                                </div>
                                <Link to={prod.link} className="mt-6 self-start font-windoor-main text-xs uppercase tracking-widest font-bold border-b border-windoor-primary pb-1 group-hover:pr-4 transition-all duration-300">Explore</Link>
                            </div>
                        ))}
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
                                EXPERIENCE OUR PRODUCTS
                            </TextReveal>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {showrooms.map((room, idx) => (
                            <Link key={room.id} to="/showrooms" className="group cursor-pointer space-y-4 block" data-cursor="view">
                                <div className="aspect-video bg-windoor-container overflow-hidden border border-windoor-secondary relative">
                                    <ImageReveal src={room.img} alt={`${room.city} Showroom`} aspectClass="h-full w-full" delay={idx * 0.08} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <h4 className="font-windoor-main text-base sm:text-xl font-bold uppercase">{room.city}</h4>
                                    <span className="text-windoor-primary group-hover:translate-x-2 transition-transform duration-500 text-lg">→</span>
                                </div>
                            </Link>
                        ))}
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
