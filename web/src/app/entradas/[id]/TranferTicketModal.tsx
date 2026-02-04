"use client";

import { useState } from "react";

interface TransferTicketModalProps {
  onTransfer(newEmail: string): Promise<void>;
}

export default function TranferTicketModal(props: TransferTicketModalProps) {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function transferTicket() {
    setLoading(true);
    await props.onTransfer(email);
    setLoading(false);
    setActive(false);
  }

  return (
    <>
      <div className="block">
        <button className="button is-primary" onClick={() => setActive(true)}>
          Tranferir entrada
        </button>
      </div>
      <div className={`modal ${active && "is-active"}`}>
        <div
          className="modal-background"
          onClick={() => setActive(false)}
        ></div>
        <div className="modal-content box">
          <p className="title">Transferir entrada</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              transferTicket();
            }}
          >
            <div className="field">
              <label htmlFor="to-email" className="label">
                Email de usuario
              </label>
              <input
                required
                type="email"
                name="to-email"
                id="to-email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field is-grouped">
              <button
                className="button is-primary"
                disabled={loading}
                type="submit"
              >
                {loading ? "Cargando..." : "Transferir"}
              </button>
              <button className="button" onClick={() => setActive(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
        <div className="modal-close" onClick={() => setActive(false)}></div>
      </div>
    </>
  );
}
