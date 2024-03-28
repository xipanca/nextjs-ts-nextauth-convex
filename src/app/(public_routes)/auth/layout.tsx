import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) redirect("/home");

  return (
    <div className="w-full flex justify-center items-start pt-24">
      {children}
    </div>
  );
}
