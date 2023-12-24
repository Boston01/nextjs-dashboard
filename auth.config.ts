import type { NextAuthConfig } from 'next-auth';
import { satisfies } from 'semver';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl }}) {
            const isLoggedIn= !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // redirect to unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true
        },
    },
    providers: [],
} satisfies NextAuthConfig;