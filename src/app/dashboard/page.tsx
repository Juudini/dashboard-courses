import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  //PARA QUE NO HAYA AUTH ELIMINAR DESDE ACA
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin?returnTo=/dashboard");
  }
  //HASTA ACÁ
  return (
    <div>
      <h1>Hellou Dashboard</h1>
    </div>
  );
}
