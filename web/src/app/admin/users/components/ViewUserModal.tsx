import { UserDto } from "@/api";
import { use } from "react";

type ViewUserModalProps = {
  user: Promise<UserDto>;
  onClose(): void;
  onClickEdit(): void;
  onClickDelete(): void;
};

export default function ViewUserModal(props: ViewUserModalProps) {
  const user = use(props.user);

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onClose} />
      <div className="modal-content box">
        <p className="title is-3">
          {user.firstName} {user.lastName}
        </p>
        <div className="buttons">
          <button
            className="button is-primary is-outlined"
            onClick={props.onClickEdit}
          >
            Editar
          </button>
          <button
            className="button is-danger is-outlined"
            onClick={props.onClickDelete}
          >
            Eliminar
          </button>
        </div>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Nro de documento:</strong> {user.dni}
        </p>
        <p>
          <strong>Teléfono:</strong> {user.phoneNumber}
        </p>
        {user.type == "manager" && (
          <>
            <p>
              <strong>Empresa:</strong> {user.businessName}
            </p>
            <p>
              <strong>CUIT:</strong> {user.cuit}
            </p>
          </>
        )}
      </div>
      <div className="modal-close" onClick={props.onClose} />
    </div>
  );
}
