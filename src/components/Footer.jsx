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
                    <p className="font-windoor-main text-xs text-windoor-secondary leading-relaxed">Engineering clarity. Delivering structural permanence through innovative glazing solutions.</p>
                </div>

                {/* Navigation */}
                <div>
                    <h5 className="font-windoor-main text-xs uppercase tracking-widest text-white mb-6 sm:mb-8">Navigation</h5>
                    <ul className="space-y-3 sm:space-y-4">
                        {[['/', 'Home'], ['/about', 'About'], ['/products', 'Products'], ['/projects', 'Projects'], ['/showrooms', 'Showrooms']].map(([to, label]) => (
                            <li key={to}><Link to={to} className="font-windoor-main text-xs text-windoor-secondary hover:text-white transition-colors hover:underline underline-offset-4 decoration-1">{label}</Link></li>
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
