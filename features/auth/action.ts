import { login, signup } from "./service";
import {
    signupSchema,
    loginSchema,
    SignupFormData,
    LoginFormData,
} from "./validation";


// SIGNUP ACTION
export const signupAction = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    const parsedData: SignupFormData = signupSchema.parse(data);

    const newUser = await signup(parsedData);

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


// LOGIN ACTION
export const loginAction = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    const parsedData: LoginFormData = loginSchema.parse(data);

    const user = await login(parsedData);

    return {
        email: user.email,
        role: user.role,
    };
};