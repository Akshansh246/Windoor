import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'

import { showrooms, hqContact } from '../data/showroomData'

const ContactPage = () => {
    return (
        <main className="pt-18">

            {/* Hero */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto pt-20 sm:pt-28 lg:pt-32 mb-12 sm:mb-20 lg:mb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end">
                    <div className="md:col-span-8">
                        <TextReveal mode="words">
                            <span className="font-windoor-main uppercase tracking-[0.2em] text-xs text-windoor-secondary mb-4 block">Get in touch</span>
                        </TextReveal>
                        <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-windoor-main text-windoor-primary max-w-3xl leading-tight">
                            <TextReveal mode="words" delay={0.2} speed={0.06}>
                                Architectural dialogue begins here.
                            </TextReveal>
                        </h1>
                    </div>
                    <div className="md:col-span-4 pb-4">
                        <TextReveal mode="block" delay={0.5}>
                            <p className="text-base sm:text-lg text-windoor-secondary border-l-2 border-windoor-structural-grey pl-6 sm:pl-8 py-2 leading-relaxed">
                                Whether you are an architect detailing a vision or a homeowner seeking clarity, our technical consultants are ready to assist.
                            </p>
                        </TextReveal>
                    </div>
                </div>
            </section>

            {/* Contact Info + Image Layout */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mb-16 sm:mb-24 lg:mb-32">

                {/* Headquarters Info Box */}
                <div className="md:col-span-6 bg-windoor-container-low border border-windoor-structural-grey/40 p-6 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col justify-between premium-card">
                    <div>
                        <h2 className="text-md sm:text-2xl font-windoor-main font-bold mb-8 uppercase tracking-tight">{hqContact.title}</h2>
                        <div className="space-y-6 sm:space-y-8 bg-transparent">
                            <div>
                                <span className="font-windoor-main text-xs uppercase tracking-widest text-windoor-primary block mb-2">Office Address</span>
                                <p className="text-sm text-windoor-text-muted leading-relaxed">
                                    {hqContact.address.line1}<br />
                                    {hqContact.address.line2}<br />
                                    {hqContact.address.cityStateZip}
                                </p>
                            </div>
                            
                            <div>
                                <span className="font-windoor-main text-xs uppercase tracking-widest text-windoor-primary block mb-2">Operating Hours</span>
                                <p className="text-sm text-windoor-text-muted leading-relaxed whitespace-pre-line">
                                    {hqContact.hours}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-windoor-secondary/20 grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-windoor-main text-xs uppercase tracking-widest text-windoor-primary block mb-2">General Inquiry</span>
                                    <p className="text-xs sm:text-sm text-windoor-text-muted break-all">{hqContact.email}</p>
                                </div>
                                <div>
                                    <span className="font-windoor-main text-xs uppercase tracking-widest text-windoor-primary block mb-2">Call Office</span>
                                    <p className="text-xs sm:text-sm text-windoor-text-muted">{hqContact.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-windoor-secondary/20 bg-transparent">
                        <span className="font-windoor-main text-xs uppercase tracking-widest text-windoor-primary block mb-3">Press & Careers</span>
                        <p className="text-sm text-windoor-secondary mb-4 leading-relaxed">
                            For media assets, press inquiries, or career opportunities, contact our relations department:
                        </p>
                        <a 
                            href={`mailto:${hqContact.pressEmail}`} 
                            className="inline-flex items-center border border-windoor-primary px-5 py-2 uppercase font-windoor-main text-xs sm:text-sm hover:bg-windoor-primary hover:text-white transition-all duration-300"
                        >
                            Contact PR Department
                        </a>
                    </div>
                </div>

                {/* Side Visual + Quick Contacts */}
                <div className="md:col-span-6 space-y-6 sm:space-y-8">
                    <div className="h-60 sm:h-85 lg:h-100 w-full overflow-hidden relative group border border-windoor-secondary bg-windoor-container-low" data-cursor="view">
                        <ImageReveal src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcEncH6iwDghGa-L_TfTVJBRI2WRub725XwYtiA7qef3oo7HEh2UBZhXkRyPRY8nC-8DADeRLzJYkUE3DCsaPRke4Xx9SNy7ZqPIdJ41ZQOfeTtApOkZiNo8bjGpn4RLYEyWnBZaXzFTgKtUdOW4wYhTe-MxCmOPzc6dRneZ1oS4u4ZLtlcZI0fAyt4eRV-4beXkgFdzGDIVjxhI9w-oiPZuNM_Fk_gAV2Bh3bUxLS7uHUieCVkE0tVCqlz_Q6rHxsVkM4LTBvy6Y" alt="Architectural Detailing" aspectClass="h-full w-full" />
                        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/80 backdrop-blur px-3 sm:px-4 py-2 border border-windoor-secondary z-10">
                            <span className="font-windoor-main text-xs uppercase tracking-widest">Precision Engineering</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                        {hqContact.supportContacts.map((c) => (
                            <div key={c.title} className="border border-windoor-structural-grey/40 p-6 sm:p-8 bg-windoor-container-low premium-card">
                                <h4 className="font-windoor-main text-xs uppercase tracking-widest text-windoor-primary mb-4 sm:mb-6">{c.title}</h4>
                                <p className="text-windoor-secondary text-sm mb-3">{c.phone}</p>
                                <p className="text-windoor-secondary text-sm break-all">{c.email}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Regional Network Grid */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto mb-16 sm:mb-24 lg:mb-32">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-windoor-main tracking-tight mb-8 sm:mb-12 text-center">OUR REGIONAL NETWORK</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {showrooms.map((studio) => (
                        <div 
                            key={studio.id}
                            className="border border-windoor-secondary/30 p-8 flex flex-col justify-between h-[300px] hover:bg-windoor-container-low transition-colors group bg-white premium-card"
                            data-cursor="explore"
                        >
                            <div>
                                <span className="font-windoor-main text-xs text-windoor-secondary uppercase tracking-[0.2em] mb-2 block">{studio.label}</span>
                                <h5 className="text-lg font-bold font-windoor-main mb-4 uppercase leading-snug">{studio.city}</h5>
                                <p className="text-sm text-windoor-text-muted leading-relaxed">
                                    {studio.address.slice(0, 70)}...<br />
                                    <span className="text-xs text-windoor-secondary mt-3 block font-mono">{studio.hours}</span>
                                </p>
                            </div>
                            <div className="pt-4 flex items-center justify-between border-t border-windoor-secondary/10 w-full">
                                <span className="font-windoor-main text-xs text-windoor-secondary uppercase tracking-widest">{studio.phone}</span>
                                <span className="text-windoor-primary text-sm transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300">↗</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>



            <Footer />
        </main>
    )
}

export default ContactPage
