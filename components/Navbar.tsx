'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-background/80 backdrop-blur-md border border-foreground/10 rounded-lg px-6 py-3 shadow-lg">
            <div className="flex items-center justify-between">
                <Link
                    href="/"
                    className="font-semibold text-lg hover:text-foreground/80 transition-colors"
                >
                    Portfolio
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    <Link
                        href="/projects"
                        className="hover:text-foreground/80 transition-colors"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/blog"
                        className="hover:text-foreground/80 transition-colors"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-foreground/80 transition-colors"
                    >
                        About
                    </Link>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-md hover:bg-foreground/5 transition-colors"
                >
                    <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                        <span className={`h-0.5 bg-foreground transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <span className={`h-0.5 bg-foreground transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                        <span className={`h-0.5 bg-foreground transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                    </div>
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-foreground/10">
                    <div className="flex flex-col space-y-3">
                        <Link
                            href="/projects"
                            className="hover:text-foreground/80 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/blog"
                            className="hover:text-foreground/80 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            className="hover:text-foreground/80 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}