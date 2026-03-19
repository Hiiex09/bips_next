import { login, signup } from "./service";
import { SignupFormData, signupSchema } from "./validation";

export const signupAction = async (formData: FormData) => {
    // Convert FormData to object
    const data = Object.fromEntries(formData.entries());

    // Validate input with Zod
    const parsedData: SignupFormData = signupSchema.parse(data);

    // Call service
    const newUser = await signup(parsedData);

    // Return only the data you want the UI to receive
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


export const loginAction = async (formData: FormData) => {
    // Convert FormData to object
    const data = Object.fromEntries(formData.entries());

    // Validate input with Zod
    const parsedData: SignupFormData = signupSchema.parse(data);

    // Call service
    const newUser = await login(parsedData);

    // Return only the data you want the UI to receive
    return {
        email: newUser.email,
        role: newUser.role,
    };
}