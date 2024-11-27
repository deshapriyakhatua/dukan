import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/session'; // Assuming decrypt is from your session management module

export async function middleware(request) {
    const pathname = request.nextUrl.pathname;

    switch (true) {
        case pathname.startsWith('/api/users'): {
            // Validate session
            const sessionCookie = request.cookies.get('session')?.value;

            if (!sessionCookie) {
                // No session cookie present
                return NextResponse.json(
                    { error: 'Unauthorized: No session provided' },
                    { status: 401 }
                );
            }

            // Verify session
            const payload = await decrypt(sessionCookie);
            if (!payload) {
                // Invalid or expired session
                return NextResponse.json(
                    { error: 'Unauthorized: Invalid or expired session' },
                    { status: 401 }
                );
            }

            // If session is valid, allow the request to proceed
            break;
        }

        case pathname.startsWith('/auth'): {
            const sessionCookie = request.cookies.get('session')?.value;

            if (sessionCookie) {
                // redict to home ('/')
                return NextResponse.redirect(new URL('/', request.url));
            }
            break;
        }

        case pathname.startsWith('/api/user'): {
            // Logic for API routes
            break;
        }

        default: {
            // Default logic for other routes
            break;
        }
    }

    return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
    matcher: [
        '/api/users/:path*', // Applies to all routes under /api/users
        '/auth/:path*'
    ],
};
