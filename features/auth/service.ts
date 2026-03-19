
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/db";

interface SignupFormData {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    mobile: string;
    password: string;
    role?: string;
    idUpload?: string;
}

export const signup = async (formData: SignupFormData) => {
    const { firstName, lastName, address, email, mobile, password, role, idUpload } = formData;

    // Validate required fields
    if (!firstName || !lastName || !address || !email || !mobile || !password) {
        throw new Error(
            "All fields are required (firstName, lastName, address, email, mobile, password)"
        );
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }


    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) throw new Error("Email already exists");

    const existingMobile = await prisma.user.findUnique({ where: { mobile } });
    if (existingMobile) throw new Error("Mobile number already exists");


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await prisma.user.create({
        data: {
            firstName,
            lastName,
            address,
            email,
            mobile,
            password: hashPassword,
            role: (role?.toUpperCase() as Role) || Role.RESIDENT, // match Prisma enum
            idUpload: idUpload || null,
        },
    });




    return {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        address: newUser.address,
        email: newUser.email,
        mobile: newUser.mobile,
        role: newUser.role,
        status: newUser.status,
    };
};

export const login = async (formData: SignupFormData) => {
    const { email, password } = formData;

    // Validate required fields
    if (!email || !password) {
        throw new Error("All fields are required (email, password)");
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    return user;
};
