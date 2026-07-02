import { useEffect, useState } from 'react'

const LoadingScreen = ({ onComplete }) => {
    const [isFading, setIsFading] = useState(false)

    useEffect(() => {
        // Start fade out after 4.4 seconds
        const fadeTimer = setTimeout(() => {
            setIsFading(true)
        }, 4400)

        // Fully unmount after 5.0 seconds
        const completeTimer = setTimeout(() => {
            onComplete()
        }, 5000)

        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(completeTimer)
        }
    }, [onComplete])

    return (
        <div 
            className={`fixed inset-0 z-[9999] bg-[#f9f9f9] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            <div className="flex flex-col items-center gap-8 bg-transparent">
                {/* Real Logo Animation: Outline to Solid Transition */}
                <div className="relative w-28 h-28 flex items-center justify-center bg-transparent">
                    {/* Solid metallic brand logo image */}
                    <img 
                        src="/images/logo1.png" 
                        alt="Windoor Logo" 
                        className="absolute inset-0 w-full h-full object-contain opacity-0 animate-fade-in-logo" 
                    />
                    
                    {/* SVG Outlines tracing the logo strokes */}
                    <svg 
                        viewBox="0 0 100 90" 
                        className="absolute inset-0 w-full h-full text-windoor-primary z-10 opacity-100 animate-fade-out-outlines"
                    >
                        {/* Bottom-Left W Shape outline */}
                        <path 
                            d="M 10,35 L 10,85 L 52,85 L 52,35 M 31,85 L 31,51" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="3.2" 
                            strokeLinecap="square"
                            strokeDasharray="200"
                            strokeDashoffset="200"
                            className="animate-draw-rect"
                        />
                        {/* Top-Right Inverted W Shape outline */}
                        <path 
                            d="M 48,68 L 48,15 L 90,15 L 90,68 M 69,15 L 69,39" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="3.2" 
                            strokeLinecap="square"
                            strokeDasharray="200"
                            strokeDashoffset="200"
                            className="animate-draw-lines"
                        />
                    </svg>
                </div>

                {/* Brand Text & Loading Bar Container */}
                <div className="flex flex-col items-center gap-4 bg-transparent">
                    {/* Brand Name */}
                    <h1 className="font-windoor-main text-sm sm:text-base uppercase tracking-[0.45em] text-windoor-primary opacity-0 translate-y-4 animate-fade-in-up">
                        WINDOOR MARKETING
                    </h1>

                    {/* Progress Loader */}
                    <div className="w-40 sm:w-48 h-[1.5px] bg-neutral-200 overflow-hidden relative opacity-0 translate-y-3 animate-fade-in-up-delay">
                        <div className="absolute top-0 bottom-0 left-0 bg-windoor-primary w-full origin-left scale-x-0 animate-progress" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen
