import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import Footer from "../components/Footer"

const HomePage = () => {
    const [counts, setCounts] = useState({ clients: 0, brands: 0, projects: 0, success: 0 })
    const statsRef = useRef(null)

    useEffect(() => {
        const section = statsRef.current
        if (!section) return

        const startCounting = () => {
            const targets = { clients: 70000, brands: 20, projects: 100000, success: 35 }
            const duration = 1500
            const startTime = performance.now()

            const animate = (timestamp) => {
                const progress = Math.min((timestamp - startTime) / duration, 1)
                setCounts({
                    clients: Math.floor(targets.clients * progress),
                    brands: Math.floor(targets.brands * progress),
                    projects: Math.floor(targets.projects * progress),
                    success: Math.floor(targets.success * progress),
                })
                if (progress < 1) requestAnimationFrame(animate)
                else setCounts(targets)
            }
            requestAnimationFrame(animate)
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) { startCounting(); observer.unobserve(section) }
                })
            },
            { threshold: 0.3 }
        )
        observer.observe(section)
        return () => observer.disconnect()
    }, [])

    // Scroll-reveal animation
    useEffect(() => {
        const revealEls = document.querySelectorAll('.reveal')
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-visible')
                        revealObserver.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.12 }
        )
        revealEls.forEach((el) => revealObserver.observe(el))
        return () => revealObserver.disconnect()
    }, [])

    return (
        <>
        <main className="flex flex-col pt-18">

            {/* ── Video section ─────────────────────────────────────────── */}
            <div className="w-full h-screen relative">
                <video className="w-full h-full object-cover hero-video" muted autoPlay loop src="/public/mainVideo.mp4"></video>
                <div className="absolute bottom-16 sm:bottom-40 w-fit font-windoor-main left-6 sm:left-16 flex flex-col gap-4 sm:gap-5 text-white max-w-[90vw]">
                    <p className="tracking-[3px] uppercase text-[10px] sm:text-xs text-white/45">Excellence in Fenestration</p>
                    <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl italic font-windoor-main leading-tight font-bold">Crafting the Finer <br />Details of Architecture.</h1>
                    <p className="text-xs sm:text-sm font-extralight text-white/45 max-w-md">Engineering the threshold between interior luxury and external landscapes with over 35 years of structural mastery.</p>
                    <div className="uppercase flex flex-wrap font-windoor-main text-xs gap-3 mt-4 sm:mt-7 tracking-widest">
                        <Link className="btn px-5 py-3 sm:py-4" to="/systems">Explore Systems</Link>
                        <Link className="bg-windoor-background text-windoor-primary backdrop-blur-lg px-5 py-3 sm:py-4 border border-windoor-primary/50 hover:bg-windoor-primary hover:text-white transition-all" to="/projects">View Projects</Link>
                    </div>
                </div>
                {/* Bouncing scroll indicator */}
                <div className="absolute bottom-8 left-6 sm:left-16 animate-bounce">
                    <svg className="text-white w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* ── About Windoor ──────────────────────────────────────────── */}
            <div className="w-full flex flex-col md:flex-row gap-10 items-center justify-center min-h-screen py-16 md:py-24 border-b border-windoor-structural-grey/40 px-6 sm:px-16 reveal">
                <div className="w-full md:w-1/2 lg:w-5/12 text-sm flex flex-col gap-6">
                    <p className="tracking-[3px] font-windoor-main uppercase text-xs text-windoor-text-muted">Our Legacy</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main tracking-tight">REDEFINING THE MODERN FAÇADE</h2>
                    <p>With over 35 years of expertise, Windoor Marketing specializes in delivering premium fenestration solutions for luxury residences and high-end architectural projects. We believe that windows and facades define the character and experience of a space.</p>
                    <p>As proud partners of globally renowned brands like TOSTEM and Keller Minimal Windows, we combine Japanese precision with European elegance to help architects and homeowners bring visionary spaces to life.</p>
                    <Link to={'/about'} className="uppercase font-bold font-windoor-main border-b-2 border-windoor-primary w-fit hover:opacity-70 transition-opacity">Read Our Story</Link>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <img src="/public/images/about.png" alt="" className="w-full h-auto" />
                </div>
            </div>

            {/* ── Stats ─────────────────────────────────────────────────── */}
            <div ref={statsRef} className="w-full py-12 sm:py-16 px-4 sm:px-8 reveal">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-360 mx-auto uppercase font-windoor-main">
                    <div className="text-center py-5 px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{counts.success.toLocaleString()}+</h2>
                        <p className="text-xs font-windoor-main text-windoor-text-muted mt-2">Years of success</p>
                    </div>
                    <div className="text-center py-5 px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{counts.clients.toLocaleString()}+</h2>
                        <p className="text-xs font-windoor-main text-windoor-text-muted mt-2">Satisfied Clients</p>
                    </div>
                    <div className="text-center py-5 px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{counts.brands.toLocaleString()}+</h2>
                        <p className="text-xs font-windoor-main text-windoor-text-muted mt-2">Well-known Brands</p>
                    </div>
                    <div className="text-center py-5 px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{counts.projects.toLocaleString()}+</h2>
                        <p className="text-xs font-windoor-main text-windoor-text-muted mt-2">Projects Completed</p>
                    </div>
                </div>
            </div>

            {/* ── Collaborations ────────────────────────────────────────── */}
            <div className="bg-windoor-container-low w-full flex flex-col gap-8 sm:gap-10 px-6 sm:px-16 py-16 items-center reveal">
                <div className="w-full max-w-360 mx-auto">
                    <p className="tracking-[3px] font-windoor-main uppercase text-xs text-windoor-text-muted mb-2">Collaborations</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main tracking-tight">WORLD-CLASS PARTNERS</h2>
                </div>
                <div className="w-full max-w-360 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Tostem */}
                    <div className="border border-windoor-secondary group cursor-pointer overflow-hidden">
                        <div className="h-56 sm:h-72 w-full overflow-hidden">
                            <img className="h-full w-full object-cover imgz grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src="/public/images/tostem.jpg" alt="tostem" />
                        </div>
                        <div className="p-6 sm:p-10 flex flex-col gap-4 items-start">
                            <div className="font-windoor-main flex justify-between w-full items-start">
                                <div>
                                    <h4 className="text-lg sm:text-xl">TOSTEM</h4>
                                    <p className="uppercase text-xs text-windoor-text-muted">Japanese Pre-engineered systems</p>
                                </div>
                                <span className="text-windoor-primary text-lg">↗</span>
                            </div>
                            <p className="text-sm">Industry-leading aluminum window systems focused on durability and ease of installation</p>
                            <Link to={'/about'} className="border border-windoor-primary px-5 py-2 uppercase font-windoor-main text-xs sm:text-sm cursor-pointer mt-3 hover:bg-windoor-primary hover:text-white transition-all duration-300">Learn More</Link>
                        </div>
                    </div>
                    {/* Keller */}
                    <div className="border border-windoor-secondary group cursor-pointer overflow-hidden">
                        <div className="h-56 sm:h-72 w-full overflow-hidden">
                            <img className="h-full w-full object-cover imgz grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src="/public/images/kellar.png" alt="keller" />
                        </div>
                        <div className="p-6 sm:p-10 flex flex-col gap-4 items-start">
                            <div className="font-windoor-main flex justify-between w-full items-start">
                                <div>
                                    <h4 className="text-lg sm:text-xl">KELLER</h4>
                                    <p className="uppercase text-xs text-windoor-text-muted">European Minimal Windows</p>
                                </div>
                                <span className="text-windoor-primary text-lg">↗</span>
                            </div>
                            <p className="text-sm">Ultra-premium minimal window solutions that redefine modern luxury with limitless views.</p>
                            <Link to={'/about'} className="border border-windoor-primary px-5 py-2 uppercase font-windoor-main text-xs sm:text-sm cursor-pointer mt-3 hover:bg-windoor-primary hover:text-white transition-all duration-300">Learn More</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Facade and Curtain Wall Systems ───────────────────────── */}
            <div className="min-h-[60vh] md:h-screen w-full relative reveal">
                <img className="w-full h-full min-h-[60vh] md:h-screen grayscale brightness-[0.35] object-cover absolute inset-0" src="/public/images/facade.png" alt="" />
                <div className="relative z-10 flex flex-col gap-4 sm:gap-5 items-center justify-center text-white text-center px-6 py-24 md:py-0 md:h-screen">
                    <p className="tracking-[3px] font-windoor-main uppercase text-xs text-white">The Building Envelope</p>
                    <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-5xl font-bold font-windoor-main tracking-tight">FAÇADE &amp; CURTAIN WALLS</h2>
                    <p className="text-sm max-w-md">Advanced engineering for structural integrity and thermal resistance in large-scale architecture.</p>
                    <Link to="/systems" className="btn px-8 sm:px-12 py-4 sm:py-5 uppercase font-windoor-main text-sm mt-3 hover:opacity-90 transition-all">Go to Systems</Link>
                </div>
            </div>

            {/* ── Architectural Systems ──────────────────────────────────── */}
            <section className="py-20 sm:py-32 md:py-40 bg-windoor-background reveal">
                <div className="px-6 sm:px-16 max-w-360 mx-auto">
                    <div className="mb-12 sm:mb-20">
                        <p className="tracking-[3px] font-windoor-main uppercase text-xs text-windoor-text-muted mb-4">Our Expertise</p>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main tracking-tight">ARCHITECTURAL SYSTEMS</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            { title: 'Sliding Systems', desc: 'High-performance sliding doors with ultra-slim sightlines and seamless movement.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD91InVLeazmJB577uQUjnlWR0Ft--njs3ANVdWN1WPPZScrhTqYPTzIuMxsNK1ohj6WVig4VqZO4kdAYkPJiyG7rX2EcmpCLLTyyl7a7MbCVMsmweLo8lzOQniiL-SL4Oa3BQZf2Oguy7uNxBY3ZvLPAdaaAd8bTi3WAXjTVsu_g2rWs1yDCivTOER_V5rF_FxnB4XcSiRSUKNovb_iqmOLj1RZ5gOK0_PpoCcaHRWztSFX7jVIS-77_z93jpHtKzlAYLqvrwZbq8' },
                            { title: 'Casement Series', desc: 'Classic functionality met with contemporary design, providing maximum ventilation.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_BbkJ1nCaeFSI077hMPs0N-a0-eqxHK0MHcN4SNDaRxjnIWoHYdnkUxFuLvxYoI52qDBuUi4OQ85rdN30ovNhSunmgg8ecwi3WD8O6vVPfnAMsCp5qW66t0spNDOnLEHY2J7Nq22BSatYPopkURmv3Gfwz5EanzYZaya9Y0rraRfE7YCNjRirr0Mz3VtdbJMiILNGVQE2jipcrlRQDKJ-1zRkCHzl6rayDA8paPzkuCbCJ3ztP7k63VeBV4SRbAp1oto73_GrRMw' },
                            { title: 'Minimal Systems', desc: 'The art of invisibility. Large format glass with barely visible framing.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP-iQijtD_dpcrnPj87xHRUig2K-QaiKDp9gxJR6ygkNnEGZ_IcOTjHsvoC7emsp6bdrRPV1UJVaFVsomQBWl7oJjukEB2DU6ZAnCqx6gaWL_6-ZjPFlBlvbQ82H_B0ZtX2cUUqqpgLW2fxYdv1nlImBuzswLvFMAd3fD4Dl-BhMS61QIsShrVwJ3wiAjuFOO8ECOS15kydh23KnTJvM0hnsHlioGKrt7bCFm-6hx-BuMxiML81QJHOYzseT7T-c_x2ElioHu9dAs' },
                            { title: 'Motorized NGS', desc: 'Effortless automation for heavy-duty glazed walls at the touch of a button.', icon: '⚙' },
                            { title: 'Curtain Walls', desc: 'Non-structural outer walls providing maximum light and sophisticated aesthetics.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIgizOrbLX98JT4NypS0HgqfYIWrdk4mma-PNKBcrZBBsbw_g2zJzPgv1y5nRPBtlcG9JHcS-Fxz6Vr6sJljno21MaGPmA34osWxp9rCkRCbg52hd_eHFwuwaA3oqXYZXGV89KiR236iGXcAMZm_quyrACiDzOpQBZdf1Z0eQZl4GjzFVE9tFztXnnvFBAoYyB1nDD7lXORh3a2swIK5AAZcM63XllzcHKZ8w7Rcco27Jj7IBr9Xh1v9LT9YGAc2-DFp3cIW8HGAo' },
                            { title: 'Ventilation', desc: 'Integrated airflow solutions including louvres and automated parallel openers.', icon: '💨' },
                        ].map((sys) => (
                            <div key={sys.title} className="group border border-windoor-secondary bg-windoor-container-low p-6 sm:p-8 flex flex-col justify-between hover:bg-white transition-colors duration-500 min-h-95 sm:min-h-112.5">
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="aspect-square bg-windoor-container overflow-hidden flex items-center justify-center">
                                        {sys.img ? (
                                            <img alt={sys.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src={sys.img} />
                                        ) : (
                                            <span className="text-5xl opacity-20">{sys.icon}</span>
                                        )}
                                    </div>
                                    <h4 className="font-windoor-main text-base sm:text-xl font-bold uppercase">{sys.title}</h4>
                                    <p className="text-sm text-windoor-text-muted">{sys.desc}</p>
                                </div>
                                <Link to="/systems" className="mt-6 self-start font-windoor-main text-xs uppercase tracking-widest font-bold border-b border-windoor-primary pb-1 group-hover:pr-4 transition-all duration-300">Explore</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Select Projects preview ───────────────────────────────── */}
            <section className="py-20 sm:py-32 md:py-40 bg-windoor-container-low border-t border-windoor-structural-grey/40 reveal">
                <div className="px-6 sm:px-16 max-w-360 mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 sm:mb-20">
                        <div className="space-y-3">
                            <p className="tracking-[3px] font-windoor-main uppercase text-xs text-windoor-text-muted">Portfolio</p>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main tracking-tight">SELECT PROJECTS</h2>
                        </div>
                        <Link to="/projects" className="font-windoor-main text-xs uppercase tracking-widest border-b border-windoor-primary pb-1 hover:opacity-70 transition-opacity shrink-0">View All Projects</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
                        {[
                            { title: 'The Glass Pavilion', sub: 'Ahmedabad | Private Villa', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMAaRrV5-NfVbQu9waPHuLoPb3S3wNhBwRTwrrTQEB6jK6Kq7IXk8D6NuslY6ut5WPos9j_T1qBBiHJ1CFyLRvUr-stYJ5niJOr6hQm5Mf5pg7aYApHLCzucbRPwM80hl9ZctOTvlf6m4XWF6E53S-96hSC0p5_G3hxitZG0vF_KFyxarDctWTvcLQYFrro83d0ax08tlQNz4iVFkZOWexigmsLqDUpjwAzjLOdRBLGaKE9LQIxaGJaUvaGtefbr3OBuFNrq6wnfU' },
                            { title: 'Monolith Residence', sub: 'Rajkot | Luxury Estate', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpVaFEO7FeYSIwdm8Cjul0ezfCw0I7y7C7kdp_fTd721CLDNip0fkqhzJabK3CI2pwN17ccyJbkGwgRCqWaLLQH-aenuv34piSvmludrWlcV9w3CGJJZpsWpDT-UO9AhLJieECToKM4inASfCIKzD3Z9wITeM6JzMJ7IqgrNXx0JWvVf8WQweYjol0OZNEbYVyKxro2PwlCpVV3Wt8bR4U0mG404T9MUZiHPk4gHtp4ijJYGRa3Lx9WQ2GpX-KqmeTjrh-jFPenJk' },
                            { title: 'Corporate Atrium', sub: 'Anand | Headquarters', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIgizOrbLX98JT4NypS0HgqfYIWrdk4mma-PNKBcrZBBsbw_g2zJzPgv1y5nRPBtlcG9JHcS-Fxz6Vr6sJljno21MaGPmA34osWxp9rCkRCbg52hd_eHFwuwaA3oqXYZXGV89KiR236iGXcAMZm_quyrACiDzOpQBZdf1Z0eQZl4GjzFVE9tFztXnnvFBAoYyB1nDD7lXORh3a2swIK5AAZcM63XllzcHKZ8w7Rcco27Jj7IBr9Xh1v9LT9YGAc2-DFp3cIW8HGAo' },
                        ].map((p) => (
                            <Link key={p.title} to="/projects" className="group cursor-pointer block">
                                <div className="aspect-3/4 overflow-hidden border border-windoor-secondary mb-6 sm:mb-8">
                                    <img alt={p.title} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-1000" src={p.img} />
                                </div>
                                <h4 className="font-windoor-main text-base sm:text-xl font-bold uppercase">{p.title}</h4>
                                <p className="font-windoor-main text-xs uppercase text-windoor-secondary tracking-widest mt-2">{p.sub}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Showrooms preview ─────────────────────────────────────── */}
            <section className="py-20 sm:py-32 md:py-40 bg-windoor-background border-t border-windoor-structural-grey/40 reveal">
                <div className="px-6 sm:px-16 max-w-360 mx-auto">
                    <div className="mb-12 sm:mb-20 text-center">
                        <p className="tracking-[3px] font-windoor-main uppercase text-xs text-windoor-text-muted mb-4">Our Presence</p>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main tracking-tight">EXPERIENCE OUR SYSTEMS</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { city: 'Ahmedabad', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEPFnTqa_OOR102FOpU4Wqy2PgTduwK2RaSmBqAbBAVuwARfhmnsvgpqLLV4_FCEzVStmZloWVJKlw8ZPfl9ExyB-NsGl52YUrflM21peRaS3LNuormwT-F9T9Zh-2ltsTfXVYbZmrBonnJo8A4PjnmlbyZPRtNOc2JDMMpYJD0q5Z3UX9ZQqyQYzReWMKGPij-yj2mwrRhA8_OQFC95LcYA0vFSV6FDBxZLa7O7EL7LB42U4rZfx0K8s2DMu2CQHWYy3VC8yZnqE' },
                            { city: 'Rajkot', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmnxTXf8xtY634yRxDI-ns0tW2gsz2yNqhV-0LKga4bxUxNOAac2SVH0xigZezr-_g29zgTUCI6zqZmkrX_S52Bjfev5QIHnR99zkFTtcQOec4by1-LpD0foDasxyuyVxGFG18r4GuNMeLArFXFeSZET4VKILUNOCfq6zqcXa2YxgYKHqWbT5BHvqns3ADAavDJOJHPQKKctnrW3jLjeSpPgW1UYJp6nbKzmYIaG2OYs-aJBaOhFJhgzKjT7Hiv5zwZqRBClCkHfQ' },
                            { city: 'Anand', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0Y2CfMOMeaZqjfo9iuWXdeO8VpFBPIlEA_7_j5B4eiSCNquyA12Ovd17a9WwojTWxquhMD0xWmiw9P1L2quSO45cVx6_uTMFuDGM2acLJyRAWc4y7abUIj-ReJA7s1g6KTKI-Gmgrw3p7HuED_q9lS-ARMFUWYF8jL5ShjCwkXmC6ARuzuqhr26YTy6vox5tYanUWvq_n04eEzVbRJjxOsoe4RAET5rLx3ZutYWfvQYtsBm3gtzvVjnbEJJJreromDdYDq3nUQfk' },
                            { city: 'Mehsana', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8NKL7betIuWjVeyXlk4R6kw9HxmdqBTrcrHLoyS1GSb_5lNYjyROFKUMz_Ic-vw3_Ve6_NS0HUyGfoa-oEVWmWDXLZhNfsCnwsmFgulmfK6pZ_MRpcNUAtgyMd5Pui__jUAxUABVjYKnEIoKm9MztRJoX7L_dvwdLEfiOUcs3PNODxArES1wvuci1HZEM0QXk8FvonL-ZNBzTW8iAhbXFfHIngkFi16P8HpTESGFUCvdHOdTGg6EBhACe8FbkCHNVOfykVebT-2M' },
                        ].map((room) => (
                            <Link key={room.city} to="/showrooms" className="group cursor-pointer space-y-4 block">
                                <div className="aspect-video bg-windoor-container overflow-hidden border border-windoor-secondary">
                                    <img alt={`${room.city} Showroom`} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-700" src={room.img} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <h4 className="font-windoor-main text-base sm:text-xl font-bold uppercase">{room.city}</h4>
                                    <span className="text-windoor-primary group-hover:translate-x-2 transition-transform duration-300 text-lg">→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Contact CTA ───────────────────────────────────────────── */}
            <section className="py-16 sm:py-20 bg-windoor-background border-y border-windoor-structural-grey/40 reveal">
                <div className="px-6 sm:px-16 max-w-360 mx-auto text-center space-y-8 sm:space-y-12">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-windoor-main uppercase tracking-tight">Ready to start your project?</h3>
                    <div className="flex justify-center">
                        <Link to="/contact" className="btn px-10 sm:px-16 py-5 sm:py-6 font-windoor-main text-xs uppercase tracking-[0.2em]">
                            Request a Consultation
                        </Link>
                    </div>
                </div>
            </section>

        </main>
        <Footer />
        </>
    )
}

export default HomePage
