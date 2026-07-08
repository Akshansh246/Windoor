import React from 'react'

// Base skeleton element with shimmer effect
export const Base = ({ className = '', width = '100%', height = '1rem', borderRadius = '0.25rem', style = {} }) => {
    return (
        <div 
            className={`skeleton-shimmer ${className}`}
            style={{
                width,
                height,
                borderRadius,
                ...style
            }}
        />
    )
}

// Heading placeholder
export const Heading = ({ className = '', level = 1, width = '60%', ...props }) => {
    const heights = {
        1: 'clamp(2rem, 4vw, 3.5rem)',
        2: 'clamp(1.5rem, 3vw, 2.5rem)',
        3: '1.75rem',
        4: '1.25rem'
    }
    
    return (
        <Base 
            className={`my-2 ${className}`}
            height={heights[level] || heights[1]}
            width={width}
            {...props}
        />
    )
}

// Paragraph placeholder with multiple lines
export const Text = ({ lines = 3, className = '', ...props }) => {
    return (
        <div className={`space-y-3 py-1 ${className}`}>
            {Array.from({ length: lines }).map((_, idx) => {
                // Vary line widths for a realistic paragraph look
                let width = '100%'
                if (idx === lines - 1 && lines > 1) {
                    width = '65%'
                } else if (idx === 0) {
                    width = '90%'
                } else if (idx % 2 === 0) {
                    width = '95%'
                }
                
                return (
                    <Base 
                        key={idx}
                        height="0.875rem"
                        width={width}
                        borderRadius="0.125rem"
                        {...props}
                    />
                )
            })}
        </div>
    )
}

// Premium Card placeholder matching Windoor's structural/card design
export const Card = ({ className = '', showMeta = true, height = '300px' }) => {
    return (
        <div className={`flex flex-col gap-4 w-full h-full bg-white/40 p-4 border border-windoor-outline-light/20 rounded-sm premium-card ${className}`}>
            {/* Card Image placeholder */}
            <Base 
                height={height} 
                width="100%" 
                borderRadius="0.125rem" 
                className="opacity-75"
            />
            {showMeta && (
                <div className="space-y-2 mt-2">
                    {/* Category Label */}
                    <Base height="0.625rem" width="30%" borderRadius="1px" className="opacity-60" />
                    {/* Main Title */}
                    <Base height="1.25rem" width="75%" borderRadius="2px" />
                    {/* Sub description / specifications */}
                    <div className="flex gap-2 pt-1">
                        <Base height="0.75rem" width="20%" borderRadius="1px" />
                        <Base height="0.75rem" width="15%" borderRadius="1px" />
                    </div>
                </div>
            )}
        </div>
    )
}

// Grid layout for cards
export const Grid = ({ cols = 3, count = 6, className = '', cardHeight = '300px' }) => {
    const colClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    }

    return (
        <div className={`grid ${colClasses[cols] || colClasses[3]} gap-8 ${className}`}>
            {Array.from({ length: count }).map((_, idx) => (
                <Card key={idx} height={cardHeight} />
            ))}
        </div>
    )
}

// Hero section skeleton
export const Hero = ({ className = '' }) => {
    return (
        <div className={`w-full min-h-[50vh] flex flex-col justify-center items-start px-6 sm:px-16 py-16 gap-6 border-b border-windoor-outline-light/10 bg-windoor-container-low/30 ${className}`}>
            <Base height="0.75rem" width="120px" borderRadius="1px" className="opacity-60 uppercase" />
            <Heading level={1} width="55%" />
            <Text lines={2} className="max-w-xl w-full" />
            <div className="flex gap-4 pt-4">
                <Base height="2.75rem" width="140px" borderRadius="9999px" />
                <Base height="2.75rem" width="110px" borderRadius="9999px" className="opacity-50" />
            </div>
        </div>
    )
}

// Full page loader template combining components
export const Page = ({ className = '' }) => {
    return (
        <div className={`min-h-screen w-full bg-windoor-background pt-[80px] flex flex-col justify-between ${className}`}>
            <div className="w-full flex-grow">
                {/* Hero Section */}
                <Hero />

                {/* Content Section */}
                <div className="max-w-360 mx-auto px-6 sm:px-16 py-16 w-full space-y-16">
                    {/* Split Section: Text + Box */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <Base height="0.75rem" width="100px" borderRadius="1px" className="opacity-50" />
                            <Heading level={2} width="40%" />
                            <Text lines={4} />
                        </div>
                        <div className="lg:col-span-5 h-[350px]">
                            <Base height="100%" width="100%" borderRadius="2px" />
                        </div>
                    </div>

                    {/* Cards Grid Section */}
                    <div className="space-y-8 pt-8">
                        <div className="flex justify-between items-end border-b border-windoor-outline-light/10 pb-4">
                            <Heading level={3} width="200px" />
                            <Base height="1rem" width="80px" borderRadius="2px" className="opacity-60" />
                        </div>
                        <Grid cols={3} count={3} cardHeight="280px" />
                    </div>
                </div>
            </div>

            {/* Footer Placeholder */}
            <div className="w-full bg-[#111] p-12 flex flex-col sm:flex-row justify-between items-center gap-6 opacity-30 mt-12">
                <Base height="1.5rem" width="120px" className="opacity-40" />
                <div className="flex gap-6">
                    <Base height="0.75rem" width="60px" className="opacity-30" />
                    <Base height="0.75rem" width="60px" className="opacity-30" />
                    <Base height="0.75rem" width="60px" className="opacity-30" />
                </div>
            </div>
        </div>
    )
}

const Skeleton = {
    Base,
    Heading,
    Text,
    Card,
    Grid,
    Hero,
    Page
}

export default Skeleton
