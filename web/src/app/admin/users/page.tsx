import UserTable from "./components/UserTable";

export default async function AdminUserPage() {
  return (
    <div className="container is-max-desktop">
      <h1 className="title">Todos los usuarios</h1>
      {/* <Link href="users/new" className="button is-primary">Nuevo usuario</Link> */}
      <UserTable />
    </div>
  );
}
