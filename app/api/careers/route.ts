import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/careers
export async function GET(request: NextRequest) {
    try {
        const careers = await prisma.career.findMany({
            orderBy: [
                { order: 'asc' },
                { startDate: 'desc' }
            ]
        })

        return NextResponse.json(careers)
    } catch (error) {
        console.error('Error fetching careers:', error)
        return NextResponse.json(
            { error: 'Failed to fetch careers' },
            { status: 500 }
        )
    }
}

// POST /api/careers
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

        const career = await prisma.career.create({
            data: {
                title,
                company,
                location,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                current: current || false,
                description,
                achievements: achievements || [],
                technologies: technologies || [],
                order: parseInt(order) || 0
            }
        })

        return NextResponse.json(career)
    } catch (error) {
        console.error('Error creating career:', error)
        return NextResponse.json(
            { error: 'Failed to create career' },
            { status: 500 }
        )
    }
}