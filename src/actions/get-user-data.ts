"use server";
import { auth } from "@/auth.config";

export const userData = async () => {
  const session = await auth();
  const userData = {
    email: session?.user?.email,
    image: session?.user?.image,
    name: session?.user?.name,
  };
  return userData;
};
