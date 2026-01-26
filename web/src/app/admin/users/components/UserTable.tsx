"use client";

import { getUserApi, UserDto, type UserShortDto } from "@/api";
import { useEffect, useState } from "react";
import EditUserModal from "./EditUserModal";
import NewUserModal from "./NewUserModal";
import DeleteUserModal from "./DeleteUserModal";
import ViewUserModal from "./ViewUserModal";

type OpenModalOpts =
  | { modal: "new" }
  | { modal: "view"; user: Promise<UserDto> }
  | { modal: "edit"; user: Promise<UserDto> }
  | { modal: "delete"; user: Promise<UserDto> }
  | { modal: "none" };

export default function UserTable() {
  const [users, setUsers] = useState<UserShortDto[]>([]);
  const [openModal, setOpenModal] = useState<OpenModalOpts>({ modal: "none" });

  function reloadUsers() {
    getUserApi()
      .userControllerGetAll()
      .then((res) => setUsers(res));
  }
  useEffect(reloadUsers, []);

  function closeModal() {
    setOpenModal({ modal: "none" });
  }

  function fetchUser(userId: string) {
    return getUserApi().userControllerGetById({ id: userId });
  }

  function addUser(newUser: UserShortDto) {
    setUsers([...users, newUser]);
    closeModal();
  }

  function updateUser(user: UserShortDto) {
    setUsers(users.map((u) => (u.id == user.id ? user : u)));
    closeModal();
  }

  function removeUser(user: UserShortDto) {
    setUsers(users.filter((u) => u.id !== user.id));
    closeModal();
  }

  return (
    <>
      <div className="block level">
        <button
          className="button is-primary level-left"
          onClick={() => setOpenModal({ modal: "new" })}
        >
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Nuevo usuario</span>
        </button>
        <button className="button icon-text level-right" onClick={reloadUsers}>
          <span className="icon">
            <i className="fas fa-rotate-right"></i>
          </span>
          <span>Actualizar</span>
        </button>
      </div>

      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Email</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length == 0 ? (
            <tr>
              <td colSpan={5}>
                No hay ningún usuario para mostrar. Prueba crear uno.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr
                key={u.id}
                onClick={() =>
                  setOpenModal({ modal: "view", user: fetchUser(u.id) })
                }
              >
                <td>{u.email}</td>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.phoneNumber || "Sin teléfono"}</td>
                <td>
                  <button
                    className="icon has-text-primary"
                    onClick={(e) => {
                      setOpenModal({ modal: "edit", user: fetchUser(u.id) });
                      e.stopPropagation();
                    }}
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button
                    className="icon has-text-danger"
                    onClick={(e) => {
                      setOpenModal({ modal: "delete", user: fetchUser(u.id) });
                      e.stopPropagation();
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <NewUserModal
        active={openModal.modal == "new"}
        onSave={addUser}
        onClose={closeModal}
      />
      {openModal.modal == "view" && (
        <ViewUserModal
          user={openModal.user}
          onClose={closeModal}
          onClickEdit={() => setOpenModal({ ...openModal, modal: "edit" })}
          onClickDelete={() => setOpenModal({ ...openModal, modal: "delete" })}
        />
      )}
      {openModal.modal == "edit" && (
        <EditUserModal
          user={openModal.user}
          onSave={updateUser}
          onClose={closeModal}
        />
      )}
      {openModal.modal == "delete" && (
        <DeleteUserModal
          user={openModal.user}
          onConfirm={removeUser}
          onClose={closeModal}
        />
      )}
    </>
  );
}
