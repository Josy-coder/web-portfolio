export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            <div className="container mx-auto px-6 h-[calc(100vh-5rem)]">
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="text-center py-6">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                            About <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Me</span>
                        </h1>
                        <p className="text-base text-foreground/70">
                            Bridging the gap between Communication and Technology
                        </p>
                    </div>

                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 pb-6">

                        <div className="lg:col-span-2 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-4 overflow-y-auto">
                            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <span className="text-xl">👋</span>
                                Baho Kemana Joselyto Charite
                            </h2>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                                Based in Rwanda, I&#39;m a developer who believes that great technology without great communication is like a Ferrari with square wheels – technically impressive but going nowhere fast! I hold a Bachelor&#39;s in Communications from Southern New Hampshire University, but my journey led me deep into the IT realm, where I discovered my true calling.
                            </p>
                            <div className="mt-3 space-y-2">
                                <div>
                                    <h3 className="text-sm font-medium text-foreground">Digital Innovation Fellow • GanzAfrica Foundation</h3>
                                    <p className="text-xs text-foreground/60">2023 - 2025 • Seconded at MINAGRI</p>
                                    <p className="mt-1 text-xs text-foreground/70">
                                        Developed project tracking systems, contributed to seed policy, and worked on AMIS. This experience crystallized my passion for merging comms with technical solutions.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-foreground">Freelance Developer</h3>
                                    <p className="text-xs text-foreground/60">Since 2020</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-foreground/10 rounded-lg p-4 flex flex-col justify-center items-center text-center">
                            <h2 className="text-lg font-semibold mb-3">Let&#39;s Connect</h2>
                            <a
                                href="mailto:baho.charite@gmail.com"
                                className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors font-medium text-sm"
                            >
                                <span>📧</span>
                                Send Email
                            </a>
                        </div>

                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-4 overflow-y-auto">
                            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <span className="text-xl">⚡</span>
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

                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                My Philosophy
                            </h2>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                                Think of Communications and IT as peanut butter and jelly – individually good, but together? Magic! My background in communications gives me a unique perspective on creating technology that actually talks to people, not just at them.
                            </p>
                        </div>

                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-4 overflow-y-auto">
                            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                Beyond Code
                            </h2>
                            <div className="space-y-2 text-sm text-foreground/80">
                                <p>
                                    <span className="font-medium">Sports:</span> Football (soccer) is my passion. I also enjoy basketball!
                                </p>
                                <p>
                                    <span className="font-medium">Secret Dancer:</span> Got moves when no one&#39;s watching.
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