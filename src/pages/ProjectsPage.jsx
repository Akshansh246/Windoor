import { Link } from 'react-router'
import { useState } from 'react'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'
import { projects } from '../data/projectData'
import useSEO from '../hooks/useSEO'

const ProjectsPage = () => {
    useSEO({
        title: "Select Projects & Architectural Portfolio - Windoor",
        description: "Browse Windoor's portfolio of landmark residential and commercial projects. Explore luxury villas and premium estates featuring minimal glazing solutions."
    })

    const [filter, setFilter] = useState('ALL');
    const [locationFilter, setLocationFilter] = useState('ALL');

    const toggleFilter = () => {
        const types = ['ALL', 'RESIDENTIAL', 'COMMERCIAL', 'VILLA', 'PENTHOUSE'];
        const nextIdx = (types.indexOf(filter) + 1) % types.length;
        setFilter(types[nextIdx]);
    };

    const toggleLocation = () => {
        const locations = ['ALL', 'AHMEDABAD', 'RAJKOT', 'SURAT', 'VADODARA'];
        const nextIdx = (locations.indexOf(locationFilter) + 1) % locations.length;
        setLocationFilter(locations[nextIdx]);
    };

    const filteredProjects = projects.filter(p => {
        const matchesType = filter === 'ALL' || p.type.toUpperCase() === filter;
        const matchesLoc = locationFilter === 'ALL' || p.location.toUpperCase().includes(locationFilter);
        return matchesType && matchesLoc;
    });

    return (
        <main>

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
                                A curated showcase of precision engineering and aesthetic excellence. From private luxury villas in Ahmedabad to commercial landmarks across Gujarat, our glazing products define the boundary between interior comfort and exterior grandeur.
                            </p>
                        </TextReveal>
                    </div>
                    <div className="col-span-12 lg:col-span-4 flex items-end lg:justify-end">
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            <button 
                                onClick={toggleFilter}
                                className="font-windoor-main text-xs uppercase border border-windoor-secondary px-4 sm:px-6 py-2 sm:py-3 hover:bg-windoor-primary hover:text-white transition-all cursor-pointer"
                            >
                                Type: {filter === 'ALL' ? 'All' : filter} ↓
                            </button>
                            <button 
                                onClick={toggleLocation}
                                className="font-windoor-main text-xs uppercase border border-windoor-secondary px-4 sm:px-6 py-2 sm:py-3 hover:bg-windoor-primary hover:text-white transition-all cursor-pointer"
                            >
                                City: {locationFilter === 'ALL' ? 'All' : locationFilter} ⌖
                            </button>
                        </div>
                    </div>
                </div>
                <div className="h-px bg-windoor-structural-grey/40 mt-10 sm:mt-16 w-full"></div>
            </header>

            {/* Project Grid */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto pb-16 sm:pb-32">
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-20 border border-windoor-secondary/20">
                        <p className="font-windoor-main text-sm text-windoor-secondary uppercase tracking-widest">No matching projects found.</p>
                        <button 
                            onClick={() => { setFilter('ALL'); setLocationFilter('ALL'); }}
                            className="mt-6 font-windoor-main text-xs uppercase border border-windoor-primary px-6 py-3 hover:bg-windoor-primary hover:text-white transition-all cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 sm:gap-y-24 gap-x-8">
                        {filteredProjects.map((project, i) => (
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
                                    <Link to={`/projects/${project.slug}`} className="shrink-0 border border-windoor-primary px-6 sm:px-8 py-3 sm:py-4 font-windoor-main text-xs uppercase tracking-widest transition-all duration-300 group-hover:bg-windoor-primary group-hover:text-white text-center">
                                        View Project
                                    </Link>
                                </div>

                                <div className="mt-4 sm:mt-6 font-windoor-main text-xs text-windoor-secondary grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-t border-windoor-secondary/20 pt-4 sm:pt-6 bg-transparent">
                                    <span>PRODUCT: {project.system}</span>
                                    <span>FINISH: {project.finish}</span>
                                    <span>YEAR: {project.year}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Counter */}
                {filteredProjects.length > 0 && (
                    <div className="mt-16 sm:mt-24 flex flex-col items-center gap-4">
                        <div className="h-px bg-windoor-structural-grey/40 w-24"></div>
                        <p className="font-windoor-main text-xs text-windoor-secondary">
                            Showing {filteredProjects.length} of {projects.length} landmark projects
                        </p>
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="bg-windoor-container-low border-y border-windoor-structural-grey/40 px-6 sm:px-16 py-16 sm:py-24 lg:py-32">
                <TextReveal mode="block">
                    <div className="max-w-360 mx-auto text-center">
                        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold font-windoor-main text-windoor-primary mb-6 sm:mb-8 uppercase">Ready to define your space?</h2>
                        <p className="text-base sm:text-lg text-windoor-secondary mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">Collaborate with our technical team to bring architectural precision to your next project.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                            <Link to="/contact" className="btn font-windoor-main text-xs uppercase tracking-widest px-8 sm:px-10 py-4 text-center">Request a Consultation</Link>
                            <Link to="/showrooms" className="border-2 border-windoor-primary text-windoor-primary font-windoor-main text-xs uppercase tracking-widest px-8 sm:px-10 py-4 hover:bg-windoor-primary hover:text-white transition-all text-center">Visit Experience Center</Link>
                        </div>
                    </div>
                </TextReveal>
            </section>

            <Footer />
        </main>
    )
}

export default ProjectsPage
