import { auth0 } from "@/auth0";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import Link from "next/link";
import "./globals.css";
import { getProfileApi, UserDto } from "@/api";
import UserDropdown from "@/components/users/UserDropdown";
import { User } from "@auth0/nextjs-auth0/types";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth0.getSession();
  let profile: (UserDto & User) | undefined;

  if (session) {
    await getProfileApi()
      .profileControllerGetProfile()
      .then((user) => {
        profile = { ...user, ...session.user };
      })
      .catch(() => {});
  }

  return (
    <html lang="en">
      <body>
        <Auth0Provider>
          <div className="block has-background-primary-dark p-4">
            <div className="is-flex is-flex-direction-row is-align-items-center">
              <Link
                href="/"
                className="is-size-3 has-text-weight-bold has-text-light"
              >
                GlobalTicket
              </Link>
              <div className="is-flex-grow-1"></div>
              <UserDropdown user={profile} />
            </div>
          </div>
          {children}
        </Auth0Provider>
      </body>
    </html>
  );
}
