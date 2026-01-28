"use client";

import { getManagerRequestApi, type ManagerRequestDto } from "@/api";
import { useEffect, useState } from "react";
import ViewRequestModal from "./ViewRequestModal";

type OpenModalOpts =
  | { modal: "none" }
  | { modal: "view"; solicitud: Promise<ManagerRequestDto> };

export default function RequestsTable() {
  const [requests, setRequests] = useState<ManagerRequestDto[]>([]);
  const [openModal, setOpenModal] = useState<OpenModalOpts>({ modal: "none" });

  function reload() {
    getManagerRequestApi()
      .managerRequestControllerGetAll()
      .then((res) => setRequests(res));
  }

  useEffect(reload, []);

  function closeModal() {
    setOpenModal({ modal: "none" });
  }

  function removeRequest(id: string) {
    setRequests(requests.filter((s) => s.id !== id));
    closeModal();
  }

  return (
    <>
      <div className="block level">
        <h2 className="level-left title is-5">Solicitudes pendientes</h2>
        <button className="button icon-text level-right" onClick={reload}>
          <span className="icon">
            <i className="fas fa-rotate-right"></i>
          </span>
          <span>Actualizar</span>
        </button>
      </div>

      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>CUIT</th>
            <th>Enviada por</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.length == 0 ? (
            <tr>
              <td colSpan={4}>No hay solicitudes pendientes.</td>
            </tr>
          ) : (
            requests.map((s) => (
              <tr
                key={s.id}
                onClick={() =>
                  setOpenModal({
                    modal: "view",
                    solicitud:
                      getManagerRequestApi().managerRequestControllerGetById({
                        id: s.id,
                      }),
                  })
                }
              >
                <td>{s.businessName}</td>
                <td>{s.cuit}</td>
                <td>{s.user.email}</td>
                <td>
                  <button className="icon has-text-primary">
                    <i className="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {openModal.modal === "view" && (
        <ViewRequestModal
          request={openModal.solicitud}
          onClose={closeModal}
          onResolved={(id) => removeRequest(id)}
        />
      )}
    </>
  );
}
