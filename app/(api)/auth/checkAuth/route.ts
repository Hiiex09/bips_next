import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verifyAuth } from "@/lib/serverAuth";

const JWT_SECRET_ACCESS_TOKEN = process.env.NEXT_JWT_SECRET_ACCESS_TOKEN as string;

export async function GET(req: NextRequest) {
    try {
        let decoded: any;
        try {
            decoded = await verifyAuth();
        } catch (authError: any) {
            return NextResponse.json(
                { message: authError.message, authenticated: false },
                { status: 401 }
            );
        }

        // Find user in database
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found", authenticated: false },
                { status: 404 }
            );
        }

        // Determine redirect URL based on role
        let redirectUrl = "/";
        if (user.role === "ADMIN" || user.role === "STAFF") {
            redirectUrl = "/dashboard";
        } else if (user.role === "RESIDENT") {
            redirectUrl = "/residentDashboard";
        }

        return NextResponse.json({
            authenticated: true,
            user: {
                id: user.id,
                email: user.email,
                fullName: `${user.firstName} ${user.lastName}`,
                role: user.role,
            },
            redirectUrl,
        });

    } catch (error: any) {
        console.error("Error in checkAuth:", error.message);

        if (error.name === "TokenExpiredError") {
            return NextResponse.json(
                { message: "Token expired", authenticated: false },
                { status: 401 }
            );
        }

        if (error.name === "JsonWebTokenError") {
            return NextResponse.json(
                { message: "Invalid token", authenticated: false },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: "Internal server error", authenticated: false },
            { status: 500 }
        );
    }
}