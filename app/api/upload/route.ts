import { put, del } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const filename = searchParams.get('filename')
        const oldUrl = searchParams.get('oldUrl')

        if (!filename) {
            return NextResponse.json(
                { error: 'Filename is required' },
                { status: 400 }
            )
        }

        if (!request.body) {
            return NextResponse.json(
                { error: 'File data is required' },
                { status: 400 }
            )
        }

        // Delete old image if provided
        if (oldUrl) {
            try {
                await del(oldUrl, {
                    token: process.env.BLOB_READ_WRITE_TOKEN!
                })
            } catch (deleteError) {
                console.warn('Failed to delete old image:', deleteError)
            }
        }

        // Upload new image
        const blob = await put(filename, request.body, {
            access: 'public',
            addRandomSuffix: true,
            token: process.env.BLOB_READ_WRITE_TOKEN!,
        })

        return NextResponse.json({ url: blob.url })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const url = searchParams.get('url')

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            )
        }

        await del(url, {
            token: process.env.BLOB_READ_WRITE_TOKEN!
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Delete error:', error)
        return NextResponse.json(
            { error: 'Failed to delete file' },
            { status: 500 }
        )
    }
}