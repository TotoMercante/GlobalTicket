import { getProfileApi, UpdateProfileDto } from "@/api";
import { auth0 } from "@/auth0";
import UpdateProfileForm from "./UpdateProfileForm";
import { redirect } from "next/navigation";

export default auth0.withPageAuthRequired(async function EditProfilePage() {
  const profile = await getProfileApi().profileControllerGetProfile();

  async function saveChanges(data: UpdateProfileDto) {
    "use server";
    await getProfileApi().profileControllerUpdateProfile({
      updateProfileDto: data,
    });
    redirect("/perfil");
  }

  return (
    <div className="container is-max-desktop">
      <h1 className="title">Editar perfil</h1>
      <UpdateProfileForm profile={profile} onSave={saveChanges} />
    </div>
  );
});
