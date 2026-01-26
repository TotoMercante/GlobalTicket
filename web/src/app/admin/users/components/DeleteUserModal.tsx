import { getUserApi, UserDto } from "@/api";
import { use } from "react";

type DeleteUserModalProps = {
  user: Promise<UserDto>;
  onConfirm(user: UserDto): void;
  onClose(): void;
};

export default function DeleteUserModal(props: DeleteUserModalProps) {
  const user = use(props.user);

  function deleteUser() {
    getUserApi()
      .userControllerDelete({ id: user.id })
      .then(() => props.onConfirm(user));
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onClose} />
      <div className="modal-content box">
        <p className="title is-3">Eliminar usuario</p>
        <p>
          Desea eliminar el usuario &lsquo;{user.email}&rsquo;? Esta acción no
          se puede deshacer.
        </p>
        <button className="button is-danger" onClick={deleteUser}>
          Eliminar
        </button>
        <button className="button" onClick={props.onClose}>
          Cancelar
        </button>
      </div>
      <div className="modal-close" onClick={props.onClose} />
    </div>
  );
}
