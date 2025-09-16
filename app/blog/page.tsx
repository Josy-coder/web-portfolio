'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { fetchBlogs } from '@/lib/api'
import { Blog } from '@/types'
import Pagination from '@/components/Pagination'

function formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(dateObj)
}

export default function BlogPage() {
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const { data, isLoading, error } = useQuery({
        queryKey: ['blogs', currentPage],
        queryFn: () => fetchBlogs(currentPage, 9)
    })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">📚</div>
                    <p className="text-foreground/60">Loading blogs...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <p className="text-foreground/60">Failed to load blogs. Please try again later.</p>
                </div>
            </div>
        )
    }

    const { blogs, pagination } = data || { blogs: [], pagination: { page: 1, limit: 9, total: 0, pages: 0 } }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold">
                        My <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Blog</span>
                    </h1>
                    <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                        Thoughts, insights, and learnings from my journey as a developer.
                        I write about web development, technology trends, and problem-solving approaches.
                    </p>
                </div>

                {blogs.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {blogs.map((blog: Blog) => (
                                <Link
                                    key={blog.id}
                                    href={`/blog/${blog.slug}`}
                                    className="group bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:scale-[1.02] flex flex-col"
                                >
                                    <div className="h-40 relative bg-gradient-to-br from-blue-500/10 to-purple-600/10">
                                        {blog.featuredImage ? (
                                            <Image
                                                src={blog.featuredImage}
                                                alt={blog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-5xl opacity-50">📝</span>
                                            </div>
                                        )}

                                        {blog.featured && (
                                            <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-md">
                                                Featured
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-xs text-foreground/60 mb-3">
                                            <time dateTime={new Date(blog.createdAt).toISOString()}>
                                                {formatDate(blog.createdAt)}
                                            </time>
                                            <span>•</span>
                                            <span>{blog.tags.length > 0 ? blog.tags[0] : 'Article'}</span>
                                        </div>

                                        <h3 className="text-lg font-semibold group-hover:text-foreground/80 transition-colors line-clamp-2 mb-2">
                                            {blog.title}
                                        </h3>

                                        {blog.excerpt && (
                                            <p className="text-foreground/60 text-sm line-clamp-3 mb-4 flex-1">
                                                {blog.excerpt}
                                            </p>
                                        )}

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {blog.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs bg-foreground/10 px-2 py-1 rounded-md"
                                                >
                          {tag}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {pagination.pages >= 1 && (
                            <div className="mt-12">
                                <Pagination
                                    currentPage={pagination.page}
                                    totalPages={pagination.pages}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold mb-2">No Blog Posts Yet</h3>
                        <p className="text-foreground/60">
                            I&#39;m working on some interesting articles. Check back soon!
                        </p>
                    </div>
                )}

                <div className="max-w-2xl mx-auto text-center mt-16 space-y-4 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-8">
                    <h2 className="text-2xl font-semibold">Have Something to Discuss?</h2>
                    <p className="text-foreground/70">
                        I&#39;d love to hear your thoughts or discuss potential collaborations.
                    </p>
                    <a
                        href="mailto:baho.charite@gmail.com"
                        className="inline-block bg-foreground text-background px-6 py-2 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                    >
                        Send me an Email
                    </a>
                </div>
            </div>
        </div>
    )
}