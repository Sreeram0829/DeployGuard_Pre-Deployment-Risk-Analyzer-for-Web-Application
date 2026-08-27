import {z} from "zod";
export const registerSchema=z.object({name:z.string().trim().min(2).max(80),email:z.string().trim().email(),password:z.string().min(8).max(128)});
export const projectSchema=z.object({name:z.string().trim().min(2).max(80),description:z.string().trim().max(500).optional().default("")});
