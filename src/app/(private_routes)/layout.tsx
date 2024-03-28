import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";
import SideMenu from "@/components/ui/side-menu";
export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div className="w-full flex flex-row justify-center h-screen items-center">
      <div className="w-10/12 grid grid-cols-5  h-4/5">
        <SideMenu />
        <div className="col-span-4 bg-gray-600">{children}</div>
      </div>
    </div>
  );
}
