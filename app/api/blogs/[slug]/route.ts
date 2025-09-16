import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/blogs/[slug]
export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                slug: params.slug,
                published: true
            }
        })

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(blog)
    } catch (error) {
        console.error('Error fetching blog:', error)
        return NextResponse.json(
            { error: 'Failed to fetch blog' },
            { status: 500 }
        )
    }
}

// PUT /api/blogs/[slug]
// Requires 'x-admin-key' header for authentication
export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const adminKey = request.headers.get('x-admin-key')

        if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { title, content, excerpt, slug, featuredImage, tags, published, featured } = body

        const blog = await prisma.blog.update({
            where: { slug: params.slug },
            data: {
                title,
                content,
                excerpt,
                slug,
                featuredImage,
                tags: tags || [],
                published: published || false,
                featured: featured || false
            }
        })

        return NextResponse.json(blog)
    } catch (error) {
        console.error('Error updating blog:', error)
        return NextResponse.json(
            { error: 'Failed to update blog' },
            { status: 500 }
        )
    }
}

// DELETE /api/blogs/[slug]
// Requires 'x-admin-key' header for authentication
export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const adminKey = request.headers.get('x-admin-key')

        if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        await prisma.blog.delete({
            where: { slug: params.slug }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting blog:', error)
        return NextResponse.json(
            { error: 'Failed to delete blog' },
            { status: 500 }
        )
    }
}