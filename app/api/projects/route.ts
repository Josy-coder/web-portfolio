import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/projects?page=1&limit=5&featured=true
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '5')
        const featuredOnly = searchParams.get('featured') === 'true'

        const skip = (page - 1) * limit

        const where = featuredOnly ? { featured: true } : {}

        const [projects, total] = await Promise.all([
            prisma.project.findMany({
                where,
                skip,
                take: limit,
                orderBy: [
                    { featured: 'desc' },
                    { updatedAt: 'desc' }
                ]
            }),
            prisma.project.count({ where })
        ])

        return NextResponse.json({
            projects,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Error fetching projects:', error)
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        )
    }
}

// POST /api/projects
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
        const {
            title,
            description,
            technologies,
            demoUrl,
            githubUrl,
            images,
            goal,
            challenges,
            lessons,
            solutions,
            featured
        } = body

        const project = await prisma.project.create({
            data: {
                title,
                description,
                technologies: technologies || [],
                demoUrl,
                githubUrl,
                images: images || [],
                goal,
                challenges,
                lessons,
                solutions,
                featured: featured || false
            }
        })

        return NextResponse.json(project)
    } catch (error) {
        console.error('Error creating project:', error)
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        )
    }
}

// DELETE /api/projects
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
                { error: 'Invalid project IDs' },
                { status: 400 }
            )
        }

        await prisma.project.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return NextResponse.json({ success: true, deleted: ids.length })
    } catch (error) {
        console.error('Error deleting projects:', error)
        return NextResponse.json(
            { error: 'Failed to delete projects' },
            { status: 500 }
        )
    }
}