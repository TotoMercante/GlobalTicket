"use client";

import { useUser, getAccessToken } from "@auth0/nextjs-auth0";

export default function Profile() {
  const { user, isLoading } = useUser();

  return (
    <div>
      {isLoading ? (
        <div>Loading user profile...</div>
      ) : !user ? null : (
        <>
          {user.picture && (
            <img src={user.picture} alt={user.name || "User profile"} />
          )}
          <h2 className="content is-medium">{user.name}</h2>
          <p className="content">{user.email}</p>
        </>
      )}
    </div>
  );
}
