/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'

const Navbar = () => {
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const isActive = (path) => location.pathname === path

    // Scroll shadow effect — as designed in Stitch
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false)
    }, []) 
    return (
        <nav className={`flex fixed top-0 left-0 right-0 w-full uppercase font-windoor-main justify-between items-center px-4 sm:px-10 py-4 sm:py-5 border-b border-windoor-outline/40 backdrop-blur-lg bg-windoor-background/80 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
            <Link to={'/'} className='text-xl sm:text-2xl font-windoor-secondary font-bold flex items-center'><img className='h-7 sm:h-9' src="/public/images/logo1.png" alt="Windoor" /></Link>

            {/* Desktop Links */}
            <div className='hidden md:flex items-center gap-6 text-[11px] lg:gap-8 tracking-widest text-windoor-text-muted'>
                <Link to='/' className={`transition-colors hover:text-windoor-primary ${isActive('/') ? 'border-b border-windoor-primary text-windoor-primary font-bold' : ''}`}>Home</Link>
                <Link to='/about' className={`transition-colors hover:text-windoor-primary ${isActive('/about') ? 'border-b border-windoor-primary text-windoor-primary font-bold' : ''}`}>About</Link>
                <Link to='/systems' className={`transition-colors hover:text-windoor-primary ${isActive('/systems') ? 'border-b border-windoor-primary text-windoor-primary font-bold' : ''}`}>Systems</Link>
                <Link to='/projects' className={`transition-colors hover:text-windoor-primary ${isActive('/projects') ? 'border-b border-windoor-primary text-windoor-primary font-bold' : ''}`}>Projects</Link>
                <Link to='/showrooms' className={`transition-colors hover:text-windoor-primary ${isActive('/showrooms') ? 'border-b border-windoor-primary text-windoor-primary font-bold' : ''}`}>Showrooms</Link>
                <Link to='/contact' className={`transition-colors hover:text-windoor-primary ${isActive('/contact') ? 'border-b border-windoor-primary text-windoor-primary font-bold' : ''}`}>Contact</Link>
            </div>

            {/* Desktop CTA */}
            <Link to='/contact' className={'btn text-[10px] tracking-widest px-5 py-2.5 hidden md:block hover:opacity-85 transition-opacity'}>Request Quote</Link>

            {/* Mobile Hamburger */}
            <button
                className='md:hidden flex flex-col gap-1.5 cursor-pointer p-2 focus:outline-none'
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span className={`block h-px w-6 bg-windoor-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-px w-6 bg-windoor-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-px w-6 bg-windoor-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            {/* Mobile Dropdown */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-windoor-background/95 backdrop-blur-lg border-b border-windoor-outline/30 flex flex-col gap-0 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-100 py-4 shadow-lg' : 'max-h-0 py-0'}`}>
                {[
                    { to: '/', label: 'Home' },
                    { to: '/about', label: 'About' },
                    { to: '/systems', label: 'Systems' },
                    { to: '/projects', label: 'Projects' },
                    { to: '/showrooms', label: 'Showrooms' },
                    { to: '/contact', label: 'Contact' },
                ].map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`px-6 sm:px-10 py-3.5 text-[11px] tracking-widest border-b border-windoor-structural-grey/30 last:border-b-0 transition-colors hover:text-windoor-primary ${isActive(to) ? 'text-windoor-primary font-bold bg-windoor-structural-grey/10' : 'text-windoor-text-muted'}`}
                    >
                        {label}
                    </Link>
                ))}
                <div className='px-6 sm:px-10 pt-4'>
                    <Link to='/contact' className='btn text-[11px] tracking-widest py-3 w-full text-center block'>Request Quote</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
