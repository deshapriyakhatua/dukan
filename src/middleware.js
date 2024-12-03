import { NextResponse } from 'next/server';
import { auth } from './auth';


export const middleware = auth((request) =>  {
    const session = request.auth;
    const pathname = request.nextUrl.pathname;
    console.log('middleware: ',  pathname, session)
    const secureApiRoutes = ['/api/cart', '/api/product/add', '/api/users', '/api/order'];
    const secureRoutes = ['/checkout', '/profile', '/cart', '/orders'];

    switch (true) {
        case secureApiRoutes.some(route => pathname.startsWith(route)): {
            // Validate session
            console.log('middleware1: ', session?.user?.id)
            if (!session?.user) {
                // No session cookie present
                return NextResponse.json(
                    { error: 'Unauthorized: No session provided' },
                    { status: 401 }
                );
            }

            // If session is valid, allow the request to proceed
            const response = NextResponse.next();
            response.headers.set('x-user-id', session?.user?.id);
            return response;
            break;
        }

        case pathname.startsWith('/auth'): {

            if (session?.user) {
                console.log(`redict to home ('/')`)
                // redict to home ('/')
                return NextResponse.redirect(new URL('/', request.url));
            }
            break;
        }

        case secureRoutes.some(route => pathname.startsWith(route)): {

            if (!session?.user) {
                console.log(`redict to auth ('/auth/signin')`)
                // redict to auth ('/auth/signin')
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
});

// Apply middleware only to specific routes
export const config = {
    matcher: [
        '/:path*'
    ],
};
