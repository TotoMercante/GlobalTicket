import { getProfileApi } from "@/api";
import { auth0 } from "@/auth0";
import Image from "next/image";

export default auth0.withPageAuthRequired(async function PerfilPage() {
  const user = {
    ...(await auth0.getSession())!.user,
    ...(await getProfileApi().profileControllerGetProfile()),
  };

  return (
    <div className="container is-max-desktop">
      <h1 className="title">Perfil</h1>
      <div className="block">
        <figure className="image is-96x96">
          <Image
            className="is-rounded"
            src={user.picture ?? ""}
            alt="Foto de perfil"
            width={0}
            height={0}
          />
        </figure>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Nombre:</strong> {user.firstName}
        </p>
        <p>
          <strong>Apellido:</strong> {user.lastName}
        </p>
        <p>
          <strong>Fecha de nacimiento:</strong>{" "}
          {user.birthdate.toLocaleDateString()}
        </p>
        <p>
          <strong>DNI:</strong> {user.dni}
        </p>
        <p>
          <strong>Nro de teléfono:</strong> {user.phoneNumber || "Sin teléfono"}
        </p>
      </div>
    </div>
  );
});
