import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin?returnTo=/dashboard/perfil");
  }

  return (
    <div>
      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <h3 className="text-3xl mb-10">{session.user.roles}</h3>
    </div>
  );
}
