import Breadcrumb from "@/components/dashboard/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProfileComponent from "@/components/dashboard/perfil/Perfil";
import { auth } from "@/auth.config";

export const metadata: Metadata = {
  title: "Perfil | Dashboard",
  description: "This is Profile page for dashboard",
};

const Profile = async () => {
  const session = await auth();
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Perfil" />
        <ProfileComponent session={session} />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
