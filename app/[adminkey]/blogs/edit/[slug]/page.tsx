'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchBlogBySlug, updateBlog } from '@/lib/api'
import { Blog } from '@/types'
import ImageUpload from '@/components/ImageUpload'
import MarkdownEditor from '@/components/MarkdownEditor'

export default function EditBlogPage() {
    const params = useParams()
    const router = useRouter()
    const adminKey = params.adminkey as string
    const blogSlug = params.slug as string

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        slug: '',
        published: false,
        featured: false,
        featuredImage: '',
        tags: ''
    })

    const { data: blog, isLoading } = useQuery({
        queryKey: ['blog', blogSlug],
        queryFn: () => fetchBlogBySlug(blogSlug)
    })

    const updateMutation = useMutation({
        mutationFn: (data: Partial<Blog>) => updateBlog(blogSlug, data, adminKey),
        onSuccess: () => {
            router.push(`/${adminKey}/blogs`)
        }
    })

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || '',
                content: blog.content || '',
                excerpt: blog.excerpt || '',
                slug: blog.slug || '',
                published: blog.published || false,
                featured: blog.featured || false,
                featuredImage: blog.featuredImage || '',
                tags: blog.tags ? blog.tags.join(', ') : ''
            })
        }
    }, [blog])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const blogData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        }

        updateMutation.mutate(blogData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    const handleContentChange = (content: string) => {
        setFormData(prev => ({
            ...prev,
            content
        }))
    }


    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-foreground/20 rounded w-1/3"></div>
                    <div className="h-4 bg-foreground/10 rounded w-2/3"></div>
                    <div className="space-y-4">
                        <div className="h-10 bg-foreground/20 rounded"></div>
                        <div className="h-20 bg-foreground/20 rounded"></div>
                        <div className="h-10 bg-foreground/20 rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Edit Blog Post</h1>
                <p className="text-foreground/60">
                    Update your blog post content and settings.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Basic Information</h2>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium mb-2">
                            Slug *
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            placeholder="my-blog-post"
                        />
                        <p className="text-xs text-foreground/60 mt-1">
                            URL-friendly version of the title
                        </p>
                    </div>

                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                            Excerpt
                        </label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-vertical"
                            placeholder="Brief description of your blog post..."
                        />
                    </div>

                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium mb-2">
                            Tags
                        </label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            placeholder="react, typescript, web development"
                        />
                        <p className="text-xs text-foreground/60 mt-1">
                            Separate tags with commas
                        </p>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Featured Image</h2>
                    <ImageUpload
                        currentImage={formData.featuredImage}
                        onImageChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url || '' }))}
                        maxImages={1}
                    />
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Content</h2>
                    <MarkdownEditor
                        value={formData.content}
                        onChange={handleContentChange}
                    />
                </div>

                {/* Settings */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Settings</h2>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="published"
                                name="published"
                                checked={formData.published}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-foreground/20"
                            />
                            <label htmlFor="published" className="text-sm">
                                Published
                            </label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="featured"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-foreground/20"
                            />
                            <label htmlFor="featured" className="text-sm">
                                Featured
                            </label>
                        </div>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6">
                    <button
                        type="button"
                        onClick={() => router.push(`/${adminKey}/blogs`)}
                        className="flex-1 border border-foreground/20 px-6 py-3 rounded-lg hover:border-foreground/40 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="flex-1 bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium disabled:opacity-50"
                    >
                        {updateMutation.isPending ? 'Updating...' : 'Update Blog Post'}
                    </button>
                </div>

                {updateMutation.error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-500 text-sm">
                            Error updating blog post. Please try again.
                        </p>
                    </div>
                )}
            </form>
        </div>
    )
}