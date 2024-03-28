"use server";
import { signOut } from "@/auth/auth";

export async function Signout() {
  await signOut();
}
