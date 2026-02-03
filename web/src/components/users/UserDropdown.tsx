"use client";

import type { UserDto } from "@/api";
import type { User } from "@auth0/nextjs-auth0/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface UserDropdownProps {
  user?: UserDto & User;
}

export default function UserDropdown(props: UserDropdownProps) {
  const { user } = props;
  const [active, setActive] = useState(false);

  return (
    <>
      <div className={`dropdown is-right ${active && "is-active"}`}>
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => setActive((active) => !active)}
          >
            {user && user.picture ? (
              <span className="image is-squared is-32x32">
                <Image
                  src={user.picture}
                  alt="User picture"
                  fill
                  // className="is-rounded"
                />
              </span>
            ) : (
              <span className="icon" style={{ width: 32, height: 32 }}>
                <i className="fas fa-user" style={{ fontSize: 24 }}></i>
              </span>
            )}
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <strong className="is-size-5">
                {user ? `${user.firstName} ${user.lastName}` : "Invitado"}
              </strong>
            </div>
            {user && (
              <>
                <Link
                  href="/perfil"
                  className="dropdown-item"
                  onClick={() => setActive(false)}
                >
                  Ver perfil
                </Link>
                <Link
                  href="/mis-eventos"
                  className="dropdown-item"
                  onClick={() => setActive(false)}
                >
                  {" "}
                  Publicar eventos{" "}
                </Link>
                <hr className="dropdown-divider" />
              </>
            )}
            <div className="dropdown-item" onClick={() => setActive(false)}>
              {!user ? (
                // eslint-disable-next-line @next/next/no-html-link-for-pages
                <a href="/auth/login" className="has-text-primary">
                  Iniciar sesión{" "}
                  <span className="figure is-small">
                    <i className="fas fa-arrow-right-to-bracket"></i>
                  </span>
                </a>
              ) : (
                // eslint-disable-next-line @next/next/no-html-link-for-pages
                <a href="/auth/logout" className="has-text-danger">
                  Cerrar sesión{" "}
                  <span className="figure is-small">
                    <i className="fas fa-arrow-right-from-bracket"></i>
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
