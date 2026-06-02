import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import Footer from '../components/Footer'

const AboutPage = () => {
    const sectionsRef = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0')
                        entry.target.classList.remove('opacity-0', 'translate-y-10')
                    }
                })
            },
            { threshold: 0.1 }
        )
        sectionsRef.current.forEach((el) => {
            if (el) {
                el.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-10')
                observer.observe(el)
            }
        })
        return () => observer.disconnect()
    }, [])

    const addRef = (el) => {
        if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
    }

    return (
        <main className="pt-18">

            {/* Hero Section */}
            <section ref={addRef} className="max-w-360 mx-auto px-6 sm:px-16 pt-20 sm:pt-28 lg:pt-32 mb-16 sm:mb-28 lg:mb-40">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end">
                    <div className="md:col-span-8">
                        <span className="font-windoor-main uppercase tracking-[0.2em] text-xs text-windoor-secondary mb-4 sm:mb-8 block">Est. 1989</span>
                        <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-bold font-windoor-main leading-tight mb-6 sm:mb-12">
                            Defining the threshold between architecture and atmosphere for{' '}
                            <span className="text-windoor-secondary">35 years</span>.
                        </h1>
                    </div>
                    <div className="md:col-span-4 pb-4">
                        <p className="text-base sm:text-lg text-windoor-text-muted leading-relaxed">
                            Windoor began with a single vision: to dissolve the boundaries of the traditional home. Today, we are the vanguard of architectural glazing, blending structural integrity with pure aesthetic transparency.
                        </p>
                    </div>
                </div>

                <div className="mt-10 sm:mt-20 relative h-75 sm:h-112.5 lg:h-150 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img
                        alt="Modern Architectural Glazing"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnvclpg3Y0kYCAtm7wydkrF564D7tRmCIT1PFOVwQNSgSnM93FL1s1K5gEaCY3nBH8FNk8xzH5xEyQAMKoVfgbPhiEzMVgQ0Q7ImKcz-kkIeMHWSuHLoLQLTTEbt6tSYJv1FGLGsGk-BHy9_p-u1I2GeZbW8hMArLGSl1lNZTI9WZ1BF1voOWtF8I-xCpzJn2oR4VED56FcpwG6DZOdHGqAFDnEfcGDM7rXwqfffRkvjcSM6h8quOkfolIvdZce2v00lw_BT49YLg"
                    />
                    <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 bg-windoor-background p-4 sm:p-8 border border-windoor-secondary max-w-50 sm:max-w-xs">
                        <p className="font-windoor-main text-windoor-primary uppercase text-xs leading-tight">
                            Pictured: The Obsidian Villa, featuring our signature ultra-slim profile systems.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section ref={addRef} className="bg-windoor-container-low border-y border-windoor-structural-grey/40 py-16 sm:py-24 lg:py-40">
                <div className="max-w-360 mx-auto px-6 sm:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 lg:gap-32">
                        <div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main mb-6 sm:mb-8">Our Vision</h2>
                            <p className="text-base sm:text-lg text-windoor-text-muted mb-8 sm:mb-12 leading-relaxed">
                                To lead the global transition towards invisible architecture, where technology serves the view and performance is measured by the light we let in.
                            </p>
                            <div className="h-px bg-windoor-structural-grey w-32"></div>
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main mb-6 sm:mb-8">Our Mission</h2>
                            <p className="text-base sm:text-lg text-windoor-text-muted mb-8 sm:mb-12 leading-relaxed">
                                We engineer bespoke glazing solutions that empower architects to push the limits of design, ensuring every pane of glass is a masterpiece of thermal efficiency and structural resilience.
                            </p>
                            <div className="h-px bg-windoor-structural-grey w-32"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Windoor */}
            <section ref={addRef} className="max-w-360 mx-auto px-6 sm:px-16 py-16 sm:py-24 lg:py-40">
                <div className="mb-10 sm:mb-20">
                    <span className="font-windoor-main uppercase tracking-[0.2em] text-xs text-windoor-secondary mb-4 block">Selection Criteria</span>
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main">Why Architects Choose Windoor</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                        { icon: '✓', title: 'Uncompromising Quality', desc: 'Every component is subjected to rigorous stress-testing against Category 5 wind loads and extreme thermal variances.' },
                        { icon: '⚙', title: 'Structural Innovation', desc: 'Pioneering ultra-slim 20mm interlocking profiles that maximize glazing areas without sacrificing structural integrity.' },
                        { icon: '🤝', title: 'Legacy of Trust', desc: 'A portfolio spanning three decades of landmark residential and commercial projects across the globe.' },
                    ].map((card) => (
                        <div key={card.title} className="border border-windoor-secondary p-8 sm:p-12 flex flex-col justify-between group hover:bg-windoor-primary transition-colors duration-500 cursor-pointer min-h-70">
                            <span className="text-3xl sm:text-4xl mb-8 sm:mb-16 group-hover:text-white block">{card.icon}</span>
                            <div>
                                <h3 className="text-lg sm:text-2xl font-windoor-main font-bold mb-4 group-hover:text-white">{card.title}</h3>
                                <p className="text-sm text-windoor-text-muted group-hover:text-windoor-secondary">{card.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Expertise & Experience */}
            <section ref={addRef} className="max-w-360 mx-auto px-6 sm:px-16 py-16 sm:py-24 lg:py-40 overflow-hidden">
                <div className="flex flex-col md:flex-row gap-10 sm:gap-20">
                    <div className="w-full md:w-1/2">
                        <div className="md:sticky top-40">
                            <span className="font-windoor-main uppercase tracking-[0.2em] text-xs text-windoor-secondary mb-4 block">Capability</span>
                            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main mb-6 sm:mb-8">Technical Expertise</h2>
                            <ul className="space-y-4 sm:space-y-6">
                                {['Thermal Performance Engineering', 'Acoustic Glazing Solutions', 'Automated Sliding Systems', 'Hurricane-Impact Certified Glass'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 py-3 sm:py-4 border-b border-windoor-structural-grey">
                                        <span className="font-windoor-main text-windoor-primary text-xs">0{i + 1}</span>
                                        <span className="text-base sm:text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-10 sm:space-y-20">
                        <div className="aspect-4/5 bg-windoor-container overflow-hidden grayscale">
                            <img alt="Technical Detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwqVRKSX4-mzeiQNMO2kXKtW6FrQxsQ8fgMgtDolMjCVVSMfbIm0w3AkoXLd7bkIpeMC0w9o7ZvqRealgChKXHExtgSqpaH1qk9S5mFoDNcm49C5-SlhjszCGEJAe-E-KDz1K5K5gLWfe3XipzdG3L4N_xWN_rRM8LIHYdizHXQKlnTCFWtD3LH6LV-_0ym9TwHXUJfv5f7gCUdFbOcW2YQM5Mo1kRAxrpSMlYk2HeUcJf4Zo_FhZs2QG9fd9P5_ovUAu3IBsgDdM"
                            />
                        </div>
                        <div className="p-8 sm:p-12 border border-windoor-secondary bg-white">
                            <h4 className="text-lg sm:text-2xl font-windoor-main font-bold mb-4">Precision Manufacturing</h4>
                            <p className="text-sm text-windoor-text-muted">Our manufacturing facility operates with 0.1mm tolerance levels. By utilizing German-engineered CNC machining and Italian glass tempering techniques, we ensure that every Windoor installation is a perfect fit.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Brands */}
            <section ref={addRef} className="bg-windoor-primary text-white py-16 sm:py-24 lg:py-40">
                <div className="max-w-360 mx-auto px-6 sm:px-16">
                    <div className="text-center mb-12 sm:mb-24">
                        <span className="font-windoor-main uppercase tracking-[0.2em] text-xs text-windoor-secondary mb-4 block">Strategic Partnerships</span>
                        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main">Curated Global Excellence</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
                        {[
                            { name: 'TOSTEM', style: '', desc: "Keller Minimal Windows represents the finest expression of minimal architectural design — where precision engineering meets timeless elegance. Designed for the world's most luxurious spaces, Keller creates seamless living experiences through ultra-slim glass systems that dissolve the boundary between indoors and outdoors. Defined by remarkably slender 21 mm sightlines and engineered to support glass panels up to 6 meters high, each Keller system combines invisible performance with refined aesthetics. Hidden tracks, silent motorisation, and seamless pocket systems allow entire walls of glass to disappear effortlessly, creating uninterrupted panoramic views and open living spaces. Every Keller installation is bespoke, engineered with exceptional precision and attention to detail. Capable of moving glass panels weighing up to 2,400 kg with effortless smoothness, Keller Minimal Windows sets the benchmark for innovation, sophistication, and contemporary luxury architecture worldwide", link: 'Explore Tostem Series' },
                            { name: 'KELLER', style: 'italic', desc: "About Tostem brand Founded in Japan and backed by the global expertise of LIXIL Group which also owns brands like Grohe , American Standard and   TOSTEM is one of the world’s most respected names in premium aluminium windows and doors. With over 100 years of Japanese engineering philosophy and more than five decades of innovation in fenestration technology, TOSTEM is renowned for creating pre-engineered window systems that combine precision, durability, aesthetics, and performance. Designed to withstand extreme climates while maximizing natural light and ventilation, TOSTEM products are celebrated for their exceptional quality control, factory-finished precision, superior weather resistance, and minimalist modern design. What truly sets TOSTEM apart is its “Made in Japan” engineering approach — where every detail is thoughtfully designed to deliver long-lasting performance, effortless functionality, and a seamless connection between living spaces and nature. Currently Tostem is working across 175 cities in India. The pinnacle of European minimal windows. Keller systems offer the world's slimmest frames, providing an uninterrupted panoramic view for luxury estates.", link: 'Explore Keller Minimal' },
                        ].map((brand) => (
                            <div key={brand.name} className="border border-windoor-secondary p-8 sm:p-16 flex flex-col items-center text-center">
                                <div className={`text-2xl sm:text-4xl font-bold tracking-tighter mb-6 sm:mb-8 uppercase font-windoor-main ${brand.style}`}>{brand.name}</div>
                                <p className="text-base sm:text-lg text-windoor-secondary mb-6 sm:mb-8 leading-relaxed">{brand.desc}</p>
                                <a className="font-windoor-main text-xs uppercase tracking-widest border-b border-white pb-1 hover:text-windoor-secondary transition-colors" href="#">{brand.link}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section ref={addRef} className="py-20 sm:py-32 lg:py-40 text-center max-w-2xl mx-auto px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-windoor-main mb-8 sm:mb-12">Start your architectural journey.</h2>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                    <Link to="/contact" className="btn font-windoor-main text-xs px-8 sm:px-10 py-4 sm:py-5 uppercase tracking-widest">Request a Consultation</Link>
                    <button className="border-2 border-windoor-primary text-windoor-primary font-windoor-main text-xs px-8 sm:px-10 py-4 sm:py-5 uppercase tracking-widest hover:bg-windoor-primary hover:text-white transition-all">Download Catalog</button>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default AboutPage
