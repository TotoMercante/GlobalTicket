import { auth0 } from "@/auth0";
import SolicitudForm from "./SolicitudForm";
import { getProfileApi } from "@/api";

export default auth0.withPageAuthRequired(
  async function SolicitudPage() {
    const user = await getProfileApi().profileControllerGetProfile();

    return (
      <section className="section">
        <div className="container is-max-desktop">
          <div className="box">
            <h1 className="title is-4">Solicitud de permiso Manager</h1>
            <p className="subtitle is-6">
              Completa los datos para solicitar permisos de Manager.
            </p>
            <SolicitudForm user={user} />
          </div>
        </div>
      </section>
    );
  },
  { returnTo: "/solicitud-manager" },
);
