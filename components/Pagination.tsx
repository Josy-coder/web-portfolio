'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface PaginationProps {
    currentPage: number
    totalPages: number
    baseUrl?: string
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${baseUrl || pathname}?${params.toString()}`
    }

    if (totalPages <= 1) return null

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const showEllipsis = totalPages > 7

        if (!showEllipsis) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        // Always show first page
        pages.push(1)

        if (currentPage <= 3) {
            // Show first 5 pages
            for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
                pages.push(i)
            }
            if (totalPages > 5) pages.push('...')
        } else if (currentPage >= totalPages - 2) {
            // Show last 5 pages
            pages.push('...')
            for (let i = totalPages - 4; i < totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Show pages around current page
            pages.push('...')
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pages.push(i)
            }
            pages.push('...')
        }

        // Always show last page
        if (!pages.includes(totalPages)) {
            pages.push(totalPages)
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={createPageUrl(currentPage - 1)}
                    className="px-3 py-2 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-200 group"
                >
          <span className="flex items-center gap-1 text-sm font-medium">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </span>
                </Link>
            ) : (
                <button
                    disabled
                    className="px-3 py-2 rounded-lg bg-foreground/5 border border-foreground/5 text-foreground/30 cursor-not-allowed"
                >
          <span className="flex items-center gap-1 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </span>
                </button>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-3 py-2 text-foreground/50"
                            >
                ...
              </span>
                        )
                    }

                    const pageNum = page as number
                    const isActive = pageNum === currentPage

                    return isActive ? (
                        <button
                            key={pageNum}
                            className="min-w-[40px] h-10 px-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm shadow-lg"
                            aria-current="page"
                        >
                            {pageNum}
                        </button>
                    ) : (
                        <Link
                            key={pageNum}
                            href={createPageUrl(pageNum)}
                            className="min-w-[40px] h-10 px-3 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-200 font-medium text-sm flex items-center justify-center"
                        >
                            {pageNum}
                        </Link>
                    )
                })}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={createPageUrl(currentPage + 1)}
                    className="px-3 py-2 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-200 group"
                >
          <span className="flex items-center gap-1 text-sm font-medium">
            Next
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
                </Link>
            ) : (
                <button
                    disabled
                    className="px-3 py-2 rounded-lg bg-foreground/5 border border-foreground/5 text-foreground/30 cursor-not-allowed"
                >
          <span className="flex items-center gap-1 text-sm font-medium">
            Next
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
                </button>
            )}
        </nav>
    )
}