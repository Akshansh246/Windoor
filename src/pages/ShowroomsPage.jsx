import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import ImageReveal from '../components/ImageReveal'

const showrooms = [
    { id: 'ahmedabad', label: 'Flagship Location', city: 'Ahmedabad', address: 'Living Interiors, opp. Hero Honda Showroom, opp. Central Bank Of India, Sarvottam Nagar Society, Navrangpura, Ahmedabad, Gujarat 380009', phone: '+91 79 40030036', hours: 'Mon - Sat: 10:00 - 19:00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsSjOT66KgUfGNIGX3mash_YCjSiDLKqnceL7J70N0jCmsHimHEqMewqxGpWPDz4wobqACyw2sB5KPqPwFmBoqqoTxvX9CgLJXyO6wow0qNWXGFAj7Ou6r3MlTFoFOz9eam2VAoNsO3KTn7YMnwpuGY9gxXHfe0XTvXc5S7CktSurqELEg3jqWq5w90h5XSsAMu1fxPJbLNhcgz9NAGPUK6H59EKkBDccpjf_V17gJCq5g_evoVXddR0l4u25P_a2iOMuQGn0VjkQ' },
    { id: 'rajkot', label: 'Saurashtra Regional Office', city: 'Rajkot', address: 'Aman Tower, Kalavad Road, Near Kotecha Chowk, Rajkot - 360001', phone: '+91 281 2000 111', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAmN7jKNSIl566WZwDWhfnFrPTk9ynVR3W78eumfll_X6V2Jmlk4jVFY78YVPUJKiQ_ObT_2R0c0z-rXV6RVKiWMdHcYLQohD4Jo0t2jPdBTK1V59s7HHfGYv6QjT4EGr_Z0DWYTkgRB3bAWp6qUWYfTnPDUvNJEAlmbHqLHBk6ibJfCaNwK7vvjXpeb2hT1fYMPUhXZtVRg2zZDHnEgdhAfch2-bi6WU8om78jB6ulRRgkY5mBeOCFPEwYOnNUFNqBV1kkdZi1yk' },
    { id: 'anand', label: 'Anand Boutique', city: 'Anand', address: 'The Hub, Amul Dairy Road, Opp. Town Hall, Anand - 388001', phone: '+91 2692 245 000', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrw4vq7mqIqLGTOeWCC_Sk_TA9ivbOfzfQ0GTAh5eE9TMhyVwqdgQw3Tng4Q52rYAryggO8CKDIrhxqmtV0eUi5p3WDW0ndX4P971c09uHRTVAdJN50_ZBHBW_6dpZwCCZDvE48DLU-s2ws3k9ouJNrkvIGpqGI_ijuGCSAoG3JHCGbXoo6xhq_zlc64_wXMqMWNHb297ws3m9wEMjW6UUu55-f1SDHSZETllFpgMQ-P6Qg9Brzx2diuxdWZr2Gvok6_EkzS3Snxw' },
    { id: 'mehsana', label: 'Highway Branch', city: 'Mehsana', address: 'Apex Business Center, Mehsana-Ahmedabad Highway, Mehsana - 384002', phone: '+91 2762 230 400', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4x8N1hGTtn64Lk1OOhxibqF6SKI3MmvZ4WJ49vh_tKov6_tGnRa2z_DcEZX3h4P1a9sziyUqcsN9FvwiLXgoviBsufKXsfEbMNmaDTWnJ0nKK8K3_PRen643crWIIWG34bgRxksBoHIuLE8Nnr-5tenW078wDSrIEMIPNIbbw-2ozWlodzp1STKK8Q3pMkBS-j6MofxI0yByB61spJwurYpbxTYxBrPxavySLE2ccdR1tsVWCL9u4NpHe12rqalixhVUAbYOzOKQ' },
]

const ShowroomsPage = () => {
    return (
        <main className="pt-18">

            {/* Hero */}
            <section className="max-w-360 mx-auto px-6 sm:px-16 pt-20 sm:pt-28 lg:pt-32 mb-16 sm:mb-24 lg:mb-32">
                <div className="max-w-3xl">
                    <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-windoor-main uppercase tracking-tighter leading-tight mb-6 sm:mb-8">
                        <TextReveal mode="words">Experience Precision.</TextReveal>
                    </h1>
                    <TextReveal mode="block" delay={0.3}>
                        <p className="text-base sm:text-lg text-windoor-secondary max-w-xl leading-relaxed">
                            Visit our experience centers to touch, feel, and operate our architectural glazing systems. Each showroom is designed as a sanctuary of light and engineering excellence.
                        </p>
                    </TextReveal>
                </div>
            </section>

            {/* Showrooms */}
            <section className="max-w-360 mx-auto px-6 sm:px-16 space-y-20 sm:space-y-32 lg:space-y-40 pb-20 sm:pb-32 lg:pb-40">

                {/* Ahmedabad — Flagship */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 group">
                    <div className="col-span-12 md:col-span-7 relative aspect-video md:aspect-video overflow-hidden border border-windoor-secondary bg-windoor-container-low" data-cursor="view">
                        <ImageReveal src={showrooms[0].img} alt="Ahmedabad Showroom" aspectClass="h-full w-full" />
                    </div>
                    <div className="col-span-12 md:col-span-5 flex flex-col justify-center py-4 sm:py-8">
                        <TextReveal mode="words">
                            <span className="font-windoor-main text-xs uppercase text-windoor-secondary mb-4 tracking-[0.2em]">Flagship Location</span>
                        </TextReveal>
                        <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold font-windoor-main mb-6 uppercase tracking-tight">
                            <TextReveal mode="words" delay={0.2}>Ahmedabad</TextReveal>
                        </h2>
                        <div className="space-y-5 border-l-2 border-windoor-primary pl-6 sm:pl-8">
                            <div>
                                <p className="font-windoor-main text-xs uppercase text-windoor-primary mb-1">Address</p>
                                <p className="text-sm text-windoor-secondary leading-relaxed">{showrooms[0].address}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-windoor-main text-xs uppercase text-windoor-primary mb-1">Contact</p>
                                    <p className="text-sm text-windoor-secondary">{showrooms[0].phone}</p>
                                </div>
                                <div>
                                    <p className="font-windoor-main text-xs uppercase text-windoor-primary mb-1">Hours</p>
                                    <p className="text-sm text-windoor-secondary">{showrooms[0].hours}</p>
                                </div>
                            </div>
                            <div className="pt-2 flex flex-wrap gap-4">
                                <button className="border border-windoor-primary px-5 py-3 font-windoor-main text-xs uppercase tracking-widest hover:bg-windoor-primary hover:text-white transition-all">Directions</button>
                                <button className="font-windoor-main text-xs uppercase tracking-widest">View Map →</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 h-40 sm:h-50 border border-windoor-secondary mt-4 sm:mt-8 relative overflow-hidden bg-windoor-container-low flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500">
                         <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14639.844079550252!2d72.54102676112669!3d23.04407519196918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e858c5f97f9b7%3A0x1cb00fb876b4974a!2sWindoors%20Marketing!5e0!3m2!1sen!2sin!4v1780389969782!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>
                </div>

                {/* Rajkot & Anand */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-8">
                    {showrooms.slice(1, 3).map((room) => (
                        <div key={room.id} className="space-y-6 sm:space-y-8 group premium-card p-4 border border-windoor-secondary/20 bg-white" data-cursor="view">
                            <div className="aspect-square overflow-hidden border border-windoor-secondary bg-windoor-container-low relative">
                                <ImageReveal src={room.img} alt={`${room.city} Showroom`} aspectClass="h-full w-full" />
                                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/90 px-3 sm:px-4 py-2 border border-windoor-secondary z-10">
                                    <span className="font-windoor-main text-xs uppercase">{room.label}</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-2xl font-windoor-main font-bold mb-4 uppercase tracking-tight">{room.city}</h2>
                                <div className="space-y-4 border-l border-windoor-structural-grey pl-6 bg-transparent">
                                    <p className="text-sm text-windoor-secondary leading-relaxed">{room.address}</p>
                                    <p className="font-windoor-main text-xs text-windoor-primary">{room.phone}</p>
                                    <div className="h-24 sm:h-32 border border-windoor-secondary bg-windoor-container-low flex items-center justify-center opacity-50">
                                        <div className="font-windoor-main text-[10px] uppercase tracking-widest text-windoor-secondary">Map Preview</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mehsana */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 group items-end">
                    <div className="col-span-12 md:col-span-4 order-2 md:order-1 py-4 sm:py-8">
                        <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold font-windoor-main mb-6 uppercase tracking-tight">Mehsana</h2>
                        <div className="space-y-5 md:border-r-2 md:border-windoor-primary md:pr-8 md:text-right">
                            <div>
                                <p className="font-windoor-main text-xs uppercase text-windoor-primary mb-1">Location</p>
                                <p className="text-sm text-windoor-secondary leading-relaxed">{showrooms[3].address}</p>
                            </div>
                            <div>
                                <p className="font-windoor-main text-xs uppercase text-windoor-primary mb-1">Direct Line</p>
                                <p className="text-sm text-windoor-secondary">{showrooms[3].phone}</p>
                            </div>
                            <div className="pt-4 md:flex md:justify-end">
                                <button className="btn font-windoor-main text-xs px-6 sm:px-8 py-3 uppercase tracking-widest">Book Consultation</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8 order-1 md:order-2 relative overflow-hidden border border-windoor-secondary group" data-cursor="view">
                        <ImageReveal src={showrooms[3].img} alt="Mehsana Showroom" aspectClass="h-70 sm:h-100 lg:h-125" />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-360 mx-auto px-6 sm:px-16 pb-16 sm:pb-24 lg:pb-40">
                <TextReveal mode="block">
                    <div className="bg-windoor-primary p-8 sm:p-16 md:p-24 text-center premium-card">
                        <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main text-white mb-6 sm:mb-8 uppercase tracking-tighter">Cannot visit in person?</h3>
                        <p className="text-windoor-secondary text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                            Explore our full range of systems and technical specifications through our digital catalog or request a virtual walkthrough with our specialists.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 bg-transparent">
                            <button className="bg-white text-windoor-primary px-8 sm:px-10 py-4 font-windoor-main text-xs uppercase tracking-widest hover:bg-windoor-container-low transition-colors duration-300">Download Catalog</button>
                            <button className="border border-windoor-secondary text-white px-8 sm:px-10 py-4 font-windoor-main text-xs uppercase tracking-widest hover:border-white transition-colors duration-300">Virtual Tour</button>
                        </div>
                    </div>
                </TextReveal>
            </section>

            <Footer />
        </main>
    )
}

export default ShowroomsPage
