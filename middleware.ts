import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        // Si no hay token, redirige al login
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Especifica las rutas protegidas
export const config = {
    matcher: ['/topics', '/join-us'], // Aquí puedes poner más rutas protegidas si quieres
};
