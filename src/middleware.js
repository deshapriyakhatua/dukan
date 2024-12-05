import { NextResponse } from 'next/server';
import { auth } from './auth';
import { DEFAULT_SIGN_IN, secureApiRoutes, securePages } from "./lib/route";

export const middleware = auth((request) => {
    const session = request.auth;
    const pathname = request.nextUrl.pathname;
    console.log('middleware: ', pathname);

    if (secureApiRoutes.some(route => pathname.startsWith(route))) {
        // Validate session
        if (!session?.user) {
            console.log('middleware: secure api routes not accessable with out valid session')
            return NextResponse.json(
                { error: 'Please Sign in First' },
                { status: 401 }
            );
        }
    } else if (securePages.some(route => pathname.startsWith(route))) {
        if (!session?.user) {
            console.log('middleware: Redirecting to sign-in (DEFAULT_SIGN_IN)');
            return NextResponse.redirect(new URL(DEFAULT_SIGN_IN, request.url));
        }
    }

    const response = NextResponse.next();
    if (session?.user?.id) {
        response.headers.set('x-user-id', session.user.id);
    }
    return response;
});

// Apply middleware only to specific routes
export const config = {
    matcher: [
        '/((?!_next/static|favicon.ico).*)',
    ],
};
