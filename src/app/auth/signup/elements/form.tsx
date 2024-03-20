"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormStatus, useFormState } from "react-dom";
import { createUser } from "./actions";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function SignupForm() {
  const router = useRouter();
  const initState = {
    message: "",
    success: false,
  };
  const [state, formAction] = useFormState(createUser, initState);
  useEffect(() => {
    if (state.success) {
      router.push("/auth/signin");
    }
  }, [state.message, router]);
  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <Input name="username" type="text" placeholder="Name" />
      <Input name="email" type="text" placeholder="Email" />
      <Input name="password" type="password" placeholder="Password" />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <SignUpButton />
      <p className="font-light text-center text-red-400"> *{state.message}</p>
    </form>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className={pending ? "bg-slate-950" : ""}
    >
      {pending ? <Loader /> : "Sign Up"}
    </Button>
  );
}
