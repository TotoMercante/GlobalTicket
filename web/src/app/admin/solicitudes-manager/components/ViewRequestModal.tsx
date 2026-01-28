import { use } from "react";
import { getManagerRequestApi, type ManagerRequestDto } from "@/api";

type ViewRequestModalProps = {
  request: Promise<ManagerRequestDto>;
  onClose(): void;
  onResolved(id: string): void;
};

export default function ViewRequestModal(props: ViewRequestModalProps) {
  const request = use(props.request);

  async function accept() {
    getManagerRequestApi()
      .managerRequestControllerAccept({ id: request.id })
      .then(() => props.onResolved(request.id))
      .catch(console.error);
  }

  async function reject() {
    getManagerRequestApi()
      .managerRequestControllerReject({ id: request.id })
      .then(() => props.onResolved(request.id))
      .catch(console.error);
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onClose} />
      <div className="modal-content box">
        <p className="title is-4">Solicitud de {request.businessName}</p>

        <div className="buttons">
          <button className="button is-success" onClick={accept}>
            Aceptar
          </button>
          <button className="button is-danger" onClick={reject}>
            Rechazar
          </button>
        </div>

        <hr />

        <p>
          <strong>Empresa:</strong> {request.businessName}
        </p>
        <p>
          <strong>CUIT:</strong> {request.cuit}
        </p>

        <hr />

        <p className="title is-6">Datos del usuario</p>
        <p>
          <strong>Email:</strong> {request.user.email}
        </p>
        <p>
          <strong>Nombre:</strong>{" "}
          {`${request.user.firstName} ${request.user.lastName}`}
        </p>
        <p>
          <strong>Teléfono:</strong>{" "}
          {request.user.phoneNumber ?? "Sin teléfono"}
        </p>
      </div>
      <div className="modal-close" onClick={props.onClose} />
    </div>
  );
}
