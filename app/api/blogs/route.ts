import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/blogs?page=1&limit=5&featured=true
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '5')
        const featuredOnly = searchParams.get('featured') === 'true'

        const skip = (page - 1) * limit

        const where = {
            published: true,
            ...(featuredOnly && { featured: true })
        }

        const [blogs, total] = await Promise.all([
            prisma.blog.findMany({
                where,
                skip,
                take: limit,
                orderBy: [
                    { featured: 'desc' },
                    { updatedAt: 'desc' }
                ],
                select: {
                    id: true,
                    title: true,
                    excerpt: true,
                    slug: true,
                    featuredImage: true,
                    tags: true,
                    createdAt: true,
                    updatedAt: true,
                    featured: true
                }
            }),
            prisma.blog.count({ where })
        ])

        return NextResponse.json({
            blogs,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Error fetching blogs:', error)
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 }
        )
    }
}

// POST /api/blogs
// Requires 'x-admin-key' header for authentication
export async function POST(request: NextRequest) {
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

        const blog = await prisma.blog.create({
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
        console.error('Error creating blog:', error)
        return NextResponse.json(
            { error: 'Failed to create blog' },
            { status: 500 }
        )
    }
}

// DELETE /api/blogs
// Requires 'x-admin-key' header for authentication
export async function DELETE(request: NextRequest) {
    try {
        const adminKey = request.headers.get('x-admin-key')

        if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { ids } = body

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { error: 'Invalid blog IDs' },
                { status: 400 }
            )
        }

        await prisma.blog.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return NextResponse.json({ success: true, deleted: ids.length })
    } catch (error) {
        console.error('Error deleting blogs:', error)
        return NextResponse.json(
            { error: 'Failed to delete blogs' },
            { status: 500 }
        )
    }
}