import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/careers/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const career = await prisma.career.findUnique({
            where: { id: params.id }
        })

        if (!career) {
            return NextResponse.json(
                { error: 'Career not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(career)
    } catch (error) {
        console.error('Error fetching career:', error)
        return NextResponse.json(
            { error: 'Failed to fetch career' },
            { status: 500 }
        )
    }
}

// PUT /api/careers/[id]
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
            company,
            location,
            startDate,
            endDate,
            current,
            description,
            achievements,
            technologies,
            order
        } = body

        const updateData: any = {}

        if (title !== undefined) updateData.title = title
        if (company !== undefined) updateData.company = company
        if (location !== undefined) updateData.location = location
        if (startDate !== undefined) updateData.startDate = new Date(startDate)
        if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null
        if (current !== undefined) updateData.current = current
        if (description !== undefined) updateData.description = description
        if (achievements !== undefined) updateData.achievements = achievements
        if (technologies !== undefined) updateData.technologies = technologies
        if (order !== undefined) updateData.order = order

        const career = await prisma.career.update({
            where: { id: params.id },
            data: updateData
        })

        return NextResponse.json(career)
    } catch (error) {
        console.error('Error updating career:', error)
        return NextResponse.json(
            { error: 'Failed to update career' },
            { status: 500 }
        )
    }
}

// DELETE /api/careers/[id]
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

        await prisma.career.delete({
            where: { id: params.id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting career:', error)
        return NextResponse.json(
            { error: 'Failed to delete career' },
            { status: 500 }
        )
    }
}