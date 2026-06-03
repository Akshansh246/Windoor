import { useState } from 'react'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

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

            {/* Contact Form + Image */}
            <section className="px-6 sm:px-16 max-w-360 mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mb-16 sm:mb-32 lg:mb-40">

                {/* Form */}
                <div className="md:col-span-6 bg-windoor-container-low border border-windoor-structural-grey/40 p-6 sm:p-10 lg:p-12 relative overflow-hidden premium-card">
                    <h2 className="text-md sm:text-2xl font-windoor-main font-bold mb-8 sm:mb-12">Submit an Inquiry</h2>

                    {submitted ? (
                        <div className="flex flex-col items-center justify-center h-48 sm:h-64 gap-4">
                            <div className="text-4xl">✓</div>
                            <p className="font-windoor-main text-xs uppercase tracking-widest text-windoor-primary">Message Sent Successfully</p>
                            <p className="text-sm text-windoor-text-muted text-center">Our team will be in touch within 24 hours.</p>
                        </div>
                    ) : (
                        <form className="space-y-10 sm:space-y-12" onSubmit={handleSubmit}>
                            {[
                                { id: 'name', label: 'Full Name', type: 'text' },
                                { id: 'email', label: 'Professional Email', type: 'email' },
                            ].map(({ id, label, type }) => (
                                <div key={id} className="relative">
                                    <input className="peer w-full bg-transparent border-0 border-b border-windoor-structural-grey py-3 focus:ring-0 focus:border-windoor-primary transition-colors outline-none text-base" id={id} name={id} placeholder=" " type={type} value={form[id]} onChange={handleChange} required />
                                    <label className="absolute left-0 top-3 text-windoor-secondary transition-all pointer-events-none font-windoor-main text-xs uppercase tracking-widest peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-windoor-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90" htmlFor={id}>{label}</label>
                                </div>
                            ))}
                            <div className="relative">
                                <select className="peer w-full bg-transparent border-0 border-b border-windoor-structural-grey py-3 focus:ring-0 focus:border-windoor-primary transition-colors outline-none text-base appearance-none" id="projectType" name="projectType" value={form.projectType} onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="residential">Residential Luxury</option>
                                    <option value="commercial">Commercial Development</option>
                                    <option value="consultancy">Technical Consultancy</option>
                                </select>
                                <label className="absolute left-0 top-3 text-windoor-secondary transition-all pointer-events-none font-windoor-main text-xs uppercase tracking-widest peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-windoor-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90" htmlFor="projectType">Project Type</label>
                            </div>
                            <div className="relative">
                                <textarea className="peer w-full bg-transparent border-0 border-b border-windoor-structural-grey py-3 focus:ring-0 focus:border-windoor-primary transition-colors outline-none text-base resize-none" id="message" name="message" placeholder=" " rows="4" value={form.message} onChange={handleChange} required></textarea>
                                <label className="absolute left-0 top-3 text-windoor-secondary transition-all pointer-events-none font-windoor-main text-xs uppercase tracking-widest peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-windoor-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90" htmlFor="message">Message Details</label>
                            </div>
                            <button type="submit" className="w-full btn py-4 sm:py-5 font-windoor-main text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3">Send Message →</button>
                        </form>
                    )}
                </div>

                {/* Side Visual */}
                <div className="md:col-span-6 space-y-6 sm:space-y-8">
                    <div className="h-60 sm:h-85 lg:h-100 w-full overflow-hidden relative group" data-cursor="view">
                        <ImageReveal src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcEncH6iwDghGa-L_TfTVJBRI2WRub725XwYtiA7qef3oo7HEh2UBZhXkRyPRY8nC-8DADeRLzJYkUE3DCsaPRke4Xx9SNy7ZqPIdJ41ZQOfeTtApOkZiNo8bjGpn4RLYEyWnBZaXzFTgKtUdOW4wYhTe-MxCmOPzc6dRneZ1oS4u4ZLtlcZI0fAyt4eRV-4beXkgFdzGDIVjxhI9w-oiPZuNM_Fk_gAV2Bh3bUxLS7uHUieCVkE0tVCqlz_Q6rHxsVkM4LTBvy6Y" alt="Architectural Detailing" aspectClass="h-full w-full" />
                        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/80 backdrop-blur px-3 sm:px-4 py-2 border border-windoor-secondary z-10">
                            <span className="font-windoor-main text-xs uppercase tracking-widest">Precision Engineering</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                        {[
                            { title: 'Technical Support', phone: '+91 79 4000 0000', email: 'support@windoor-systems.com' },
                            { title: 'Sales Inquiry', phone: '+91 79 4000 0001', email: 'sales@windoor-systems.com' },
                        ].map((c) => (
                            <div key={c.title} className="border border-windoor-structural-grey/40 p-6 sm:p-8 bg-windoor-container-low premium-card">
                                <h4 className="font-windoor-main text-xs uppercase tracking-widest text-windoor-primary mb-4 sm:mb-6">{c.title}</h4>
                                <p className="text-windoor-secondary text-sm mb-3">{c.phone}</p>
                                <p className="text-windoor-secondary text-sm break-all">{c.email}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Resources CTA */}
            <section className="bg-windoor-primary py-16 sm:py-20 lg:py-24 px-6 sm:px-16 overflow-hidden relative">
                <TextReveal mode="block">
                    <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-20 items-center">
                        <div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main text-white mb-6 sm:mb-8 uppercase">Download Technical Specifications</h2>
                            <p className="text-windoor-secondary text-base sm:text-lg mb-8 sm:mb-10 max-w-lg leading-relaxed ">Access our comprehensive library of CAD blocks, BIM models, and performance data sheets to integrate Windoor systems seamlessly into your designs.</p>
                            <div className="flex flex-wrap gap-4 bg-transparent">
                                <button className="border border-white text-white px-6 sm:px-8 py-4 font-windoor-main text-xs uppercase tracking-widest hover:bg-white hover:text-windoor-primary transition-all duration-300">Partner Portal Login</button>
                                <button className="text-white font-windoor-main text-xs uppercase tracking-widest flex items-center gap-2">Technical Index ↓</button>
                            </div>
                        </div>
                        <div className="aspect-square bg-windoor-secondary/10 border border-windoor-secondary/20 flex items-center justify-center p-8 sm:p-12 premium-card">
                            <div className="text-center bg-transparent">
                                <div className="text-4xl sm:text-6xl text-windoor-secondary mb-4 sm:mb-6">✓</div>
                                <p className="font-windoor-main text-xs uppercase tracking-[0.3em] text-windoor-secondary">Certified Structural Integrity</p>
                            </div>
                        </div>
                    </div>
                </TextReveal>
            </section>

            <Footer />
        </main>
    )
}

export default ContactPage
