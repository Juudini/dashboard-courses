// import { auth } from "@/auth.config";
// import { redirect } from "next/navigation";
import Homepage from "@/components/dashboard/Homepage";
import AuthProvider from "@/components/dashboard/provider/AuthProvider";
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default async function DashboardPage() {
  //PARA QUE NO HAYA AUTH ELIMINAR DESDE ACA
  // const session = await auth();
  // if (!session?.user) {
  //   redirect("/auth/signin?returnTo=/dashboard");
  // }
  //HASTA ACÁ
  return (
    <AuthProvider>
      <DefaultLayout>
        <Homepage />
      </DefaultLayout>
    </AuthProvider>
  );
}
