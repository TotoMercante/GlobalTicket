import { getUserApi, StandardUserDto } from "@/api";

type DeleteUserModalProps = {user: StandardUserDto; onConfirm(user: StandardUserDto): void; onClose(): void}

export default function DeleteUserModal(props: DeleteUserModalProps) {
  function deleteUser() {
    getUserApi().userControllerDelete({
      id: props.user.id
    }).then(() => props.onConfirm(props.user))
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onClose} />
      <div className="modal-content box">
        <p className="title is-3">Eliminar usuario</p>
        <p>Desea eliminar el usuario '{props.user.email}'? Esta acción no se puede deshacer.</p>
        <button className="button is-danger" onClick={deleteUser}>Eliminar</button>
        <button className="button" onClick={props.onClose}>Cancelar</button>
      </div>
      <div className="modal-close" onClick={props.onClose} />
    </div>
  )
};
