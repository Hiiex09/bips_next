import { signup } from "@/features/auth/service";
import { generateToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
// make sure lib/prisma.ts is correct

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, mobile, password, address } = body;

        if (!firstName || !lastName || !email || !mobile || !password || !address) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        const newUser = await signup(body);

        const { access_token, refresh_token } = await generateToken(newUser.id);

        const res = NextResponse.json({ message: "User created successfully", newUser }, { status: 201 });
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
