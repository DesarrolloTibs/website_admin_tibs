import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;
    if (pathname.startsWith('/topics') || pathname.startsWith('/join-us')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
    if (pathname === '/' && token) {
        return NextResponse.redirect(new URL('/topics', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/topics', '/join-us'],
};
