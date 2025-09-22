'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { fetchBlogs } from '@/lib/api'
import { Blog } from '@/types'
import Pagination from '@/components/Pagination'
import { BlogGridSkeleton } from '@/components/Skeleton'
import { Suspense } from 'react'

function formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(dateObj)
}

function BlogContent() {
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const { data, isLoading, error } = useQuery({
        queryKey: ['blogs', currentPage],
        queryFn: () => fetchBlogs(currentPage, 9)
    })

    if (isLoading) {
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

                    <BlogGridSkeleton />
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
                        <div className="max-w-4xl mx-auto bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg overflow-hidden">
                            {blogs.map((blog: Blog) => (
                                <Link
                                    key={blog.id}
                                    href={`/blog/${blog.slug}`}
                                    className="group flex items-center gap-6 p-6 border-b border-foreground/10 last:border-b-0 hover:bg-foreground/10 transition-all duration-300"
                                >
                                    {/* Blog Image */}
                                    <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-lg overflow-hidden relative">
                                        {blog.featuredImage ? (
                                            <Image
                                                src={blog.featuredImage}
                                                alt={blog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-2xl opacity-50">📝</span>
                                            </div>
                                        )}
                                        {blog.featured && (
                                            <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-1 py-0.5 rounded">
                                                ★
                                            </div>
                                        )}
                                    </div>

                                    {/* Blog Content */}
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <h3 className="text-lg font-semibold group-hover:text-blue-500 transition-colors line-clamp-1">
                                                {blog.title}
                                            </h3>
                                            {blog.excerpt && (
                                                <p className="text-foreground/70 text-sm line-clamp-2 mt-1">
                                                    {blog.excerpt}
                                                </p>
                                            )}
                                        </div>

                                        {/* Tags and Date */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-wrap gap-2">
                                                {blog.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs bg-foreground/10 px-2 py-1 rounded-md"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <time className="text-xs text-foreground/50" dateTime={new Date(blog.createdAt).toISOString()}>
                                                {formatDate(blog.createdAt)}
                                            </time>
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

export default function BlogPage() {
    return (
        <Suspense fallback={
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
                    <BlogGridSkeleton />
                </div>
            </div>
        }>
            <BlogContent />
        </Suspense>
    )
}