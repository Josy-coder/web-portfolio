'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchCareers } from '@/lib/api'
import { Career } from '@/types'

export default function AboutPage() {
    const { data: careers, isLoading } = useQuery({
        queryKey: ['careers'],
        queryFn: fetchCareers
    })

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        })
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                        About <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Me</span>
                    </h1>
                    <p className="text-base text-foreground/70">
                        Bridging the gap between Communication and Technology
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Introduction and Career */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Introduction */}
                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span className="text-xl">👋</span>
                                Baho Kemana Joselyto Charite
                            </h2>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                                Based in Rwanda, I'm a developer who believes that great technology without great communication is like a Ferrari with square wheels – technically impressive but going nowhere fast! I hold a Bachelor's in Communications from Southern New Hampshire University, but my journey led me deep into the IT realm, where I discovered my true calling.
                            </p>
                        </div>

                        {/* Career History */}
                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span className="text-xl">💼</span>
                                Professional Journey
                            </h2>

                            {isLoading ? (
                                <div className="space-y-4">
                                    <div className="animate-pulse">
                                        <div className="h-4 bg-foreground/20 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-foreground/10 rounded w-1/2 mb-1"></div>
                                        <div className="h-3 bg-foreground/10 rounded w-full"></div>
                                    </div>
                                    <div className="animate-pulse">
                                        <div className="h-4 bg-foreground/20 rounded w-2/3 mb-2"></div>
                                        <div className="h-3 bg-foreground/10 rounded w-1/3 mb-1"></div>
                                        <div className="h-3 bg-foreground/10 rounded w-5/6"></div>
                                    </div>
                                </div>
                            ) : careers && careers.length > 0 ? (
                                <div className="space-y-4">
                                    {careers.map((career: Career) => (
                                        <div key={career.id} className="border-l-2 border-blue-500/30 pl-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-sm font-medium text-foreground">
                                                    {career.title} • {career.company}
                                                </h3>
                                                {career.current && (
                                                    <span className="bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-foreground/60 mb-2">
                                                {formatDate(career.startDate)} - {career.endDate ? formatDate(career.endDate) : 'Present'}
                                                {career.location && ` • ${career.location}`}
                                            </p>
                                            {career.description && (
                                                <p className="text-xs text-foreground/70 mb-2">
                                                    {career.description}
                                                </p>
                                            )}
                                            {career.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {career.technologies.map((tech) => (
                                                        <span key={tech} className="bg-foreground/10 px-2 py-0.5 rounded text-xs">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-foreground/60">
                                    Career information coming soon...
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Static Cards */}
                    <div className="lg:sticky lg:top-6 lg:self-start space-y-4">
                        {/* Contact Card - Smaller */}
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-foreground/10 rounded-lg p-4 text-center">
                            <h2 className="text-base font-semibold mb-2">Let's Connect</h2>
                            <a
                                href="mailto:baho.charite@gmail.com"
                                className="inline-flex items-center gap-2 bg-foreground text-background px-3 py-1.5 rounded-lg hover:bg-foreground/90 transition-colors font-medium text-xs"
                            >
                                <span>📧</span>
                                Send Email
                            </a>
                        </div>

                        {/* Philosophy Card */}
                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-2">
                                My Philosophy
                            </h2>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                                Think of Communications and IT as peanut butter and jelly – individually good, but together? Magic! My background in communications gives me a unique perspective on creating technology that actually talks to people, not just at them.
                            </p>
                        </div>

                        {/* Tech Arsenal Card */}
                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                Tech Arsenal
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="text-xs font-medium text-foreground/70 mb-1">Languages & Frameworks</h3>
                                    <div className="flex flex-wrap gap-1">
                                        {['JS', 'TS', 'Python', 'Go', 'React', 'Next.js', 'Svelte', 'Django', 'FastAPI'].map(tech => (
                                            <span key={tech} className="bg-foreground/10 px-2 py-0.5 rounded text-xs">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-medium text-foreground/70 mb-1">Data Analysis</h3>
                                    <div className="flex flex-wrap gap-1">
                                        {['Excel*', 'Python', 'R'].map(tool => (
                                            <span key={tool} className="bg-foreground/10 px-2 py-0.5 rounded text-xs">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-xs text-foreground/60 mt-1 italic">
                                        *An oldie but a goodie!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Beyond Code Card */}
                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-2">
                                Beyond Code
                            </h2>
                            <div className="space-y-2 text-sm text-foreground/80">
                                <p>
                                    <span className="font-medium">Sports:</span> Football (soccer) is my passion. I also enjoy basketball!
                                </p>
                                <p>
                                    <span className="font-medium">Secret Dancer:</span> Got moves when no one's watching.
                                </p>
                                <p>
                                    <span className="font-medium">Gymnastics:</span> I admire it (and know how inflexible I am)!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}