import { Link } from 'react-router'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import { termsOfService } from '../data/legalData'

const TermsPage = () => {
    return (
        <main className="pt-18">
            {/* Header */}
            <header className="px-6 sm:px-16 max-w-360 mx-auto pt-20 sm:pt-28 lg:pt-32 mb-16 sm:mb-24">
                <TextReveal mode="words">
                    <span className="font-windoor-main uppercase tracking-widest text-xs text-windoor-secondary block mb-4">Agreement</span>
                </TextReveal>
                <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-bold font-windoor-main max-w-4xl text-windoor-primary leading-tight">
                    <TextReveal mode="words" delay={0.2} speed={0.06}>
                        {termsOfService.title}
                    </TextReveal>
                </h1>
                <TextReveal mode="block" delay={0.5}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-4 sm:mt-6">
                        <p className="text-base sm:text-lg text-windoor-secondary max-w-xl">
                            {termsOfService.subtitle}
                        </p>
                        <span className="font-windoor-main text-xs uppercase text-windoor-secondary tracking-widest block shrink-0">
                            Last Updated: {termsOfService.lastUpdated}
                        </span>
                    </div>
                </TextReveal>
                <div className="h-px bg-windoor-structural-grey/40 mt-10 sm:mt-16 w-full"></div>
            </header>

            {/* Content Sections */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto pb-20 sm:pb-32 lg:pb-40">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
                    {/* Sticky Sidebar Navigation */}
                    <aside className="md:col-span-4 hidden md:block">
                        <div className="sticky top-32 space-y-4">
                            <span className="font-windoor-main text-[11px] uppercase tracking-[0.2em] text-windoor-primary/40 block mb-6">Table of Contents</span>
                            <ul className="space-y-3 font-windoor-main text-xs uppercase tracking-widest">
                                {termsOfService.sections.map((sec) => (
                                    <li key={sec.id}>
                                        <a 
                                            href={`#${sec.id}`}
                                            className="text-windoor-secondary hover:text-windoor-primary transition-colors block py-1 border-l border-transparent hover:border-windoor-primary pl-4"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }}
                                        >
                                            {sec.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-8">
                                <Link to="/" className="font-windoor-main text-xs uppercase tracking-widest text-windoor-primary hover:underline underline-offset-4">← Back to Home</Link>
                            </div>
                        </div>
                    </aside>

                    {/* Main Text Content */}
                    <div className="md:col-span-8 md:col-start-5 space-y-12 sm:space-y-16">
                        {termsOfService.sections.map((sec) => (
                            <div key={sec.id} id={sec.id} className="scroll-mt-32 space-y-4 border-b border-windoor-secondary/10 pb-10 sm:pb-12 last:border-0 last:pb-0">
                                <h2 className="text-lg sm:text-xl font-bold font-windoor-main text-windoor-primary uppercase tracking-tight">
                                    {sec.title}
                                </h2>
                                <p className="text-sm sm:text-base text-windoor-text-muted leading-relaxed max-w-2xl font-light">
                                    {sec.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default TermsPage
