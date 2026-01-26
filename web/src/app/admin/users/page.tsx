import { auth0 } from "@/auth0";
import UserTable from "./components/UserTable";

export default auth0.withPageAuthRequired(
  async function AdminUserPage() {
    // TODO Implementar control de acceso para usuarios Admin

    return (
      <div className="container is-max-desktop">
        <h1 className="title">Todos los usuarios</h1>
        <UserTable />
      </div>
    );
  },
  { returnTo: "/admin/users" },
);
