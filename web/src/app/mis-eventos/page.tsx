import { getProfileApi } from "@/api";
import { auth0 } from "@/auth0";
import Link from "next/link";
import { redirect } from "next/navigation";

export default auth0.withPageAuthRequired(
  async function MyEventsPage() {
    const profile = await getProfileApi().profileControllerGetProfile();

    if (profile.type !== "manager") {
      redirect("/solicitud-manager");
    }

    const events = await getProfileApi().profileControllerGetMyEvents();

    return (
      <div className="container is-max-desktop">
        <div className="block level">
          <h1 className="level-left title">Mis eventos</h1>
          <div className="level-right">
            <Link className="button is-primary" href="/mis-eventos/publicar">
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              <span>Publicar evento</span>
            </Link>
          </div>
        </div>

        <div className="block">
          <p>
            <strong>
              {profile.firstName} {profile.lastName}
            </strong>
          </p>
          <p>{profile.email}</p>
        </div>

        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={3}>No hay eventos para mostrar.</td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.location}</td>
                  <td>
                    <Link className="button is-small" href={`/${event.id}`}>
                      <span className="icon">
                        <i className="fas fa-eye"></i>
                      </span>
                    </Link>
                    <Link
                      className="button is-small ml-2"
                      href={`/${event.id}/editar`}
                    >
                      <span className="icon">
                        <i className="fas fa-pen"></i>
                      </span>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  },
  { returnTo: "/mis-eventos" },
);
