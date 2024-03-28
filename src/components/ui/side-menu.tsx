import Link from "next/link";
import { auth } from "@/auth/auth";
import { Signout } from "@/actions/signOut";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "./SignOutButton";

export default async function SideMenu() {
  const session = await auth();

  return (
    <div className="col-span-1 bg-red-600">
      <div className="flex h-full justify-between flex-col p-4">
        <div className="flex flex-col">
          <Link href="/resume">resume</Link>
          <Link href="/resume">resume</Link>
          <Link href="/resume">resume</Link>
        </div>
        <div>{session?.user.username}
        
        <SignOutButton/></div>
      </div>
    </div>
  );
}

