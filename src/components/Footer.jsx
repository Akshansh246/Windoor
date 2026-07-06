import { Link } from 'react-router'

const Footer = () => {
    return (
        <footer className="bg-windoor-primary text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 sm:px-16 py-12 sm:py-16 lg:py-20 max-w-360 mx-auto">

                {/* Brand */}
                <div className="sm:col-span-2 md:col-span-2">
                    <div className="text-xl sm:text-2xl font-windoor-main uppercase tracking-tighter mb-6 sm:mb-8 text-white">
                        <img src="/images/logo1.png" className='h-12 w-auto mb-1' alt="" />
                        Windoor <br /> Marketing
                    </div>
                    <p className="font-windoor-main text-xs text-windoor-secondary leading-relaxed mb-6">Engineering clarity. Delivering structural permanence through innovative glazing solutions.</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
                        <a 
                            href="tel:+918128445566" 
                            className="inline-flex items-center gap-2 border border-windoor-secondary/40 hover:border-white px-4 py-2.5 font-windoor-main text-xs text-windoor-secondary hover:text-white transition-all duration-300 w-fit uppercase tracking-wider cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>+91 8128445566</span>
                        </a>
                        
                        <div className="flex gap-4">
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-windoor-secondary hover:text-white transition-colors p-1"
                                aria-label="Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-windoor-secondary hover:text-white transition-colors p-1"
                                aria-label="Facebook"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-windoor-secondary hover:text-white transition-colors p-1"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <h5 className="font-windoor-main text-xs uppercase tracking-widest text-white mb-6 sm:mb-8">Navigation</h5>
                    <ul className="space-y-3 sm:space-y-4">
                        {[
                            ['/', 'Home'],
                            ['/about', 'About'],
                            ['/products', 'Products'],
                            ['/projects', 'Projects'],
                            ['/showrooms', 'Showrooms'],
                            ['/contact', 'Contact']
                        ].map(([to, label]) => (
                            <li key={to}>
                                <Link to={to} className="font-windoor-main text-xs text-windoor-secondary hover:text-white transition-colors hover:underline underline-offset-4 decoration-1">
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h5 className="font-windoor-main text-xs uppercase tracking-widest text-white mb-6 sm:mb-8">Legal</h5>
                    <ul className="space-y-3 sm:space-y-4">
                        {[
                            ['/privacy-policy', 'Privacy Policy'],
                            ['/terms-of-service', 'Terms of Service']
                        ].map(([to, label]) => (
                            <li key={to}>
                                <Link to={to} className="font-windoor-main text-xs text-windoor-secondary hover:text-white transition-colors hover:underline underline-offset-4 decoration-1">
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="px-6 sm:px-16 py-6 sm:py-8 border-t border-windoor-secondary/20 max-w-360 mx-auto flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                <span className="font-windoor-main text-xs text-windoor-secondary text-center md:text-left">© 2026 Windoor Marketing. All rights reserved.</span>
                <span className="font-windoor-main text-xs text-windoor-secondary uppercase tracking-widest">Designed for Permanence</span>
            </div>
        </footer>
    )
}

export default Footer
