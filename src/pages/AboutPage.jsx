import { Link } from 'react-router'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'
import { brands } from '../data/partnersData'

const AboutPage = () => {
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

                <div className="mt-10 sm:mt-20 relative overflow-hidden group" data-cursor="view">
                    <ImageReveal
                        alt="Modern Architectural Glazing"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnvclpg3Y0kYCAtm7wydkrF564D7tRmCIT1PFOVwQNSgSnM93FL1s1K5gEaCY3nBH8FNk8xzH5xEyQAMKoVfgbPhiEzMVgQ0Q7ImKcz-kkIeMHWSuHLoLQLTTEbt6tSYJv1FGLGsGk-BHy9_p-u1I2GeZbW8hMArLGSl1lNZTI9WZ1BF1voOWtF8I-xCpzJn2oR4VED56FcpwG6DZOdHGqAFDnEfcGDM7rXwqfffRkvjcSM6h8quOkfolIvdZce2v00lw_BT49YLg"
                        aspectClass="h-75 sm:h-112.5 lg:h-150"
                    />
                    <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 bg-windoor-background p-4 sm:p-8 border border-windoor-secondary max-w-50 sm:max-w-xs z-10">
                        <p className="font-windoor-main text-windoor-primary uppercase text-xs leading-tight">
                            Pictured: The Obsidian Villa, featuring our signature ultra-slim profile systems.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="bg-windoor-container-low border-y border-windoor-structural-grey/40 py-16 sm:py-24 lg:py-40">
                <div className="max-w-360 mx-auto px-6 sm:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 lg:gap-32">
                        <div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main mb-6 sm:mb-8">
                                <TextReveal mode="words">Our Vision</TextReveal>
                            </h2>
                            <TextReveal mode="block" delay={0.2}>
                                <p className="text-base sm:text-lg text-windoor-text-muted mb-8 sm:mb-12 leading-relaxed">
                                    To lead the global transition towards invisible architecture, where technology serves the view and performance is measured by the light we let in.
                                </p>
                                <div className="h-px bg-windoor-structural-grey w-32"></div>
                            </TextReveal>
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main mb-6 sm:mb-8">
                                <TextReveal mode="words">Our Mission</TextReveal>
                            </h2>
                            <TextReveal mode="block" delay={0.2}>
                                <p className="text-base sm:text-lg text-windoor-text-muted mb-8 sm:mb-12 leading-relaxed">
                                    We engineer bespoke glazing solutions that empower architects to push the limits of design, ensuring every pane of glass is a masterpiece of thermal efficiency and structural resilience.
                                </p>
                                <div className="h-px bg-windoor-structural-grey w-32"></div>
                            </TextReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Windoor */}
            <section className="max-w-360 mx-auto px-6 sm:px-16 py-16 sm:py-24 lg:py-40">
                <div className="mb-10 sm:mb-20">
                    <TextReveal mode="words">
                        <span className="font-windoor-main uppercase tracking-[0.2em] text-xs text-windoor-secondary mb-4 block">Selection Criteria</span>
                    </TextReveal>
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main">
                        <TextReveal mode="words" delay={0.2}>
                            Why Architects Choose Windoor
                        </TextReveal>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                        { icon: '✓', title: 'Uncompromising Quality', desc: 'Every component is subjected to rigorous stress-testing against Category 5 wind loads and extreme thermal variances.' },
                        { icon: '⚙', title: 'Structural Innovation', desc: 'Pioneering ultra-slim 20mm interlocking profiles that maximize glazing areas without sacrificing structural integrity.' },
                        { icon: '🤝', title: 'Legacy of Trust', desc: 'A portfolio spanning three decades of landmark residential and commercial projects across the globe.' },
                    ].map((card) => (
                        <div key={card.title} className="border border-windoor-secondary p-8 sm:p-12 flex flex-col justify-between group hover:bg-windoor-primary transition-all duration-500 cursor-pointer min-h-70 premium-card" data-cursor="explore">
                            <span className="text-3xl sm:text-4xl mb-8 sm:mb-16 group-hover:text-white block transition-colors">{card.icon}</span>
                            <div>
                                <h3 className="text-lg sm:text-2xl font-windoor-main font-bold mb-4 group-hover:text-white transition-colors">{card.title}</h3>
                                <p className="text-sm text-windoor-text-muted group-hover:text-white/75 transition-colors">{card.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Expertise & Experience */}
            <section className="max-w-360 mx-auto px-6 sm:px-16 py-16 sm:py-24 lg:py-40 overflow-hidden">
                <div className="flex flex-col md:flex-row gap-10 sm:gap-20">
                    <div className="w-full md:w-1/2">
                        <div className="md:sticky top-40">
                            <TextReveal mode="words">
                                <span className="font-windoor-main uppercase tracking-[0.2em] text-xs text-windoor-secondary mb-4 block">Capability</span>
                            </TextReveal>
                            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main mb-6 sm:mb-8">
                                <TextReveal mode="words" delay={0.2}>
                                    Technical Expertise
                                </TextReveal>
                            </h2>
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
                        <div className="aspect-4/5 bg-windoor-container overflow-hidden relative group" data-cursor="view">
                            <ImageReveal alt="Technical Detail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwqVRKSX4-mzeiQNMO2kXKtW6FrQxsQ8fgMgtDolMjCVVSMfbIm0w3AkoXLd7bkIpeMC0w9o7ZvqRealgChKXHExtgSqpaH1qk9S5mFoDNcm49C5-SlhjszCGEJAe-E-KDz1K5K5gLWfe3XipzdG3L4N_xWN_rRM8LIHYdizHXQKlnTCFWtD3LH6LV-_0ym9TwHXUJfv5f7gCUdFbOcW2YQM5Mo1kRAxrpSMlYk2HeUcJf4Zo_FhZs2QG9fd9P5_ovUAu3IBsgDdM" aspectClass="h-full w-full" />
                        </div>
                        <div className="p-8 sm:p-12 border border-windoor-secondary bg-white premium-card">
                            <h4 className="text-lg sm:text-2xl font-windoor-main font-bold mb-4">Precision Manufacturing</h4>
                            <p className="text-sm text-windoor-text-muted leading-relaxed">Our manufacturing facility operates with 0.1mm tolerance levels. By utilizing German-engineered CNC machining and Italian glass tempering techniques, we ensure that every Windoor installation is a perfect fit.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Brands */}
            <section className="bg-windoor-primary text-white py-16 sm:py-24 lg:py-40">
                <div className="max-w-360 mx-auto px-6 sm:px-16">
                    <div className="text-center mb-12 sm:mb-24">
                        <TextReveal mode="words">
                            <span className="font-windoor-main uppercase tracking-[0.2em] text-xs text-windoor-secondary mb-4 block">Strategic Partnerships</span>
                        </TextReveal>
                        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main">
                            <TextReveal mode="words" delay={0.2}>
                                Curated Global Excellence
                            </TextReveal>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
                        {brands.map((brand) => (
                            <div key={brand.name} className="border border-windoor-secondary p-8 sm:p-16 flex flex-col items-center text-center bg-windoor-charcoal/20 premium-card" data-cursor="explore">
                                <div className={`text-2xl sm:text-4xl font-bold tracking-tighter mb-6 sm:mb-8 uppercase font-windoor-main ${brand.style}`}>{brand.name}</div>
                                <p className="text-sm text-windoor-structural-grey mb-6 sm:mb-8 leading-relaxed">{brand.desc}</p>
                                <Link className="font-windoor-main text-xs uppercase tracking-widest border-b border-white pb-1 hover:text-windoor-secondary transition-colors" to="/products">{brand.link}</Link>
                            </div>
                        ))}
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
