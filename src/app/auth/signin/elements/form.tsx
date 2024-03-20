"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormStatus, useFormState } from "react-dom";
import { LoginUser } from "./actions";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function SignInForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const initState = {
    message: "",
    success: false,
  };
  const [state, formAction] = useFormState(LoginUser, undefined);
  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session?.user, router]);
  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <h1 className="text-2xl font-bold text-center">Sign In</h1>
      <Input name="identifier" type="text" placeholder="username or email" />
      <Input name="password" type="password" placeholder="Password" />

      <SignInButton />
      <p className="font-light text-center text-red-400"> *{state}</p>
    </form>
  );
}

function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className={pending ? "bg-slate-950" : ""}
    >
      {pending ? <Loader /> : "Sign In"}
    </Button>
  );
}
