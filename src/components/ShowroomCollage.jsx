import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { showrooms } from "../data/showroomData"

const ShowroomTile = ({ room, isVisible, delay = 0, style = {}, isMobile = false }) => {
    return (
        <div
            style={{
                width: "100%",
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? "blur(0px)" : "blur(12px)",
                transform: isVisible ? "translateY(0px)" : "translateY(60px)",
                transition: `opacity 1.2s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}ms, filter 1.1s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}ms, transform 1.3s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}ms`,
            }}
        >
            <Link
                to={`/showrooms#${room.id}`}
                data-cursor="view"
                className="relative block overflow-hidden w-full aspect-[3/4] showroom-tile-wrap"
                style={style}
            >
                {/* Image container */}
                <div className="w-full h-full overflow-hidden relative">
                    <img
                        src={room.img}
                        alt={room.city}
                        loading="lazy"
                        className="showroom-tile-img w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    
                    {/* Dark Vignette Overlay on Hover */}
                    <div 
                        className="showroom-tile-overlay absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none"
                        style={{
                            background: "linear-gradient(to top, rgba(11, 12, 12, 0.85) 0%, rgba(11, 12, 12, 0.3) 50%, transparent 100%)",
                            opacity: isMobile ? 1 : 0
                        }} 
                    />

                    {/* Showroom Label - Reveals at the bottom of the picture on hover */}
                    <div 
                        className="showroom-tile-label absolute bottom-0 left-0 right-0 p-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                        style={{
                            opacity: isMobile ? 1 : 0,
                            transform: isMobile ? "translateY(0)" : "translateY(20px)"
                        }}
                    >
                        <h3 className="font-windoor-main font-bold uppercase text-white m-0 leading-none" style={{ fontSize: "14px", letterSpacing: "0.15em" }}>
                            {room.city}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <div style={{ width: "16px", height: "1px", backgroundColor: "rgba(255,255,255,0.4)" }} />
                            <span className="font-windoor-main uppercase text-[10px] text-white/75 tracking-wider">
                                {room.label}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

const ShowroomCollage = () => {
    const sectionRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true)
                observer.disconnect()
            }
        }, { threshold: 0.08 })
        observer.observe(section)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect()
                const scrollOffset = rect.top - window.innerHeight / 2
                setScrollY(scrollOffset)
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Define column coordinates & scroll parallax factors (slow & minimal premium depth)
    const columns = [
        { left: "2%", top: "14%", parallax: 0.03 },   // Col 1: Ahmedabad
        { left: "21.5%", top: "42%", parallax: 0.06 }, // Col 2: Rajkot
        { left: "41%", top: "4%", parallax: 0.02 },    // Col 3: Anand
        { left: "60.5%", top: "46%", parallax: 0.07 }, // Col 4: Mehsana
        { left: "80%", top: "18%", parallax: 0.04 }    // Col 5: Gandhinagar
    ]

    return (
        <>
            <style>{`
                .showroom-tile-container {
                    z-index: 2;
                    transition: z-index 0s ease, transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
                }
                .showroom-tile-container:hover {
                    z-index: 30 !important;
                }
                .showroom-tile-wrap {
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
                    transform: scale(1) translateY(0);
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .showroom-tile-wrap:hover {
                    transform: scale(1.12) translateY(-12px) !important;
                    box-shadow: 0 30px 60px rgba(11, 12, 12, 0.28);
                }
                .showroom-tile-wrap:hover .showroom-tile-img {
                    transform: scale(1.06);
                }
                .showroom-tile-wrap:hover .showroom-tile-overlay {
                    opacity: 1 !important;
                }
                .showroom-tile-wrap:hover .showroom-tile-label {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative py-24 md:py-40 bg-windoor-background border-t border-windoor-structural-grey/40 overflow-hidden"
            >
                {/* ── DESKTOP COLLAGE ── */}
                <div className="hidden md:block relative w-full" style={{ height: "760px", maxWidth: "1600px", margin: "0 auto" }}>
                    
                    {/* Background tiles arranged exactly like the reference */}
                    {showrooms.map((room, idx) => {
                        const col = columns[idx]
                        // Minimal premium parallax effect
                        const pyOffset = scrollY * col.parallax
                        return (
                            <div
                                key={room.id}
                                className="absolute showroom-tile-container"
                                style={{
                                    width: "18%",
                                    left: col.left,
                                    top: col.top,
                                    transform: `translateY(${pyOffset}px)`
                                }}
                            >
                                <ShowroomTile 
                                    room={room} 
                                    isVisible={isVisible} 
                                    delay={idx * 100} 
                                />
                            </div>
                        )
                    })}

                    {/* Centered Overlapping Editorial Heading */}
                    <div 
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            filter: isVisible ? "blur(0)" : "blur(12px)",
                            transform: isVisible ? "translateY(0)" : "translateY(35px)",
                            transition: "opacity 1.3s cubic-bezier(0.215, 0.61, 0.355, 1) 200ms, filter 1.2s ease 200ms, transform 1.4s cubic-bezier(0.215, 0.61, 0.355, 1) 200ms"
                        }}
                    >
                        <div 
                            className="pointer-events-auto max-w-[650px] px-13 py-12"
                            style={{
                                background: "rgba(255, 255, 255, 0.7)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",
                                border: "1px solid rgba(255, 255, 255, 0.55)",
                                boxShadow: "0 24px 50px rgba(11, 12, 12, 0.05)",
                                borderRadius: "0px",
                            }}
                        >
                            <span 
                                className="font-windoor-main uppercase block mb-3 font-semibold"
                                style={{ fontSize: "11px", letterSpacing: "0.35em", color: "rgba(11, 12, 12, 0.7)" }}
                            >
                                ✦ SHOWROOMS
                            </span>
                            
                            <h2 
                                className="m-0 leading-[1.1] text-windoor-primary"
                                style={{ 
                                    fontFamily: "'Playfair Display', 'Bodoni Moda', serif",
                                    fontSize: "clamp(32px, 3.8vw, 54px)", 
                                    fontWeight: 500,
                                    letterSpacing: "-0.015em",
                                    textShadow: "0 2px 10px rgba(249, 249, 249, 0.8)",
                                }}
                            >
                                Experience Windoor for different spaces
                            </h2>
                            
                            <p 
                                className="font-windoor-main uppercase mt-4 mb-8 font-semibold"
                                style={{ fontSize: "9px", letterSpacing: "0.22em", color: "rgba(11, 12, 12, 0.65)" }}
                            >
                                Experience Windoor Across Gujarat
                            </p>

                            <Link
                                to="/showrooms"
                                className="inline-flex items-center justify-center bg-windoor-primary text-white font-windoor-main font-bold transition-all duration-300 hover:bg-windoor-charcoal/80"
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.25em",
                                    padding: "14px 28px",
                                    textDecoration: "none"
                                }}
                            >
                                VIEW ALL
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── MOBILE / TABLET ── */}
                <div className="md:hidden px-6">
                    <div 
                        className="text-center mb-12"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(24px)",
                            transition: "all 1.2s ease"
                        }}
                    >
                        <span className="font-windoor-main uppercase block mb-2" style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(11, 12, 12, 0.45)" }}>
                            ✦ SHOWROOMS
                        </span>
                        <h2 className="m-0 text-3xl text-windoor-primary leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
                            Experience Windoor for different spaces
                        </h2>
                        <p className="font-windoor-main uppercase text-[8px] tracking-widest text-windoor-secondary mt-3 m-0">
                            Experience Windoor Across Gujarat
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        {showrooms.map((room, idx) => (
                            <ShowroomTile 
                                key={room.id} 
                                room={room} 
                                isVisible={isVisible} 
                                delay={idx * 100}
                                isMobile={true} 
                            />
                        ))}
                    </div>

                    <div 
                        className="text-center"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transition: "opacity 1s ease 500ms"
                        }}
                    >
                        <Link
                            to="/showrooms"
                            className="inline-flex items-center justify-center bg-windoor-primary text-white font-windoor-main font-bold py-4 px-8 tracking-widest"
                            style={{ fontSize: "10px", textDecoration: "none" }}
                        >
                            VIEW ALL
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShowroomCollage
