import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'
import { showrooms } from '../data/showroomData'

const ShowroomsPage = () => {
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
        <main className="pt-18 bg-windoor-background">

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

            {/* Bento Grid */}
            <section className="max-w-360 mx-auto px-6 sm:px-16 pb-20 sm:pb-32 lg:pb-40">
                <div className="grid grid-cols-12 gap-6 sm:gap-8">
                    {showrooms.map((room) => {
                        const isAhmedabad = room.id === 'ahmedabad'
                        const colSpanClass = isAhmedabad ? 'col-span-12 lg:col-span-8' : 'col-span-12 md:col-span-6 lg:col-span-4'
                        const isShowingMap = !!viewMap[room.id]
                        const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(room.address)}`
                        const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(room.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`

                        return (
                            <div 
                                key={room.id}
                                id={room.id}
                                className={`${colSpanClass} border border-windoor-secondary/30 bg-white premium-card p-4 sm:p-6 flex flex-col justify-between group overflow-hidden`}
                                data-cursor="view"
                            >
                                <div className={`flex flex-col h-full gap-6 ${isAhmedabad ? 'lg:flex-row lg:items-stretch' : ''}`}>
                                    
                                    {/* Media Section: Image or Map */}
                                    <div className={`relative overflow-hidden border border-windoor-secondary/20 bg-windoor-container-low shrink-0 aspect-video sm:aspect-16/10 ${isAhmedabad ? 'lg:w-1/2 lg:aspect-auto lg:min-h-[300px]' : 'w-full'}`}>
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
                                    <div className={`flex flex-col justify-between flex-grow gap-6 bg-transparent ${isAhmedabad ? 'lg:w-1/2 lg:pl-2' : ''}`}>
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
