import { auth0 } from "@/auth0";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import Profile from "@/components/auth/Profile";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="container is-max-desktop mt-4">
      <h1 className="title">Prueba de Auth0</h1>
      <div className="box">
        {user ? (
          <>
            <p>Successfully logged in!</p>
            <Profile />
            <LogoutButton />
          </>
        ) : (
          <>
            <p>Welcome! Please log in to access your protected content.</p>
            <LoginButton />
          </>
        )}
      </div>
    </div>
  );
}
