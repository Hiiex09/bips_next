import { auth } from "./auth.middleware";


export function middleware(req: any) {
    return auth(req);
}

export const config = {
    matcher: [
        "/api/:path*",
        "/dashboard/:path*",
        "/announcements/:path*",
        "/requests/:path*",
        "/complaints/:path*",
    ],
};