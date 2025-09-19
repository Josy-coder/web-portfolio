'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { createBlog } from '@/lib/api'
import { Blog } from '@/types'
import MarkdownEditor from '@/components/MarkdownEditor'
import ImageUpload from '@/components/ImageUpload'

export default function CreateBlogPage() {
    const params = useParams()
    const router = useRouter()
    const adminKey = params.adminkey as string

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        tags: '',
        published: false,
        featured: false
    })

    const createMutation = useMutation({
        mutationFn: (data: Partial<Blog>) => createBlog(data, adminKey),
        onSuccess: () => {
            router.push(`/${adminKey}/blogs`)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const blogData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        }

        createMutation.mutate(blogData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Create New Blog Post</h1>
                <p className="text-foreground/60 mt-1">Fill in the details to create a new blog post</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                        placeholder="Enter blog title..."
                    />
                </div>

                {/* Slug */}
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium mb-2">
                        Slug (URL-friendly version)
                    </label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                        placeholder="auto-generated-from-title"
                    />
                    <p className="text-xs text-foreground/50 mt-1">Leave empty to auto-generate from title</p>
                </div>

                {/* Excerpt */}
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
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                        placeholder="Brief description of the blog post..."
                    />
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-2">
                        Content (Markdown supported) *
                    </label>
                    <MarkdownEditor
                        value={formData.content}
                        onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                        placeholder="Write your blog content in Markdown...

# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

```javascript
const code = 'example';
```

> Blockquote text

[Link text](https://example.com)"
                        height={500}
                    />
                </div>

                {/* Featured Image */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Featured Image
                    </label>
                    <ImageUpload
                        currentImage={formData.featuredImage}
                        onImageChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url || '' }))}
                        placeholder="Upload a featured image for your blog post"
                    />
                </div>

                {/* Tags */}
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
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                        placeholder="javascript, react, nextjs"
                    />
                    <p className="text-xs text-foreground/50 mt-1">Separate tags with commas</p>
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="published"
                            checked={formData.published}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-2 border-foreground/20 cursor-pointer"
                        />
                        <span className="text-sm">Published</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-2 border-foreground/20 cursor-pointer"
                        />
                        <span className="text-sm">Featured</span>
                    </label>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 border border-foreground/20 px-6 py-3 rounded-lg hover:border-foreground/40 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={createMutation.isPending}
                        className="flex-1 bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium disabled:opacity-50"
                    >
                        {createMutation.isPending ? 'Creating...' : 'Create Blog Post'}
                    </button>
                </div>

                {createMutation.isError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">
                        Failed to create blog post. Please try again.
                    </div>
                )}
            </form>
        </div>
    )
}