import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Enforce RBAC: Only "admin" role can access /admin routes
        if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(new URL("/login?error=UnauthorizedAccess", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // Require authentication
        },
    }
);

export const config = {
    matcher: ["/admin/:path*"]
};
