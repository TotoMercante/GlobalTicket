import { getProfileApi } from "@/api";
import { auth0 } from "@/auth0";
import Image from "next/image";
import Link from "next/link";

export default auth0.withPageAuthRequired(async function PerfilPage() {
  const user = {
    ...(await auth0.getSession())!.user,
    ...(await getProfileApi().profileControllerGetProfile()),
  };

  return (
    <div className="container is-max-desktop">
      <div className="block">
        <div className="columns">
          <div className="column">
            <h1 className="title is-1">Perfil</h1>
            <figure className="image block is-96x96">
              <Image src={user.picture ?? ""} alt="Foto de perfil" fill />
            </figure>
            <div className="block">
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
                <strong>Nro de teléfono:</strong>{" "}
                {user.phoneNumber || "Sin teléfono"}
              </p>
            </div>
            <div className="block">
              <Link href="/perfil/editar" className="button is-primary">
                Editar perfil
              </Link>
            </div>
          </div>
          <div className="column">
            <p className="title is-3">Mis entradas</p>
            {!user.eventTickets.length ? (
              <div className="notification">Aún no tienes ninguna entrada.</div>
            ) : (
              <table className="table is-striped is-hoverable is-fullwidth">
                <tbody>
                  {user.eventTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.event.name}</td>
                      <td>{ticket.date.toLocaleString()}</td>
                      <td>
                        <Link
                          href={`/entradas/${ticket.id}`}
                          className="button is-size-7"
                        >
                          <span className="icon">
                            <i className="fas fa-eye"></i>
                          </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
