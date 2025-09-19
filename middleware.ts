import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if this is an admin route (any route with [adminkey])
    const pathSegments = pathname.split('/').filter(segment => segment !== '')

    if (pathSegments.length >= 2) {
        const potentialAdminKey = pathSegments[0]
        const adminPath = `/${pathSegments.slice(1).join('/')}`

        // Check if this looks like an admin route
        const adminRoutes = ['blogs', 'projects']
        const isAdminRoute = adminRoutes.some(route => adminPath.startsWith(`/${route}`))

        if (isAdminRoute) {
            const validAdminKey = process.env.ADMIN_KEY

            if (!validAdminKey) {
                console.error('ADMIN_KEY environment variable is not set')
                return NextResponse.redirect(new URL('/404', request.url))
            }

            if (potentialAdminKey !== validAdminKey) {
                // Invalid admin key, redirect to 404 to hide admin routes
                return NextResponse.redirect(new URL('/404', request.url))
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
    ],
}