import { login } from "@/features/auth/service";
import { generateToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Login user (login function should return full user with password)
        const user = await login(body);

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT tokens
        const { access_token, refresh_token } = generateToken(user.id);


        const { password: _, firstName, lastName, role } = user;

        const userForClient = {
            email,
            fullName: `${firstName} ${lastName}`,
            role,
        };

        const res = NextResponse.json({
            message: "User logged in successfully",
            user: userForClient,
        }, { status: 200 });

        // Set cookies
        res.cookies.set("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 15 * 60,
        });

        res.cookies.set("refresh_token", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        return res;

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}