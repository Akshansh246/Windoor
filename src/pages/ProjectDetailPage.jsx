import { Link } from 'react-router'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'

const ProjectDetailPage = () => {

    const specs = [
        { title: 'Systems Used', items: ['W-700 Ultravue', 'P-40 Pivot Door', 'S-Sky Skylights'] },
        { title: 'Glass Composition', tags: ['Triple Glazed', 'Low-E Coating', 'Acoustic PVB'], desc: 'Solar control glass with 70/35 selectivity, ensuring high light transmission while rejecting infrared heat.' },
        { title: 'Finish & Materials', swatches: [{ color: 'bg-windoor-primary', label: 'Anodized Obsidian Black' }, { color: 'bg-windoor-secondary', label: 'Bead-blasted Stainless Steel' }] },
    ]

    return (
        <main className="pt-18">

            {/* Project Hero */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto pt-20 sm:pt-24 mb-16 sm:mb-24 lg:mb-32">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 gap-6">
                    <div className="max-w-3xl">
                        <TextReveal mode="words">
                            <span className="font-windoor-main uppercase tracking-widest text-xs text-windoor-secondary mb-4 block">Residential / Luxury Portfolio</span>
                        </TextReveal>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-windoor-main leading-tight mb-6">
                            <TextReveal mode="words" delay={0.2}>Villa Zenith</TextReveal>
                        </h1>
                        <div className="flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-4">
                            {[['Location', 'Ahmedabad, Gujarat'], ['Year', '2023'], ['Architect', 'Studio Marone']].map(([k, v]) => (
                                <div key={k} className="flex flex-col">
                                    <span className="font-windoor-main text-xs text-windoor-secondary uppercase">{k}</span>
                                    <span className="text-sm">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link to="/projects" className="font-windoor-main text-xs uppercase tracking-widest text-windoor-secondary hover:text-windoor-primary flex items-center gap-2 transition-colors shrink-0">← Back to Portfolio</Link>
                </div>

                <div className="relative w-full aspect-video sm:aspect-21/9 overflow-hidden group" data-cursor="view">
                    <ImageReveal src="https://lh3.googleusercontent.com/aida-public/AB6AXuBklJxFswlyKIprKIyPkL4OBcklqP4VuN3At39SHhq4EW3fQDon81192NEcck1-Tbtirn3Yrwt4xwOwqTOGn7RrGvjhtR2U4fFsTSFzJEfJ7x8vK9QELMpUIiFJ0t5Cw4T87zIuZgmZ5bUnKF6QCsB8aeUtx5bRWHPd6Ex1wpIRC6WY7EzhFf2ZsuTP-dJ9FOlvr81mQWKsKRxCRKHl2CW6u3-9TmMqTw7zfjOTnLNCWD8yObqnKOPobniNslOH0-MFFAsCKVB3p4Q" alt="Villa Zenith" aspectClass="h-full w-full" />
                </div>
            </section>

            {/* Narrative */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto mb-16 sm:mb-24 lg:mb-40">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
                    <div className="col-span-12 md:col-span-4">
                        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main md:sticky top-32">
                            <TextReveal mode="words">The Vision of Transparency</TextReveal>
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 sm:space-y-8">
                        <TextReveal mode="block" delay={0.2}>
                            <p className="text-base sm:text-lg text-windoor-text-muted leading-relaxed">Villa Zenith represents the pinnacle of structural glazing. The challenge was to create an enclosure that offered zero visual interruption between the rugged coastline and the interior living spaces, while maintaining extreme thermal performance.</p>
                        </TextReveal>
                        <TextReveal mode="block" delay={0.4}>
                            <p className="text-sm text-windoor-secondary leading-relaxed">Our solution involved the custom-engineering of the W-700 Ultravue system, featuring 12-meter continuous glass spans with concealed tracks embedded directly into the structural floor slab. Every joint was calculated to withstand high-velocity coastal winds.</p>
                        </TextReveal>
                        <div className="pt-6 sm:pt-8 grid grid-cols-2 gap-6 sm:gap-8 border-t border-windoor-structural-grey">
                            <div>
                                <span className="font-windoor-main text-xs block mb-2 text-windoor-primary">0.8 W/m²K</span>
                                <span className="text-sm text-windoor-secondary">Thermal Transmittance</span>
                            </div>
                            <div>
                                <span className="font-windoor-main text-xs block mb-2 text-windoor-primary">48dB</span>
                                <span className="text-sm text-windoor-secondary">Acoustic Insulation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto mb-16 sm:mb-24 lg:mb-40">
                <div className="grid grid-cols-12 gap-4 sm:gap-8">
                    <div className="col-span-12 md:col-span-8 aspect-4/3 overflow-hidden border border-windoor-secondary relative group" data-cursor="view">
                        <ImageReveal src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnGYs_BMqIUj9J6-SW8pFM8Eo2Ru4wb_vH3urnv7F_0wQqSAlTQlBb2ACmwzxcGQrDeWX1PHdUxrvRy9BA9q-A5ThcJI7LDAQpNGmWykA9t8fgR1jEszBPidWnUJOUNM1eMZgasi3FI6EHi3zZ5H8F2buexFebWp-z0m0AdGAUFNlomz42rSBvBU8XF5ZSHvZzL0Nwv4kBAGz1Hx1iBWJsPFo4ZIDgApkFsMcLmEmcT_wLMtzB9JIxtIGErdZEfwyID71YijhNHKg" alt="Living area" aspectClass="h-full w-full" />
                    </div>
                    <div className="col-span-12 md:col-span-4 aspect-square bg-white border border-windoor-secondary p-6 sm:p-12 flex flex-col justify-between premium-card">
                        <div>
                            <span className="font-windoor-main text-xs text-windoor-primary mb-4 block">TECH DETAIL 01</span>
                            <h3 className="text-lg sm:text-2xl font-windoor-main font-bold">Concealed Threshold System</h3>
                        </div>
                        <p className="font-windoor-main text-xs text-windoor-secondary leading-relaxed">Custom-milled drainage tracks hidden beneath the perimeter stone to ensure a perfectly level transition with zero step-up.</p>
                    </div>
                    {[
                        { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAupNUDpPcU7r92eFFWA31XbZiM2dkYQ0qgJbQtPdw_PjokCNVCJ5bHji0ZhPJNrcDwNwiMB1bLeGnCpMmdqOhy8cevHltbD185SNA7BNP22uSQPl0kXQztfdVhdt8tXcxYM6ZXkOWKtrhnfoJuBFOIw0SAQrCexVInufDAbk5SxRPp9vlEzlOp96kolX4DhglgyPooeMNIAoQcRo_-kKfrC0f6Mr8vrH4dB6ZPf8vq4o7A4jpkQ_vHFwyVbNS34mM54tGNEVoE4SE', grayscale: true },
                        { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp3Q_mA_D4q0JmJmecWpU43GZbV_Ay_C9acZtoHmRY_AdrbKVqQQRJSudT1JRpDI050fHbbKbzOwKo7TmNlPRc7gkJ4JyQKlJ1cOlkQEr9Nd6wsMNewTlMMSsj1Phr3kkdpCjhvtXIsYflQIz5Vl48lyTvl_o9TGKZfigvfRKQAtT8SzSXAq4SbDI8W9_nSwemeasmLRji3phO-N43_auermZ1DIG9aBLZvYWhULM0ph0sXccFeskg4DCst6gnEfD8h0Qmuv0khz0', grayscale: false },
                        { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiQuEvnoboPt-cRZoW-DGzOTPVcvW0odjRRp0851RtpzcCvimveuA3i6MKsZxm9IVVF3R1tqSPMMOnUdLETngiAY3pnVjzaASLbmY6xLgQtkhlMT1fQtwFTtrHdkyvIuT0x79r2e7E0Vl--97xUodwQF7TybWUzQjT_mcuqxTaJLO_E_iXEkLcadg-TeHq81oeLBOaeEOxgq9_W4uDaZ4Q6WIwdBNc3eiYmZwIqMxq9MVpUB5sgwmouMK6sqS8C5qGrCkZp07VeJo', grayscale: true },
                    ].map((g, i) => (
                        <div key={i} className="col-span-12 md:col-span-4 aspect-square overflow-hidden border border-windoor-secondary relative group animate-card animate-duration-700" data-cursor="view">
                            <ImageReveal src={g.img} alt={`Gallery ${i + 3}`} aspectClass="h-full w-full" delay={i * 0.1} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Technical Specifications */}
            <section className="bg-windoor-container-low px-6 sm:px-16 py-16 sm:py-24 lg:py-32">
                <div className="max-w-360 mx-auto">
                    <h2 className="font-windoor-main text-xs uppercase tracking-[0.2em] mb-10 sm:mb-16 text-center text-windoor-secondary">Technical Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12">
                        <div className="p-6 sm:p-8 border border-windoor-secondary bg-white space-y-4 premium-card">
                            <span className="font-windoor-main text-xs text-windoor-primary uppercase">Systems Used</span>
                            <ul className="space-y-2 bg-transparent">
                                {specs[0].items.map((item) => (
                                    <li key={item} className="flex justify-between items-center border-b border-windoor-secondary/30 pb-2">
                                        <span className="text-sm">{item}</span>
                                        <span className="text-xs">↗</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-6 sm:p-8 border border-windoor-secondary bg-white space-y-4 premium-card">
                            <span className="font-windoor-main text-xs text-windoor-primary uppercase">Glass Composition</span>
                            <div className="space-y-3 bg-transparent">
                                <div className="flex flex-wrap gap-2">
                                    {specs[1].tags.map((tag) => <span key={tag} className="px-3 py-1 border border-windoor-primary font-windoor-main text-xs uppercase">{tag}</span>)}
                                </div>
                                <p className="text-sm text-windoor-secondary leading-relaxed">{specs[1].desc}</p>
                            </div>
                        </div>
                        <div className="p-6 sm:p-8 border border-windoor-secondary bg-white space-y-4 premium-card">
                            <span className="font-windoor-main text-xs text-windoor-primary uppercase">Finish & Materials</span>
                            <div className="space-y-4 bg-transparent">
                                {specs[2].swatches.map((swatch) => (
                                    <div key={swatch.label} className="flex items-center gap-4">
                                        <div className={`w-8 h-8 ${swatch.color} shrink-0`}></div>
                                        <span className="text-sm">{swatch.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project */}
            <section className="border-y border-windoor-structural-grey/40 overflow-hidden group cursor-pointer" data-cursor="explore">
                <div className="px-6 sm:px-16 max-w-360 mx-auto py-12 sm:py-20 lg:py-24 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                    <div>
                        <span className="font-windoor-main text-xs text-windoor-secondary uppercase tracking-widest block mb-4">Next Project</span>
                        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold font-windoor-main leading-tight group-hover:translate-x-4 transition-transform duration-1000 ease-out">The Obsidian Pavilion</h2>
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-windoor-primary flex items-center justify-center group-hover:bg-windoor-primary group-hover:text-white transition-all duration-700 shrink-0">
                        <span className="text-xl transition-transform group-hover:translate-x-1 duration-300">→</span>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default ProjectDetailPage
