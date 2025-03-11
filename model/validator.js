import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({required_error: "name is required"}).trim().min(3, {message: "name is atleast 3 charector"}).max(200, {message: "name is atmost 200 charector"}),
    email: z.string().trim().email().refine(email => email.endsWith("@gmail.com"), {message: "only except gmail"}),
    password: z.string().trim().regex(/[a-z]/, {message: "password include at least one lower case"}).regex(/[A-Z]/, {message: "include at least one upper case"}).regex(/[0-9]/, {message: "include at least one number"}).regex(/[\W_]/, {message: "include at least one special charector"})
});