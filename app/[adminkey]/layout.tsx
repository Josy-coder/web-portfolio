'use client'

import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
    const params = useParams()
    const pathname = usePathname()
    const adminKey = params.adminkey as string

    const isActive = (path: string) => {
        return pathname === `/${adminKey}${path}`
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Admin Navigation */}
            <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/10">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Admin Title */}
                        <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">
                <span className="text-foreground/60">Admin</span>
                <span className="text-foreground"> Dashboard</span>
              </span>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-1">
                            <Link
                                href={`/${adminKey}/blogs`}
                                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                                    isActive('/blogs')
                                        ? 'bg-foreground text-background'
                                        : 'hover:bg-foreground/10'
                                }`}
                            >
                                Blogs
                            </Link>
                            <Link
                                href={`/${adminKey}/projects`}
                                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                                    isActive('/projects')
                                        ? 'bg-foreground text-background'
                                        : 'hover:bg-foreground/10'
                                }`}
                            >
                                Projects
                            </Link>
                            <Link
                                href={`/${adminKey}/careers`}
                                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                                    isActive('/careers')
                                        ? 'bg-foreground text-background'
                                        : 'hover:bg-foreground/10'
                                }`}
                            >
                                Careers
                            </Link>
                            <div className="mx-2 h-6 w-px bg-foreground/20" />
                            <Link
                                href="/"
                                className="px-4 py-2 rounded-lg hover:bg-foreground/10 transition-colors font-medium flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Website
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    )
}