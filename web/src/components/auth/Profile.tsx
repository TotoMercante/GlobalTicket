"use client";

import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

export default function Profile() {
  const { user, isLoading } = useUser();

  return (
    <div>
      {isLoading ? (
        <div>Loading user profile...</div>
      ) : !user ? null : (
        <>
          {user.picture && (
            <Image
              src={user.picture}
              alt={user.name || "User profile picture"}
              width={100}
              height={100}
            />
          )}
          <h2 className="content is-medium">{user.name}</h2>
          <p className="content">{user.email}</p>
        </>
      )}
    </div>
  );
}
