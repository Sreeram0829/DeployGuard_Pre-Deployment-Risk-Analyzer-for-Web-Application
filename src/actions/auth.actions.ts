"use server";
import bcrypt from "bcryptjs"; import {prisma} from "@/lib/prisma"; import {registerSchema} from "@/lib/validations";
export async function registerUser(input:unknown){const data=registerSchema.parse(input);const email=data.email.toLowerCase();if(await prisma.user.findUnique({where:{email}}))throw new Error("An account with that email already exists.");const passwordHash=await bcrypt.hash(data.password,12);return prisma.user.create({data:{name:data.name,email,passwordHash},select:{id:true,name:true,email:true}});}
