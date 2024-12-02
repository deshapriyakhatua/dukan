import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/session'; // Assuming decrypt is from your session management module
import { auth } from './auth';

export default async function middleware(request) {
    // console.log("session middleware: ", session)
    const pathname = request.nextUrl.pathname;
    const secureApiRoutes = ['/api/cart', '/api/product/add', '/api/users', '/api/order'];
    const secureRoutes = ['/checkout', '/profile', '/cart', '/orders'];

    switch (true) {
        case secureApiRoutes.some(route => pathname.startsWith(route)): {
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
            const response = NextResponse.next();
            response.headers.set('x-user-id', payload.userId);
            return response;
            break;
        }

        case pathname.startsWith('/auth'): {
            const sessionCookie = request.cookies.get('session')?.value;
            const session = await auth();

            if (session?.user) {
                // redict to home ('/')
                return NextResponse.redirect(new URL('/', request.url));
            }
            break;
        }

        case secureRoutes.some(route => pathname.startsWith(route)): {
            const sessionCookie = request.cookies.get('session')?.value;
            const session = await auth();

            if (!session?.user) {
                // redict to home ('/auth/signin')
                return NextResponse.redirect(new URL('/auth/signin', request.url));
            }
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
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
};
