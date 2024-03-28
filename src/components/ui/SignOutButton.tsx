"use client";
import { Signout } from "@/actions/signOut";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
export function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <form action={Signout}>
      <Button type="submit" variant={"secondary"}>
        {pending ? <Loader /> : "Sign Out"}
      </Button>
    </form>
  );
}
