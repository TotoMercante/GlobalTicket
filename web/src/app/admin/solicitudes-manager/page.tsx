import { auth0 } from "@/auth0";
import RequestsTable from "./components/RequestsTable";

export default auth0.withPageAuthRequired(
  async function AdminRequestsPage() {
    return (
      <div className="container is-max-desktop">
        <h1 className="title">Solicitudes de Manager</h1>
        <RequestsTable />
      </div>
    );
  },
  { returnTo: "/admin/solicitudes-manager" },
);
