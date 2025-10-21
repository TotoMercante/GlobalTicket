"use client";

import { getUserApi, type UserResponseDto } from "@/api";
import { useEffect, useState } from "react";
import EditUserModal from "./EditUserModal";
import NewUserModal from "./NewUserModal";
import DeleteUserModal from "./DeleteUserModal";

type OpenModalOpts =
  | { modal: "new" }
  | { modal: "edit"; user: UserResponseDto }
  | { modal: "delete"; user: UserResponseDto }
  | { modal: "none" };

export default function UserTable() {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
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

  function addUser(newUser: UserResponseDto) {
    setUsers([...users, newUser]);
    closeModal();
  }

  function updateUser(user: UserResponseDto) {
    setUsers(users.map((u) => (u.id == user.id ? user : u)));
    closeModal();
  }

  function removeUser(user: UserResponseDto) {
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
            <th>Nro de documento</th>
            <th>Teléfono</th>
            <th>Fecha de nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length == 0 ? (
            <tr>
              <td colSpan={7}>
                No hay ningún usuario para mostrar. Prueba crear uno.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.dni}</td>
                <td>{u.phoneNumber}</td>
                <td>{u.birthdate.toLocaleDateString()}</td>
                <td>
                  <button
                    className="icon has-text-primary"
                    onClick={() => {
                      setOpenModal({ modal: "edit", user: u });
                    }}
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button
                    className="icon has-text-danger"
                    onClick={() => setOpenModal({ modal: "delete", user: u })}
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
