import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'
import { showrooms } from '../data/showroomData'
import useSEO from '../hooks/useSEO'

const ShowroomsPage = () => {
    useSEO({
        title: "Experience Centers & Showrooms in Gujarat - Windoor",
        description: "Visit our design showrooms and experience centers in Ahmedabad, Rajkot, Anand, Mehsana, and Gandhinagar to explore minimal window systems and facades."
    })

    // State to toggle between Photo and Map view for each showroom card
    const [viewMap, setViewMap] = useState({})

    const toggleView = (id) => {
        setViewMap(prev => ({ ...prev, [id]: !prev[id] }))
    }

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
        <main className="bg-windoor-background">

            {/* Hero */}
            <section className="max-w-360 mx-auto px-6 sm:px-16 pt-20 sm:pt-28 lg:pt-32 mb-16 sm:mb-20">
                <div className="max-w-3xl">
                    <span className="font-windoor-main text-xs uppercase text-windoor-secondary tracking-[0.2em] mb-4 block">Our Presence</span>
                    <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-windoor-main uppercase tracking-tighter leading-tight mb-6 sm:mb-8">
                        <TextReveal mode="words">Experience Precision.</TextReveal>
                    </h1>
                    <TextReveal mode="block" delay={0.3}>
                        <p className="text-base sm:text-lg text-windoor-secondary max-w-xl leading-relaxed">
                            Visit our experience centers to touch, feel, and operate our architectural glazing products. Each showroom is designed as a sanctuary of light and engineering excellence.
                        </p>
                    </TextReveal>
                </div>
            </section>

            {/* Symmetrical Connecting Grid */}
            <section className="max-w-360 mx-auto px-6 sm:px-16 pb-20 sm:pb-32 lg:pb-40">
                <div className="relative space-y-16 lg:space-y-24">
                    {/* Continuous vertical trunk line */}
                    <div className="absolute left-1/2 top-4 bottom-4 w-[3.5px] bg-neutral-300 -translate-x-1/2 hidden lg:block pointer-events-none" />

                    {[
                        { left: showrooms[0], right: showrooms[1] }, // Ahmedabad, Rajkot
                        { left: showrooms[2], right: showrooms[3] }, // Anand, Mehsana
                        { left: showrooms[4], right: 'cta' }         // Gandhinagar, CTA
                    ].map((pair, idx) => {
                        const renderShowroomCard = (room, layoutDirection = 'normal') => {
                            if (!room) return null
                            const isShowingMap = !!viewMap[room.id]
                            const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(room.address)}`
                            const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(room.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`

                            const flexDirectionClass = layoutDirection === 'reverse' ? 'lg:flex-row-reverse' : 'lg:flex-row'

                            return (
                                <div 
                                    id={room.id}
                                    className="border border-windoor-secondary/30 bg-white premium-card p-4 sm:p-6 flex flex-col justify-between group overflow-hidden w-full h-full"
                                    data-cursor="view"
                                >
                                    <div className={`flex flex-col ${flexDirectionClass} h-full gap-6 items-stretch`}>
                                        {/* Media Section: Image or Map */}
                                        <div className="relative overflow-hidden border border-windoor-secondary/20 bg-windoor-container-low shrink-0 aspect-video sm:aspect-16/10 lg:aspect-auto lg:w-[45%] w-full min-h-[220px]">
                                            {!isShowingMap ? (
                                                room.img ? (
                                                    <ImageReveal src={room.img} alt={`${room.city} Showroom`} aspectClass="h-full w-full" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-windoor-charcoal/5">
                                                        <span className="font-windoor-main text-xs uppercase tracking-wider text-windoor-secondary">Image Coming Soon</span>
                                                    </div>
                                                )
                                            ) : (
                                                <iframe
                                                    src={mapEmbedUrl}
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: 0 }}
                                                    allowFullScreen
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    className="absolute inset-0 w-full h-full"
                                                />
                                            )}
                                            {/* Toggle button overlaid on media */}
                                            <button
                                                onClick={() => toggleView(room.id)}
                                                className="absolute bottom-4 right-4 z-25 bg-windoor-primary/95 text-white hover:bg-windoor-secondary font-windoor-main text-[10px] uppercase tracking-widest px-3.5 py-2 border border-white/10 hover:border-white/20 transition-all cursor-pointer backdrop-blur-sm shadow-md"
                                            >
                                                {isShowingMap ? 'View Photo 👁' : 'View Map 🗺'}
                                            </button>
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-windoor-secondary/40 z-10">
                                                <span className="font-windoor-main text-[10px] uppercase tracking-wider">{room.label}</span>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="flex flex-col justify-between flex-grow gap-6 bg-transparent">
                                            <div className="space-y-4">
                                                <h2 className="text-xl sm:text-2xl font-windoor-main font-bold uppercase tracking-tight text-windoor-primary">
                                                    {room.city}
                                                </h2>
                                                <div className="space-y-3 border-l-2 border-windoor-primary pl-4 bg-transparent">
                                                    <div className="bg-transparent">
                                                        <span className="font-windoor-main text-[10px] uppercase text-windoor-secondary tracking-widest block mb-1">Address</span>
                                                        <p className="text-xs sm:text-sm text-windoor-text-muted leading-relaxed">{room.address}</p>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 pt-1 bg-transparent">
                                                        <div className="bg-transparent">
                                                            <span className="font-windoor-main text-[10px] uppercase text-windoor-secondary tracking-widest block mb-1">Contact</span>
                                                            <p className="text-xs text-windoor-text-muted">{room.phone}</p>
                                                        </div>
                                                        <div className="bg-transparent">
                                                            <span className="font-windoor-main text-[10px] uppercase text-windoor-secondary tracking-widest block mb-1">Hours</span>
                                                            <p className="text-xs text-windoor-text-muted">{room.hours}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CTA Buttons */}
                                            <div className="flex items-center gap-3 pt-2 bg-transparent">
                                                <a 
                                                    href={directionsUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="border border-windoor-primary px-4 sm:px-5 py-2.5 sm:py-3 font-windoor-main text-[10px] uppercase tracking-widest hover:bg-windoor-primary hover:text-white transition-all inline-block text-center flex-grow"
                                                >
                                                    Directions ↗
                                                </a>
                                                <Link 
                                                    to="/contact" 
                                                    className="btn font-windoor-main text-[10px] px-4 sm:px-5 py-2.5 sm:py-3 uppercase tracking-widest text-center flex-grow"
                                                >
                                                    Book Visit
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        return (
                            <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch relative w-full">
                                {/* Left Card Column */}
                                <div className="col-span-12 lg:col-span-5">
                                    {renderShowroomCard(pair.left, 'normal')}
                                </div>

                                {/* Middle Column: Curved connecting lines */}
                                <div className="hidden lg:flex col-span-2 items-center justify-center relative min-h-[300px] xl:min-h-[350px]">
                                    <svg 
                                        className="w-full h-full text-neutral-300" 
                                        viewBox="0 0 100 100" 
                                        preserveAspectRatio="none"
                                    >
                                        {/* Left Curved Branch */}
                                        <path 
                                            d="M 0,50 C 35,50 45,50 50,25" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="3.5" 
                                            vectorEffect="non-scaling-stroke"
                                        />
                                        {/* Right Curved Branch */}
                                        <path 
                                            d="M 100,50 C 65,50 55,50 50,25" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="3.5" 
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </svg>
                                </div>

                                {/* Right Card Column */}
                                <div className="col-span-12 lg:col-span-5">
                                    {pair.right === 'cta' ? (
                                        /* Symmetrical Contact/CTA Card matching reverse layout */
                                        <div className="border border-windoor-secondary/30 bg-white premium-card p-4 sm:p-6 flex flex-col justify-between group overflow-hidden w-full h-full">
                                            <div className="flex flex-col lg:flex-row-reverse h-full gap-6 items-stretch w-full">
                                                {/* Media Section */}
                                                <div className="relative overflow-hidden border border-windoor-secondary/20 bg-windoor-container-low shrink-0 aspect-video sm:aspect-16/10 lg:aspect-auto lg:w-[45%] w-full min-h-[220px]">
                                                    <ImageReveal src="/images/Showrooms/Ahmedabad.jpg" alt="Windoor Headquarters" aspectClass="h-full w-full" />
                                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-windoor-secondary/40 z-10">
                                                        <span className="font-windoor-main text-[10px] uppercase tracking-wider">Private Access</span>
                                                    </div>
                                                </div>

                                                {/* Info Section */}
                                                <div className="flex flex-col justify-between flex-grow gap-6 bg-transparent">
                                                    <div className="space-y-4">
                                                        <h2 className="text-xl sm:text-2xl font-windoor-main font-bold uppercase tracking-tight text-windoor-primary">
                                                            Book A Tour
                                                        </h2>
                                                        <div className="space-y-3 border-l-2 border-windoor-primary pl-4 bg-transparent">
                                                            <div className="bg-transparent">
                                                                <span className="font-windoor-main text-[10px] uppercase text-windoor-secondary tracking-widest block mb-1">Exclusive Experience</span>
                                                                <p className="text-xs sm:text-sm text-windoor-text-muted leading-relaxed">
                                                                    Schedule a private walkthrough with a dedicated glazing specialist at our corporate headquarters.
                                                                </p>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2 pt-1 bg-transparent">
                                                                <div className="bg-transparent">
                                                                    <span className="font-windoor-main text-[10px] uppercase text-windoor-secondary tracking-widest block mb-1">Contact</span>
                                                                    <p className="text-xs text-windoor-text-muted">+91 8128445566</p>
                                                                </div>
                                                                <div className="bg-transparent">
                                                                    <span className="font-windoor-main text-[10px] uppercase text-windoor-secondary tracking-widest block mb-1">Email</span>
                                                                    <p className="text-xs text-windoor-text-muted">info@windoor.in</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* CTA Button */}
                                                    <div className="flex items-center gap-3 pt-2 bg-transparent">
                                                        <Link 
                                                            to="/contact" 
                                                            className="btn font-windoor-main text-[10px] px-4 sm:px-5 py-3 uppercase tracking-widest text-center w-full"
                                                        >
                                                            Request Private Tour
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        renderShowroomCard(pair.right, 'reverse')
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-360 mx-auto px-6 sm:px-16 pb-16 sm:pb-24 lg:pb-40">
                <TextReveal mode="block">
                    <div className="bg-windoor-primary p-8 sm:p-16 md:p-24 text-center premium-card">
                        <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main text-white mb-6 sm:mb-8 uppercase tracking-tighter">Cannot visit in person?</h3>
                        <p className="text-windoor-secondary text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                            Explore our full range of products and technical specifications through our digital catalog or request a virtual walkthrough with our specialists.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 bg-transparent">
                            <Link to="/products" className="bg-white text-windoor-primary px-8 sm:px-10 py-4 font-windoor-main text-xs uppercase tracking-widest hover:bg-windoor-container-low transition-colors duration-300 text-center flex items-center justify-center">Explore Products</Link>
                            <Link to="/contact" className="border border-windoor-secondary text-white px-8 sm:px-10 py-4 font-windoor-main text-xs uppercase tracking-widest hover:border-white transition-colors duration-300 text-center flex items-center justify-center">Contact Consultant</Link>
                        </div>
                    </div>
                </TextReveal>
            </section>

            <Footer />
        </main>
    )
}

export default ShowroomsPage
