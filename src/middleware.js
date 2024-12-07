import { NextResponse } from 'next/server';
import { auth } from './auth';
import { DEFAULT_SIGN_IN, secureApiRoutes, securePages } from "./lib/route";

export const middleware = auth((request) => {
    const session = request.auth;
    const pathname = request.nextUrl.pathname;
    console.log('middleware: ', pathname);

    // authentication for secure api routes and pages
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

    // authorization for secure api routes
    if(pathname.startsWith('/api/customer')) {
        if(session?.user?.role !== 'customer') {
            console.log('middleware: secure api route /api/customer not accessable with out valid permission')
            return NextResponse.json(
                { error: 'You are not authorized to access this route' },
                { status: 401 }
            );
        }
    } else if(pathname.startsWith('/api/seller')) {
        if(session?.user?.role !== 'seller') {
            console.log('middleware: secure api route /api/seller not accessable with out valid permission')
            return NextResponse.json(
                { error: 'You are not authorized to access this route' },
                { status: 401 }
            );
        }
    } else if(pathname.startsWith('/api/admin')) {
        if(session?.user?.role !== 'admin') {
            console.log('middleware: secure api route /api/admin not accessable with out valid permission')
            return NextResponse.json(
                { error: 'You are not authorized to access this route' },
                { status: 401 }
            );
        }
    } else if(pathname.startsWith('/api/superAdmin')) {
        if(session?.user?.role !== 'superadmin') {
            console.log('middleware: secure api route /api/superadmin not accessable with out valid permission')
            return NextResponse.json(
                { error: 'You are not authorized to access this route' },
                { status: 401 }
            );
        }
    }

    const response = NextResponse.next();

    // set userId to header 
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
