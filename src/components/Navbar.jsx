/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'

const Navbar = () => {
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const isActive = (path) => location.pathname === path

    // Scroll effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    return (
        <div 
            className="fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out"
            style={{
                top: "0px",
                padding: "0 24px",
                maxWidth: scrolled ? "960px" : "1120px",
                margin: "0 auto"
            }}
        >
            <nav 
                className="w-full uppercase font-windoor-main flex justify-between items-center transition-all duration-500 ease-in-out"
                style={{
                    backgroundColor: "#ffffff",
                    borderLeft: "1px solid rgba(115, 120, 120, 0.18)",
                    borderRight: "1px solid rgba(115, 120, 120, 0.18)",
                    borderBottom: "1px solid rgba(115, 120, 120, 0.18)",
                    borderTop: "none",
                    boxShadow: scrolled ? "0 10px 35px rgba(11, 12, 12, 0.08)" : "0 5px 15px rgba(11, 12, 12, 0.03)",
                    borderBottomLeftRadius: "24px",
                    borderBottomRightRadius: "24px",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                    padding: scrolled ? "10px 32px" : "14px 44px"
                }}
            >
                {/* Logo */}
                <Link to={'/'} className='flex items-center'>
                    <img className='h-6 sm:h-7.5 transition-all duration-500' src="/images/logo1.png" alt="Windoor" />
                </Link>

                {/* Desktop Links (Removed Contact link, styled for white background) */}
                <div className='hidden md:flex items-center gap-7 lg:gap-9 text-[11px] tracking-widest font-medium text-windoor-text-muted'>
                    <Link to='/' className={`transition-colors py-1 hover:text-windoor-primary ${isActive('/') ? 'border-b border-windoor-primary text-windoor-primary font-bold' : ''}`}>Home</Link>
                    <Link to='/about' className={`transition-colors py-1 hover:text-windoor-primary ${isActive('/about') ? 'border-b border-windoor-primary text-windoor-primary font-bold' : ''}`}>About</Link>
                    <Link to='/products' className={`transition-colors py-1 hover:text-windoor-primary ${isActive('/products') ? 'border-b border-windoor-primary text-windoor-primary font-bold' : ''}`}>Products</Link>
                    <Link to='/projects' className={`transition-colors py-1 hover:text-windoor-primary ${isActive('/projects') ? 'border-b border-windoor-primary text-windoor-primary font-bold' : ''}`}>Projects</Link>
                    <Link to='/showrooms' className={`transition-colors py-1 hover:text-windoor-primary ${isActive('/showrooms') ? 'border-b border-windoor-primary text-windoor-primary font-bold' : ''}`}>Showrooms</Link>
                </div>

                {/* Desktop CTA (Dark rounded pill button on white notch) */}
                <Link 
                    to='/contact' 
                    className='btn text-[10px] tracking-widest py-2.5 px-6 hidden md:block hover:opacity-85 transition-opacity'
                    style={{ borderRadius: "9999px" }}
                >
                    Request Quote
                </Link>

                {/* Mobile Hamburger */}
                <button
                    className='md:hidden flex flex-col gap-1.5 cursor-pointer p-2 focus:outline-none'
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-px w-5 bg-windoor-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block h-px w-5 bg-windoor-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block h-px w-5 bg-windoor-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>

                {/* Mobile Dropdown (White panel dropping down from the White Notch) */}
                <div 
                    className={`md:hidden absolute left-6 right-6 overflow-hidden transition-all duration-300 ease-in-out`}
                    style={{
                        top: "100%",
                        marginTop: "12px",
                        backgroundColor: "#ffffff",
                        border: "1px solid rgba(115, 120, 120, 0.18)",
                        borderRadius: "20px",
                        boxShadow: "0 20px 40px rgba(11, 12, 12, 0.08)",
                        maxHeight: menuOpen ? "400px" : "0px",
                        opacity: menuOpen ? 1 : 0,
                        padding: menuOpen ? "16px 0" : "0px"
                    }}
                >
                    <div className="flex flex-col">
                        {[
                            { to: '/', label: 'Home' },
                            { to: '/about', label: 'About' },
                            { to: '/products', label: 'Products' },
                            { to: '/projects', label: 'Projects' },
                            { to: '/showrooms', label: 'Showrooms' }
                        ].map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`px-8 py-3 text-[11px] tracking-widest transition-colors hover:text-windoor-primary ${isActive(to) ? 'text-windoor-primary font-bold' : 'text-windoor-text-muted'}`}
                            >
                                {label}
                            </Link>
                        ))}
                        <div className='px-8 pt-3 pb-1 border-t border-windoor-structural-grey/30 mt-2'>
                            <Link 
                                to='/contact' 
                                className='btn text-[11px] tracking-widest py-3 w-full text-center block'
                                style={{ borderRadius: "9999px" }}
                            >
                                Request Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
