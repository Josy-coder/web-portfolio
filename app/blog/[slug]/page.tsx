'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import { fetchBlogBySlug } from '@/lib/api'
import 'highlight.js/styles/github-dark.css'

function formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(dateObj)
}

export default function BlogPost() {
    const params = useParams()
    const router = useRouter()
    const slug = params.slug as string

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', slug],
        queryFn: () => fetchBlogBySlug(slug)
    })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">📖</div>
                    <p className="text-foreground/60">Loading blog post...</p>
                </div>
            </div>
        )
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-semibold">Blog Post Not Found</h2>
                    <p className="text-foreground/60">The blog post you&#39;re looking for doesn&#39;t exist.</p>
                    <Link
                        href="/blog"
                        className="inline-block bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                    >
                        Back to Blog
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-foreground/60 hover:text-foreground hover:cursor-pointer transition-colors mb-8"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <article className="space-y-6">
                        <div className="flex items-center gap-3 text-sm text-foreground/60">
                            <time dateTime={new Date(blog.createdAt).toISOString()}>
                                {formatDate(blog.createdAt)}
                            </time>
                            <span>•</span>
                            <span>{Math.ceil(blog.content.split(' ').length / 200)} min read</span>
                            {blog.featured && (
                                <>
                                    <span>•</span>
                                    <span className="text-blue-500">Featured</span>
                                </>
                            )}
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            {blog.title}
                        </h1>

                        {blog.excerpt && (
                            <p className="text-xl text-foreground/70 leading-relaxed">
                                {blog.excerpt}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-foreground/10 px-3 py-1 rounded-lg text-sm"
                                >
                  {tag}
                </span>
                            ))}
                        </div>

                        {blog.featuredImage && (
                            <div className="aspect-video relative rounded-lg overflow-hidden bg-foreground/5">
                                <Image
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <div className="prose prose-lg prose-invert max-w-none mt-12">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                                components={{
                                    img: ({ node, ...props }) => (
                                        <div className="relative w-full my-8">
                                            <img
                                                {...props}
                                                className="rounded-lg w-full h-auto"
                                                loading="lazy"
                                            />
                                        </div>
                                    ),
                                    code: ({ node, inline, className, children, ...props }: any) => {
                                        if (inline) {
                                            return (
                                                <code className="bg-foreground/10 px-1.5 py-0.5 rounded text-sm" {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                        return (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        )
                                    },
                                    h1: ({ children }) => (
                                        <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
                                    ),
                                    a: ({ children, href }) => (
                                        <a
                                            href={href}
                                            className="text-blue-500 hover:text-blue-400 underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {children}
                                        </a>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-foreground/20 pl-4 italic my-6">
                                            {children}
                                        </blockquote>
                                    ),
                                    p: ({ children }) => (
                                        <p className="my-4 leading-relaxed text-foreground/90">{children}</p>
                                    ),
                                }}
                            >
                                {blog.content}
                            </ReactMarkdown>
                        </div>

                        <div className="border-t border-foreground/10 pt-8 mt-12">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Share this post</h3>
                                    <div className="flex gap-3">
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-foreground/10 px-4 py-2 rounded-lg hover:bg-foreground/20 transition-colors text-sm"
                                        >
                                            Twitter
                                        </a>
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-foreground/10 px-4 py-2 rounded-lg hover:bg-foreground/20 transition-colors text-sm"
                                        >
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                                <Link
                                    href="/blog"
                                    className="bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                                >
                                    Read More Posts
                                </Link>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}