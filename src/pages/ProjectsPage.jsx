import { Link } from 'react-router'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'

const projects = [
    { id: 1, title: 'Villa Zenith', location: 'Ahmedabad, Gujarat', type: 'Residential', system: 'SLIMLINE SLIDER', finish: 'ANODIZED BLACK', year: '2023', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_IC0U17ysGAzEVw3lPm7GrCRhZo5Ka6RqnWGpbRb3ORrnXLyyUAZwCLcfVLXCcVnonNsG8iRrE7eMa01khafPRAGRKU0yHGRFrc_kT--wTa414h5rX7dAKuAJAs9vZsnGVr6K2-HA7NKsQ2_82BDUq-_XzmeZYg4eBcU24YAiAJFp6ch79s-IhXwQM1IYHzSc6bm6jDdtKGD6Knb5jgHvNIc4ihYedQ-h3uC-VuPCbMx6OoQkDGUfitXZOs9nh4lNl-cQqk7sh0c', slug: 'villa-zenith' },
    { id: 2, title: 'The Glass Pavilion', location: 'Rajkot, Gujarat', type: 'Villa', system: 'LIFT & SLIDE', finish: 'BRUSHED STEEL', year: '2024', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBewzlqSH3bka3_-luNyRnnOSlVjxt1_nZzcfaBb02jZIltdF4SGRllLz3CZhkCazW6s7bLPSBOMmqkTxL_Uapmkme13r5pSE15JRasAm1l9rjjwsDTGZUuzlK5B51GN_mjgktKLTZjI76ge6U0lGgopYre4AT7dj4KG2aAe6nauVlX90B_wDx-XiD-jjMTr_UtDOzs6KKjMmXuYdeNPAYaU6Fv1HVX_dFHiQLqCTSeJeGmvEHsP2jlGTxq7froUvb3Te28L8HOU-8', slug: 'glass-pavilion' },
    { id: 3, title: 'Surat Corporate Hub', location: 'Surat, Gujarat', type: 'Commercial', system: 'CURTAIN WALL', finish: 'MATTE ANTHRACITE', year: '2022', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAarAhIZFOgArrgwu_YF3b_8VO-icGZ59DadE7-BKSkwlA7EXl5FHi5NZ8uz3xuKAHcVbSi9Z3QDh4UIg0-T3gUuA7uF3g0-xDFcyG9ReeCmZWOztKrJQMuMZ9ULsYeAWSEBXDUnJU6nRbPcrUqsrciHxnEqrwdkZDqHX_XAgPa2LBvKDGgvtSRaNcC2cTq25lEe9OW0FzZYI8JvL4cUGKBjN_eOzt25la6AJtaWEcncIjBZ_fzpgnDHcMAmmrfa5XmfV7bFpByfGI', slug: 'surat-hub' },
    { id: 4, title: 'Skyline Penthouse', location: 'Vadodara, Gujarat', type: 'Penthouse', system: 'PANORAMIC FIXED', finish: 'CHAMPAGNE GOLD', year: '2023', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmpxckI9kpMmbOPOp_npxGtwKzNiW6FTykynnKN1gJB_R4YUjU_fac1-OdtuHb3rpbeWCdaLoDyPSOsv4ZDm0Al0qRGzdqFBhaumCOP-X0O9EE_o6PGcDq21_3oPyae4nimCmpRhe498ExvAvkTWVv9_JjMLU4pIgE00cqz3UFN7pd9VMwAPKZmPa46VU4xvoOSFIUtMGbDY7jnXz5GWiFKccte6p-5IXtNgMX9gr3Oq-sLh2CG1ZTwk2bU7T82hCojo9_WVUjkcA', slug: 'skyline-penthouse' },
]

const ProjectsPage = () => {
    return (
        <main className="pt-18">

            {/* Hero */}
            <header className="px-6 sm:px-16 max-w-360 mx-auto pt-20 sm:pt-32 lg:pt-40 mb-12 sm:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                    <div className="col-span-12 lg:col-span-8">
                        <TextReveal mode="words">
                            <span className="font-windoor-main uppercase tracking-widest text-xs text-windoor-secondary mb-4 block">Portfolio</span>
                        </TextReveal>
                        <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-bold font-windoor-main text-windoor-primary mb-6 sm:mb-8 leading-tight">
                            <TextReveal mode="words" delay={0.2} speed={0.06}>
                                Selected Architectural Works.
                            </TextReveal>
                        </h1>
                        <TextReveal mode="block" delay={0.5}>
                            <p className="text-base sm:text-lg text-windoor-secondary max-w-2xl leading-relaxed">
                                A curated showcase of precision engineering and aesthetic excellence. From private luxury villas in Ahmedabad to commercial landmarks across Gujarat, our glazing systems define the boundary between interior comfort and exterior grandeur.
                            </p>
                        </TextReveal>
                    </div>
                    <div className="col-span-12 lg:col-span-4 flex items-end lg:justify-end">
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            <button className="font-windoor-main text-xs uppercase border border-windoor-secondary px-4 sm:px-6 py-2 sm:py-3 hover:bg-windoor-primary hover:text-white transition-all">Filter by Type ↓</button>
                            <button className="font-windoor-main text-xs uppercase border border-windoor-secondary px-4 sm:px-6 py-2 sm:py-3 hover:bg-windoor-primary hover:text-white transition-all">Location ⌖</button>
                        </div>
                    </div>
                </div>
                <div className="h-px bg-windoor-structural-grey/40 mt-10 sm:mt-16 w-full"></div>
            </header>

            {/* Project Grid */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto pb-16 sm:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 sm:gap-y-24 gap-x-8">
                    {projects.map((project, i) => (
                        <article key={project.id} className={`group cursor-pointer premium-card p-4 border border-windoor-secondary/30 bg-white ${i % 2 === 1 ? 'md:mt-20 lg:mt-32' : ''}`} data-cursor="explore">
                            <div className="aspect-4/5 overflow-hidden bg-windoor-container mb-6 sm:mb-8 relative">
                                <ImageReveal src={project.img} alt={project.title} aspectClass="h-full w-full" delay={i * 0.1} />
                                <div className="absolute top-6 left-6 z-10">
                                    <span className="bg-windoor-primary/90 text-white font-windoor-main text-xs px-3 sm:px-4 py-1 uppercase tracking-widest backdrop-blur-sm">{project.type}</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 bg-transparent">
                                <div>
                                    <h2 className="text-lg sm:text-2xl font-windoor-main font-bold text-windoor-primary mb-2">{project.title}</h2>
                                    <p className="font-windoor-main text-xs text-windoor-secondary uppercase tracking-widest">⌖ {project.location}</p>
                                </div>
                                <Link to={`/projects/${project.slug}`} className="shrink-0 border border-windoor-primary px-6 sm:px-8 py-3 sm:py-4 font-windoor-main text-xs uppercase tracking-widest transition-all duration-300 group-hover:bg-windoor-primary group-hover:text-white">
                                    View Project
                                </Link>
                            </div>

                            <div className="mt-4 sm:mt-6 font-windoor-main text-xs text-windoor-secondary grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-t border-windoor-secondary/20 pt-4 sm:pt-6 bg-transparent">
                                <span>SYSTEM: {project.system}</span>
                                <span>FINISH: {project.finish}</span>
                                <span>YEAR: {project.year}</span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Load More */}
                <div className="mt-16 sm:mt-32 flex flex-col items-center gap-6 sm:gap-8">
                    <div className="h-px bg-windoor-structural-grey/40 w-24"></div>
                    <button className="bg-windoor-charcoal text-white font-windoor-main text-xs uppercase tracking-[0.2em] px-8 sm:px-12 py-4 sm:py-5 hover:bg-windoor-primary transition-colors">Explore More Projects</button>
                    <p className="font-windoor-main text-xs text-windoor-secondary">Showing 4 of 28 landmark projects</p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-windoor-container-low border-y border-windoor-structural-grey/40 px-6 sm:px-16 py-16 sm:py-24 lg:py-32">
                <TextReveal mode="block">
                    <div className="max-w-360 mx-auto text-center">
                        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold font-windoor-main text-windoor-primary mb-6 sm:mb-8 uppercase">Ready to define your space?</h2>
                        <p className="text-base sm:text-lg text-windoor-secondary mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">Collaborate with our technical team to bring architectural precision to your next project.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                            <button className="btn font-windoor-main text-xs uppercase tracking-widest px-8 sm:px-10 py-4">Download Portfolio</button>
                            <button className="border-2 border-windoor-primary text-windoor-primary font-windoor-main text-xs uppercase tracking-widest px-8 sm:px-10 py-4 hover:bg-windoor-primary hover:text-white transition-all">Technical Specs</button>
                        </div>
                    </div>
                </TextReveal>
            </section>

            <Footer />
        </main>
    )
}

export default ProjectsPage
