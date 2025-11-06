/*action.ts */
/*Not used for now as it's the backend job*/

// "use server";

// import { z } from "zod";
// import { createSession } from "../_lib/session";
// import { redirect } from "next/navigation";

// const testUser = {
//     id: '1',
//     email: "testing@site.com",
//     password: "12345678"
// };

// const loginSchema = z.object({
//     email: z.email({ message: "Invalid email address" }).trim(),
//     password: z
//         .string()
//         .min(8, {message: "Your password it too small!"})
//         .trim(),
// });

// export async function login(prevState: any, formData: FormData) {
//     const result = loginSchema.safeParse(Object.fromEntries(formData));

//     if (!result.success) {
//         return { errors: result.error.flatten().fieldErrors };
//     }

//     const {email, password} = result.data;

//     if (email !== testUser.email || password !== testUser.password) {
//         return {
//             errors: {
//                 email: ["Invalid email or password"],
//             }
//         }
//     }

//     await createSession(testUser.id);

//     redirect("/Profile");
// }

// export async function logout() {}