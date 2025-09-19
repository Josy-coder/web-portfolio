'use client'

import { useState, Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { Blog } from '../../../types'
import { fetchBlogs, deleteBlogs } from '../../../lib/api'
import Pagination from '../../../components/Pagination'

function formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(dateObj)
}

function AdminBlogsContent() {
    const params = useParams()
    const searchParams = useSearchParams()
    const queryClient = useQueryClient()

    const adminKey = params.adminkey as string
    const currentPage = Number(searchParams.get('page')) || 1

    const [selectedBlogs, setSelectedBlogs] = useState<string[]>([])
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['admin-blogs', currentPage],
        queryFn: () => fetchBlogs(currentPage, 12)
    })

    const deleteMutation = useMutation({
        mutationFn: (ids: string[]) => deleteBlogs(ids, adminKey),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
            setSelectedBlogs([])
            setShowDeleteConfirm(false)
        }
    })

    const toggleBlog = (id: string) => {
        setSelectedBlogs(prev =>
            prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        if (!data?.blogs) return
        if (selectedBlogs.length === data.blogs.length) {
            setSelectedBlogs([])
        } else {
            setSelectedBlogs(data.blogs.map(b => b.id))
        }
    }

    const handleDelete = () => {
        if (selectedBlogs.length > 0) {
            deleteMutation.mutate(selectedBlogs)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="text-4xl mb-4 animate-bounce">📚</div>
                    <p className="text-foreground/60">Loading blogs...</p>
                </div>
            </div>
        )
    }

    const { blogs, pagination } = data || { blogs: [], pagination: { page: 1, limit: 12, total: 0, pages: 0 } }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Manage Blogs</h1>
                    <p className="text-foreground/60 mt-1">{pagination.total} total blogs</p>
                </div>
                <div className="flex items-center gap-3">
                    {selectedBlogs.length > 0 && (
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors font-medium"
                        >
                            Delete ({selectedBlogs.length})
                        </button>
                    )}
                    <Link
                        href={`/${adminKey}/blogs/create`}
                        className="bg-foreground text-background px-6 py-2 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                    >
                        + Create New Blog
                    </Link>
                </div>
            </div>

            {/* Blogs Grid */}
            {blogs.length > 0 ? (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {blogs.map((blog: Blog) => (
                            <div
                                key={blog.id}
                                className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg overflow-hidden hover:border-foreground/20 transition-all group"
                            >
                                {/* Image */}
                                <div className="h-32 relative bg-gradient-to-br from-blue-500/10 to-purple-600/10">
                                    {blog.featuredImage ? (
                                        <Image
                                            src={blog.featuredImage}
                                            alt={blog.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-3xl opacity-50">📝</span>
                                        </div>
                                    )}

                                    {/* Checkbox */}
                                    <div className="absolute top-2 left-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedBlogs.includes(blog.id)}
                                            onChange={() => toggleBlog(blog.id)}
                                            className="w-5 h-5 rounded border-2 border-foreground/20 bg-background/50 backdrop-blur-sm cursor-pointer"
                                        />
                                    </div>

                                    {/* Badges */}
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        {blog.featured && (
                                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Featured</span>
                                        )}
                                        {blog.published && (
                                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Published</span>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 space-y-3">
                                    <div>
                                        <h3 className="font-medium line-clamp-2 text-sm">
                                            {blog.title}
                                        </h3>
                                        <p className="text-xs text-foreground/60 mt-1">
                                            {formatDate(blog.updatedAt)}
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1">
                                        {blog.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-foreground/10 px-2 py-0.5 rounded"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-2">
                                        <Link
                                            href={`/${adminKey}/blogs/edit/${blog.slug}`}
                                            className="flex-1 bg-foreground/10 hover:bg-foreground/20 px-3 py-1.5 rounded text-xs font-medium text-center transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/blog/${blog.slug}`}
                                            target="_blank"
                                            className="flex-1 border border-foreground/20 hover:border-foreground/40 px-3 py-1.5 rounded text-xs font-medium text-center transition-colors"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div className="mt-8">
                            <Pagination
                                currentPage={pagination.page}
                                totalPages={pagination.pages}
                                baseUrl={`/${adminKey}/blogs`}
                            />
                        </div>
                    )}

                    {/* Select All */}
                    <div className="flex justify-center">
                        <button
                            onClick={toggleAll}
                            className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                        >
                            {selectedBlogs.length === blogs.length ? 'Deselect All' : 'Select All'}
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold mb-2">No Blogs Yet</h3>
                    <p className="text-foreground/60 mb-6">
                        Create your first blog post to get started.
                    </p>
                    <Link
                        href={`/${adminKey}/blogs/create`}
                        className="inline-block bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                    >
                        Create Your First Blog
                    </Link>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-background border border-foreground/20 rounded-lg p-6 max-w-md mx-4">
                        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                        <p className="text-foreground/70 mb-6">
                            Are you sure you want to delete {selectedBlogs.length} blog{selectedBlogs.length > 1 ? 's' : ''}? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 border border-foreground/20 px-4 py-2 rounded-lg hover:border-foreground/40 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteMutation.isPending}
                                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function AdminBlogsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="text-4xl mb-4 animate-bounce">📚</div>
                    <p className="text-foreground/60">Loading blogs...</p>
                </div>
            </div>
        }>
            <AdminBlogsContent />
        </Suspense>
    )
}