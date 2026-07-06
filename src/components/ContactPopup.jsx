import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'

const ContactPopup = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const location = useLocation()

    // Hide popup on contact page
    const isContactPage = location.pathname === '/contact'

    useEffect(() => {
        if (isContactPage) {
            setIsVisible(false)
            return
        }

        const dismissed = sessionStorage.getItem('windoor_popup_dismissed')
        if (dismissed) {
            setIsMinimized(true)
            setIsVisible(true)
            return
        }

        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 3000)

        return () => clearTimeout(timer)
    }, [isContactPage])

    const handleClose = () => {
        setIsMinimized(true)
        sessionStorage.setItem('windoor_popup_dismissed', 'true')
    }

    const handleExpand = () => {
        setIsMinimized(false)
    }

    if (!isVisible || isContactPage) return null

    return (
        <>
            <style>{`
                @keyframes springSlideIn {
                    0% { transform: translateY(120%) scale(0.9); opacity: 0; }
                    70% { transform: translateY(-10px) scale(1.02); opacity: 0.95; }
                    100% { transform: translateY(0) scale(1); opacity: 1; }
                }
                @keyframes pulseGlow {
                    0% { box-shadow: 0 0 0 0 rgba(11, 12, 12, 0.4); border-color: rgba(11, 12, 12, 0.1); }
                    70% { box-shadow: 0 0 0 8px rgba(11, 12, 12, 0); border-color: rgba(11, 12, 12, 0.6); }
                    100% { box-shadow: 0 0 0 0 rgba(11, 12, 12, 0); border-color: rgba(11, 12, 12, 0.1); }
                }
                @keyframes floatIcon {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
                @keyframes iconPulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(11, 12, 12, 0.15); }
                    50% { transform: scale(1.08); box-shadow: 0 8px 30px rgba(11, 12, 12, 0.3); }
                }
                .animate-spring-in {
                    animation: springSlideIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
                .btn-pulse {
                    animation: pulseGlow 2s infinite ease-in-out;
                }
                .animate-float {
                    animation: floatIcon 3s infinite ease-in-out;
                }
                .animate-icon-pulse {
                    animation: iconPulse 2.5s infinite ease-in-out;
                }
            `}</style>

            {isMinimized ? (
                /* Small Floating Icon Button (Sharp corners for architectural guidelines) */
                <button
                    onClick={handleExpand}
                    className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-windoor-primary text-white border border-windoor-structural-grey flex items-center justify-center shadow-2xl cursor-pointer hover:bg-windoor-secondary transition-all active:scale-95 animate-icon-pulse"
                    title="Talk to Us"
                    aria-label="Expand contact popup"
                >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M8.684 10.742a2.002 2.002 0 00-.43 2.106L9.63 15.65c.302.68.217 1.474-.298 2.046l-.54.6a2.004 2.004 0 01-2.936-.086l-2.073-2.317a2.002 2.002 0 01-.157-2.428l1.455-2.222a2.002 2.002 0 012.302-.797L9.63 10.7l-.946.042z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 3h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            ) : (
                /* Compact Popup Card (Width reduced for sleekness) */
                <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[260px] sm:w-[290px] bg-white border border-windoor-primary shadow-2xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5 animate-spring-in text-windoor-primary rounded-none">
                    {/* Close Button */}
                    <button 
                        onClick={handleClose}
                        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-windoor-secondary hover:text-windoor-primary transition-colors cursor-pointer p-1"
                        aria-label="Minimize popup"
                        title="Minimize"
                    >
                        <svg className="w-3.5 h-3.5 sm:w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Header with animated icon */}
                    <div className="flex items-center gap-2 sm:gap-2.5 mt-0.5">
                        <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 flex-shrink-0 bg-windoor-container-low border border-windoor-structural-grey flex items-center justify-center animate-float">
                            <svg className="w-3.5 h-3.5 sm:w-4.5 h-4.5 text-windoor-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path d="M8.684 10.742a2.002 2.002 0 00-.43 2.106L9.63 15.65c.302.68.217 1.474-.298 2.046l-.54.6a2.004 2.004 0 01-2.936-.086l-2.073-2.317a2.002 2.002 0 01-.157-2.428l1.455-2.222a2.002 2.002 0 012.302-.797L9.63 10.7l-.946.042z" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 3h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-[7px] sm:text-[8px] tracking-widest font-windoor-main uppercase text-windoor-secondary font-bold block">
                                Let's Connect
                            </span>
                            <h4 className="font-windoor-main text-[10px] sm:text-[11px] font-bold uppercase tracking-tight">
                                Ready, then contact us
                            </h4>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-[10px] sm:text-[11px] text-windoor-text-muted leading-relaxed font-windoor-secondary pr-2">
                        Discuss your glazing requirements with our design experts.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2 w-full mt-0.5">
                        <Link 
                            to="/contact" 
                            onClick={() => setIsVisible(false)}
                            className="btn-pulse flex-1 text-center bg-windoor-primary text-white py-2 sm:py-2.5 text-[8px] sm:text-[9px] uppercase tracking-widest font-windoor-main font-bold hover:bg-windoor-secondary hover:text-white transition-colors duration-300 border border-transparent cursor-pointer"
                        >
                            Contact Us
                        </Link>
                        <a 
                            href="tel:+918128445566"
                            className="border border-windoor-structural-grey px-2 sm:px-2.5 py-2 sm:py-2.5 flex items-center justify-center hover:bg-windoor-container-low transition-colors cursor-pointer"
                            title="Call Us Now"
                        >
                            <svg className="w-3 h-3 sm:w-3.5 h-3.5 text-windoor-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}

export default ContactPopup
