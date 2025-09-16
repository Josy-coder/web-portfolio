import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/projects/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: params.id
            }
        })

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(project)
    } catch (error) {
        console.error('Error fetching project:', error)
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        )
    }
}

// PUT /api/projects/[id]
// Requires 'x-admin-key' header for authentication
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
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

        const project = await prisma.project.update({
            where: { id: params.id },
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
        console.error('Error updating project:', error)
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        )
    }
}

// DELETE /api/projects/[id]
// Requires 'x-admin-key' header for authentication
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const adminKey = request.headers.get('x-admin-key')

        if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        await prisma.project.delete({
            where: { id: params.id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting project:', error)
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        )
    }
}