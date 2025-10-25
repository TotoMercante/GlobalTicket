import { UserResponseDto } from "@/api";

type ViewUserModalProps = {
  user: UserResponseDto;
  onClose(): void;
  onClickEdit(): void;
  onClickDelete(): void;
};

export default function ViewUserModal(props: ViewUserModalProps) {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onClose} />
      <div className="modal-content box">
        <p className="title is-3">
          {props.user.firstName} {props.user.lastName}
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
          <strong>Email:</strong> {props.user.email}
        </p>
        <p>
          <strong>Nro de documento:</strong> {props.user.dni}
        </p>
        <p>
          <strong>Teléfono:</strong> {props.user.phoneNumber}
        </p>
        {props.user.t == "ManagerUser" && (
          <>
            <p>
              <strong>Empresa:</strong> {props.user.bussinessName}
            </p>
            <p>
              <strong>CUIT:</strong> {props.user.cuit}
            </p>
          </>
        )}
      </div>
      <div className="modal-close" onClick={props.onClose} />
    </div>
  );
}
