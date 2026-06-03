import { useState } from 'react'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'

const systems = [
    {
        id: 'sliding',
        desc: 'Seamless indoor-outdoor transitions through precision-engineered tracks and ultra-slim profiles.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpK32tqoZqhdzrsHmhmR5tpKJLm8oI8fQ-cxxm0-nfs468_5dPTXR-Jso0DPv4uGfpvXkdO41Gkcz_DE38kL6AYTN6n5FeW_DgbZz1BzUXf-7USGDL3CpgD0aV5seJ3Hq7q8QulmmdDlaTGhbYb-1MeWZ0F2X9TJIpUE8AO0AZl2BUB47sQ683yINhBU72VyZIyJBJoC_jmzWWRCVAqvoe_nYcBZShxQiXF822qJ89QC5FfgsVtC-F5wUfD3_B3V6woX49DfW7ddI',
        specs: [
            { num: '01', title: 'Single Glass', desc: 'Lightweight profiles for interior partitions and climate-controlled environments.' },
            { num: '02', title: 'DGU / DG Lam', desc: 'Double Glazed Units with optional laminated safety glass for superior thermal insulation.' },
            { num: '03', title: 'Curved Sliding', desc: 'Custom radiuses available for fluid architectural envelopes without compromising motion smoothness.', wide: true },
        ],
    },
    {
        id: 'casement',
        desc: 'Classic opening mechanisms refined with modern hardware for high-performance sealing.',
        items: [
            { title: 'Minimal Casement', body: 'Our minimal casement series features hidden hinges and integrated drainage. Designed for maximum glass area and minimal frame sightlines.', features: ['Triple Glazed Compatible', '5-Point Locking System', 'Sound Insulation up to 45dB'] },
            { title: 'Standard Series (DGU/Laminated)', body: 'Versatile solutions for residential and commercial applications, offering a balance of performance and aesthetic flexibility.' },
        ],
    },
    {
        id: 'minimal',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKge9VRB473RWyzVVtPQtvHb0CwRZgYroHxoIx6HoU8ZVpeViTduE0eKc-uOL6gud8IGCkvEpS7ik-RPfqUIgfz4AvmuS85K_G0fx9yer6rh_u1gXLLqaR5tKsLX9NiA6oScZVPtmDu1eOcqlkTsbl0VEJa6NJw9nCdnldpAtYZwJ5zZCKHEZwpXucxfJu3rHpzn_0XuyQ4XgYAbvfER0MhgkvZ3OH8Q9kzPmPDddbiibpp0zoZ-7rentBAACcpkjG8j0B-ARVxy4',
    },
]

const specialized = [
    { icon: '⚙', title: 'Motorized Systems', desc: 'Integrated automation for effortless operation of oversized panels via smart home systems or touch commands.', features: ['Silent Drive Motor', 'Obstacle Detection', 'KNX/Lutron Compatible'] },
    { icon: '▦', title: 'Curtain Wall Systems', desc: 'Structural glazing for multi-story envelopes, offering unlimited design freedom and thermal efficiency.', features: ['Structural Silicone', 'Stick/Unitized Hybrid', 'Pressure Plate Finishes'] },
    { icon: '⋯', title: 'Ventilation Systems', desc: 'Acoustically insulated ventilation modules that integrate seamlessly into the glazing profile.', features: ['Auto Air-flow Control', 'Acoustic Buffers', 'Insect Screening'] },
]

const SystemsPage = () => {
    const [openItems, setOpenItems] = useState({ 0: true })
    const toggle = (i) => setOpenItems((prev) => ({ ...prev, [i]: !prev[i] }))

    return (
        <main className="pt-18">

            {/* Hero */}
            <header className="px-6 sm:px-16 max-w-360 mx-auto pt-20 sm:pt-28 lg:pt-32 mb-12 sm:mb-20">
                <TextReveal mode="words">
                    <span className="font-windoor-main uppercase tracking-widest text-xs text-windoor-secondary block mb-4">Architectural Solutions</span>
                </TextReveal>
                <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-bold font-windoor-main max-w-4xl text-windoor-primary leading-tight">
                    <TextReveal mode="words" delay={0.2} speed={0.06}>
                        Glazing Systems Engineered for Precision.
                    </TextReveal>
                </h1>
                <TextReveal mode="block" delay={0.5}>
                    <p className="text-base sm:text-lg text-windoor-secondary max-w-2xl mt-4 sm:mt-6">
                        Explore our comprehensive catalog of high-performance architectural systems, designed to bridge the gap between structural integrity and aesthetic transparency.
                    </p>
                </TextReveal>
            </header>

            {/* Systems Sections */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto space-y-16 sm:space-y-24 lg:space-y-32 pb-16 sm:pb-32">

                {/* Sliding Systems */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 border-t border-windoor-structural-grey/40 pt-10 sm:pt-12">
                    <div className="md:col-span-4">
                        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main text-windoor-primary md:sticky top-32">
                            <TextReveal mode="words">Sliding Systems</TextReveal>
                        </h2>
                        <TextReveal mode="block" delay={0.3}>
                            <p className="text-windoor-secondary mt-4 text-sm leading-relaxed">{systems[0].desc}</p>
                        </TextReveal>
                    </div>
                    <div className="md:col-span-8 space-y-6 sm:space-y-8">
                        <div data-cursor="view" className="relative group">
                            <ImageReveal className="w-full grayscale brightness-95" src={systems[0].img} alt="Sliding Systems" aspectClass="aspect-video" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {systems[0].specs.map((spec) => (
                                <div key={spec.num} className={`p-6 sm:p-8 border border-windoor-secondary bg-white cursor-pointer group premium-card ${spec.wide ? 'sm:col-span-2' : ''}`} data-cursor="explore">
                                    <span className="font-windoor-main text-xs text-windoor-secondary block mb-2">{spec.num} / TECH SPEC</span>
                                    <h3 className="text-lg sm:text-2xl font-windoor-main font-bold mb-3 sm:mb-4">{spec.title}</h3>
                                    <p className="text-windoor-secondary text-sm group-hover:text-windoor-primary transition-colors leading-relaxed">{spec.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Casement Systems */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 border-t border-windoor-structural-grey/40 pt-10 sm:pt-12">
                    <div className="md:col-span-4">
                        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main text-windoor-primary md:sticky top-32">
                            <TextReveal mode="words">Casement Systems</TextReveal>
                        </h2>
                        <TextReveal mode="block" delay={0.3}>
                            <p className="text-windoor-secondary mt-4 text-sm leading-relaxed">{systems[1].desc}</p>
                        </TextReveal>
                    </div>
                    <div className="md:col-span-8">
                        <div className="space-y-4">
                            {systems[1].items.map((item, i) => (
                                <div key={i} className="border border-windoor-secondary premium-card overflow-hidden">
                                    <button onClick={() => toggle(i)} className="flex justify-between items-center p-6 sm:p-8 cursor-pointer w-full text-left bg-windoor-container-low transition-colors duration-300">
                                        <h3 className="text-base sm:text-xl md:text-2xl font-windoor-main font-bold pr-4">{item.title}</h3>
                                        <span className={`transition-transform duration-300 text-xl shrink-0 ${openItems[i] ? 'rotate-180' : ''}`}>↓</span>
                                    </button>
                                    {openItems[i] && (
                                        <div className="p-6 sm:p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 bg-windoor-container-low border-t border-windoor-secondary/20">
                                            <p className="text-windoor-secondary text-sm leading-relaxed">{item.body}</p>
                                            {item.features && (
                                                <ul className="space-y-2">
                                                    {item.features.map((f) => (
                                                        <li key={f} className="flex items-center gap-2 font-windoor-main text-xs uppercase text-windoor-primary">
                                                            <span className="w-1.5 h-1.5 bg-windoor-primary rounded-full shrink-0"></span> {f}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Minimalist Series — Bento */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 border-t border-windoor-structural-grey/40 pt-10 sm:pt-12">
                    <div className="md:col-span-12 mb-4 sm:mb-8">
                        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main text-windoor-primary">
                            <TextReveal mode="words">Minimalist Series</TextReveal>
                        </h2>
                    </div>
                    <div className="md:col-span-7 h-75 sm:h-100 lg:h-125 border border-windoor-secondary relative overflow-hidden group" data-cursor="view">
                        <ImageReveal className="absolute inset-0 w-full h-full grayscale" src={systems[2].img} alt="Minimalist Series" aspectClass="h-full w-full" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent p-8 sm:p-12 flex flex-col justify-end z-10">
                            <span className="text-white/60 font-windoor-main text-xs mb-2 uppercase">The Pinnacle of Glazing</span>
                            <h3 className="text-white font-windoor-main font-bold text-2xl sm:text-3xl">Minimal 4+</h3>
                        </div>
                    </div>
                    <div className="md:col-span-5 grid grid-rows-1 md:grid-rows-2 gap-6 sm:gap-8">
                        <div className="p-8 sm:p-12 border border-windoor-secondary flex flex-col justify-between bg-white hover:bg-windoor-container-low transition-colors duration-500 premium-card">
                            <div>
                                <h4 className="text-lg sm:text-2xl font-windoor-main font-bold mb-2">NGS System</h4>
                                <p className="text-windoor-secondary text-sm leading-relaxed">Next Generation Slender profiles featuring recessed floor tracks for a true flush-threshold finish.</p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <span className="px-3 py-1 border border-windoor-primary font-windoor-main text-[10px] uppercase">Ultra Slim</span>
                                <span className="px-3 py-1 border border-windoor-primary font-windoor-main text-[10px] uppercase">Invisible Frame</span>
                            </div>
                        </div>
                        <div className="p-8 sm:p-12 border border-windoor-secondary bg-windoor-charcoal text-white flex flex-col justify-center premium-card">
                            <h4 className="text-lg sm:text-2xl font-windoor-main font-bold mb-4">Engineering Excellence</h4>
                            <p className="text-windoor-secondary text-sm leading-relaxed">Profiles as thin as 20mm with the capability to support glass panels weighing up to 1,000kg.</p>
                            <a className="mt-6 flex items-center gap-2 font-windoor-main text-xs uppercase tracking-widest text-white hover:gap-4 transition-all" href="#">Technical Catalog →</a>
                        </div>
                    </div>
                </div>

                {/* Specialized Systems */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 border-t border-windoor-structural-grey/40 pt-10 sm:pt-12">
                    {specialized.map((s) => (
                        <div key={s.title} className="p-6 sm:p-8 border border-windoor-secondary bg-white hover:border-windoor-primary transition-colors premium-card" data-cursor="explore">
                            <span className="text-3xl sm:text-4xl mb-4 sm:mb-6 block">{s.icon}</span>
                            <h3 className="text-lg sm:text-2xl font-windoor-main font-bold mb-3 sm:mb-4">{s.title}</h3>
                            <p className="text-windoor-secondary text-sm mb-6 sm:mb-8 leading-relaxed">{s.desc}</p>
                            <ul className="font-windoor-main text-[11px] uppercase tracking-wider space-y-2 text-windoor-primary">
                                {s.features.map((f) => <li key={f} className="pb-2 border-b border-windoor-secondary/30">{f}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Performance Certification */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto py-12 sm:py-20 border-y border-windoor-structural-grey/40 bg-windoor-container-low">
                <TextReveal mode="block">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-12">
                        <div className="max-w-md">
                            <h2 className="text-lg sm:text-2xl font-windoor-main font-bold mb-4 uppercase tracking-tighter">Performance Certification</h2>
                            <p className="text-windoor-secondary text-sm leading-relaxed">All Windoor systems undergo rigorous testing in controlled environments to ensure they meet international standards for wind load, water tightness, and air permeability.</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full md:w-auto">
                            {[
                                { value: '0.8', unit: 'U-Value (W/m²K)' },
                                { value: '600', unit: 'Water Tight (Pa)' },
                                { value: '48', unit: 'Sound Red (dB)' },
                                { value: '3.5m', unit: 'Max Panel Height' },
                            ].map((stat) => (
                                <div key={stat.unit} className="text-center">
                                    <div className="font-windoor-main text-2xl sm:text-4xl font-bold text-windoor-primary mb-2">{stat.value}</div>
                                    <div className="font-windoor-main text-[10px] uppercase text-windoor-secondary">{stat.unit}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TextReveal>
            </section>

            <Footer />
        </main>
    )
}

export default SystemsPage
