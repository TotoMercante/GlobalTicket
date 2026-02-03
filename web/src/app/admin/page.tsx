import { getProfileApi } from "@/api";
import { auth0 } from "@/auth0";
import Link from "next/link";
import { redirect } from "next/navigation";

export default auth0.withPageAuthRequired(
  async function AdminPage() {
    const profile = await getProfileApi().profileControllerGetProfile();

    if (profile.type !== "admin") {
      redirect("/");
    }

    return (
      <div className="container is-max-desktop">
        <section className="hero is-halfheight">
          <div className="hero-body">
            <div>
              <h1 className="title">Portal administrativo</h1>
              <p className="subtitle">
                Gestión de usuarios y permisos de manager
              </p>
              <div className="buttons">
                <Link className="button is-primary" href="/admin/users">
                  Gestión de usuarios
                </Link>
                <Link
                  className="button is-primary"
                  href="/admin/solicitudes-manager"
                >
                  Solicitudes de manager
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  },
  { returnTo: "/admin" },
);
