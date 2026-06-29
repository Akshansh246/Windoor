import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'
import NotFoundPage from './NotFoundPage'
import { projects } from '../data/projectData'

const VideoReveal = ({ src }) => {
    const containerRef = useRef(null)
    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={containerRef}
            className={`image-reveal-container h-full w-full ${isIntersecting ? 'active' : ''}`}
        >
            <video
                src={src}
                className="image-reveal-img w-full h-full object-cover"
                muted
                autoPlay
                loop
                playsInline
            />
        </div>
    )
}

const ProjectDetailPage = () => {
    const { slug } = useParams()
    
    // Find project by slug
    const project = projects.find(p => p.slug === slug)
    
    const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 })
    
    if (!project) {
        return <NotFoundPage />
    }

    const projectImages = [
        project.heroImg ? { src: project.heroImg, label: `${project.title} - Main Exterior` } : null,
        project.gallery?.main?.img ? { src: project.gallery.main.img, label: project.gallery.main.title } : null,
        ...(project.gallery?.grid || []).map((g, i) => g.img ? { src: g.img, label: `${project.title} - Detail 0${i + 1}` } : null)
    ].filter(Boolean)

    const openLightbox = (imageSrc) => {
        const index = projectImages.findIndex(img => img.src === imageSrc)
        if (index !== -1) {
            setLightbox({ isOpen: true, index })
        }
    }

    const closeLightbox = () => {
        setLightbox({ isOpen: false, index: 0 })
    }

    const nextImage = (e) => {
        if (e) e.stopPropagation()
        setLightbox((prev) => ({
            ...prev,
            index: (prev.index + 1) % projectImages.length
        }))
    }

    const prevImage = (e) => {
        if (e) e.stopPropagation()
        setLightbox((prev) => ({
            ...prev,
            index: (prev.index - 1 + projectImages.length) % projectImages.length
        }))
    }

    useEffect(() => {
        if (!lightbox.isOpen) return

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                nextImage()
            } else if (e.key === 'ArrowLeft') {
                prevImage()
            } else if (e.key === 'Escape') {
                closeLightbox()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [lightbox.isOpen])

    return (
        <main>

            {/* Project Hero */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto pt-20 sm:pt-24 mb-16 sm:mb-24 lg:mb-32">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 gap-6">
                    <div className="max-w-3xl">
                        <TextReveal mode="words">
                            <span className="font-windoor-main uppercase tracking-widest text-xs text-windoor-secondary mb-4 block">{project.category}</span>
                        </TextReveal>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-windoor-main leading-tight mb-6">
                            <TextReveal mode="words" delay={0.2}>{project.title}</TextReveal>
                        </h1>
                        <div className="flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-4">
                            {[
                                ['Location', project.location], 
                                ['Year', project.year], 
                                ['Architect', project.architect]
                            ].map(([k, v]) => (
                                <div key={k} className="flex flex-col">
                                    <span className="font-windoor-main text-xs text-windoor-secondary uppercase">{k}</span>
                                    <span className="text-sm">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link to="/projects" className="font-windoor-main text-xs uppercase tracking-widest text-windoor-secondary hover:text-windoor-primary flex items-center gap-2 transition-colors shrink-0">← Back to Portfolio</Link>
                </div>

                {project.heroImg ? (
                    <div 
                        className="relative w-full aspect-video sm:aspect-21/9 overflow-hidden group cursor-pointer" 
                        data-cursor="view"
                        onClick={() => openLightbox(project.heroImg)}
                    >
                        <ImageReveal src={project.heroImg} alt={project.title} aspectClass="h-full w-full" />
                    </div>
                ) : project.heroVid ? (
                    <div className="relative w-full aspect-video sm:aspect-21/9 overflow-hidden">
                        <VideoReveal src={project.heroVid} />
                    </div>
                ) : null}
            </section>

            {/* Narrative */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto mb-16 sm:mb-24 lg:mb-40">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
                    <div className="col-span-12 md:col-span-4">
                        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main md:sticky top-32">
                            <TextReveal mode="words">{project.narrativeTitle}</TextReveal>
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 sm:space-y-8">
                        <TextReveal mode="block" delay={0.2}>
                            <p className="text-base sm:text-lg text-windoor-text-muted leading-relaxed">{project.narrativeText1}</p>
                        </TextReveal>
                        <TextReveal mode="block" delay={0.4}>
                            <p className="text-sm text-windoor-secondary leading-relaxed">{project.narrativeText2}</p>
                        </TextReveal>
                        <div className="pt-6 sm:pt-8 grid grid-cols-2 gap-6 sm:gap-8 border-t border-windoor-structural-grey">
                            {project.metrics.map((metric, idx) => (
                                <div key={idx}>
                                    <span className="font-windoor-main text-xs block mb-2 text-windoor-primary">{metric.value}</span>
                                    <span className="text-sm text-windoor-secondary">{metric.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto mb-16 sm:mb-24 lg:mb-40">
                <div className="grid grid-cols-12 gap-4 sm:gap-8">
                    {project.gallery?.main?.img && (
                        <div 
                            className="col-span-12 md:col-span-8 aspect-4/3 overflow-hidden border border-windoor-secondary relative group cursor-pointer" 
                            data-cursor="view"
                            onClick={() => openLightbox(project.gallery.main.img)}
                        >
                            <ImageReveal src={project.gallery.main.img} alt={project.gallery.main.title} aspectClass="h-full w-full" />
                        </div>
                    )}
                    <div className="col-span-12 md:col-span-4 aspect-square bg-white border border-windoor-secondary p-6 sm:p-12 flex flex-col justify-between premium-card">
                        <div>
                            <span className="font-windoor-main text-xs text-windoor-primary mb-4 block">TECH DETAIL 01</span>
                            <h3 className="text-lg sm:text-2xl font-windoor-main font-bold">{project.gallery?.main?.title}</h3>
                        </div>
                        <p className="font-windoor-main text-xs text-windoor-secondary leading-relaxed">{project.gallery?.main?.desc}</p>
                    </div>
                    {(project.gallery?.grid || []).map((g, i) => g.img && (
                        <div 
                            key={i} 
                            className="col-span-12 md:col-span-4 aspect-square overflow-hidden border border-windoor-secondary relative group cursor-pointer animate-card animate-duration-700" 
                            data-cursor="view"
                            onClick={() => openLightbox(g.img)}
                        >
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
                            <span className="font-windoor-main text-xs text-windoor-primary uppercase">Products Used</span>
                            <ul className="space-y-2 bg-transparent">
                                {project.specs[0].items.map((item) => (
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
                                    {project.specs[1].tags.map((tag) => <span key={tag} className="px-3 py-1 border border-windoor-primary font-windoor-main text-xs uppercase">{tag}</span>)}
                                </div>
                                <p className="text-sm text-windoor-secondary leading-relaxed">{project.specs[1].desc}</p>
                            </div>
                        </div>
                        <div className="p-6 sm:p-8 border border-windoor-secondary bg-white space-y-4 premium-card">
                            <span className="font-windoor-main text-xs text-windoor-primary uppercase">Finish & Materials</span>
                            <div className="space-y-4 bg-transparent">
                                {project.specs[2].swatches.map((swatch) => (
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
            <Link to={`/projects/${project.nextProject.slug}`} className="block border-y border-windoor-structural-grey/40 overflow-hidden group cursor-pointer" data-cursor="explore">
                <div className="px-6 sm:px-16 max-w-360 mx-auto py-12 sm:py-20 lg:py-24 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                    <div>
                        <span className="font-windoor-main text-xs text-windoor-secondary uppercase tracking-widest block mb-4">Next Project</span>
                        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold font-windoor-main leading-tight group-hover:translate-x-4 transition-transform duration-1000 ease-out">{project.nextProject.title}</h2>
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-windoor-primary flex items-center justify-center group-hover:bg-windoor-primary group-hover:text-white transition-all duration-700 shrink-0">
                        <span className="text-xl transition-transform group-hover:translate-x-1 duration-300">→</span>
                    </div>
                </div>
            </Link>

            {/* Lightbox / Fullscreen Preview Modal */}
            {lightbox.isOpen && projectImages.length > 0 && (
                <div 
                    className="fixed inset-0 bg-neutral-950/98 z-[99999] flex flex-col justify-center items-center p-4 md:p-8 cursor-zoom-out select-none"
                    onClick={closeLightbox}
                >
                    {/* Top bar with counter and Close */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[100000]">
                        <div className="text-white/60 font-windoor-main text-xs uppercase tracking-widest bg-neutral-900/40 px-3 py-1.5 border border-white/5 backdrop-blur-sm select-none">
                            {String(lightbox.index + 1).padStart(2, '0')} / {String(projectImages.length).padStart(2, '0')}
                        </div>
                        <button 
                            className="text-white/80 hover:text-white font-windoor-main text-xs uppercase tracking-widest bg-neutral-900/40 hover:bg-neutral-800/80 px-4 py-2 border border-white/10 hover:border-white/20 transition-all cursor-pointer backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeLightbox();
                            }}
                        >
                            Close ✕
                        </button>
                    </div>

                    {/* Navigation Buttons */}
                    {projectImages.length > 1 && (
                        <>
                            {/* Left Chevron */}
                            <button
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-neutral-900/40 hover:bg-neutral-800/80 p-3 md:p-4 border border-white/5 hover:border-white/20 transition-all cursor-pointer z-[100000] backdrop-blur-sm"
                                onClick={prevImage}
                                aria-label="Previous Image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            {/* Right Chevron */}
                            <button
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-neutral-900/40 hover:bg-neutral-800/80 p-3 md:p-4 border border-white/5 hover:border-white/20 transition-all cursor-pointer z-[100000] backdrop-blur-sm"
                                onClick={nextImage}
                                aria-label="Next Image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </>
                    )}
                    
                    {/* Main Image Container */}
                    <div 
                        className="relative max-w-full max-h-[75vh] md:max-h-[80vh] flex items-center justify-center cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={projectImages[lightbox.index].src} 
                            alt={projectImages[lightbox.index].label} 
                            className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain select-none border border-white/10 shadow-2xl transition-all duration-300"
                            key={lightbox.index}
                        />
                    </div>
                    
                    {/* Label/Title */}
                    {projectImages[lightbox.index].label && (
                        <p className="text-white/80 font-windoor-main text-[11px] md:text-xs uppercase tracking-[0.2em] mt-6 bg-neutral-900/40 border border-white/5 px-4 py-2 backdrop-blur-sm text-center max-w-md">
                            {projectImages[lightbox.index].label}
                        </p>
                    )}
                </div>
            )}

            <Footer />
        </main>
    )
}

export default ProjectDetailPage
