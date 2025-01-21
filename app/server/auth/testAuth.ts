"use server"
import { setTimeout } from "timers/promises";
import {z}  from "zod"







interface FormData {
  email: string;
  password: string;
}

export async function login(formData:FormData) {
    await setTimeout(2000);
    return { success : true , message: "user created successfully" };
}


export async function signup(formData:FormData) {
  await setTimeout(2000);
  return { success : true , message: "user created successfully" };
}
