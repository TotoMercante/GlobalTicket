"use client";

import { EventTicketDto } from "@/api";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

interface TicketScannerProps {
  onScan(id: string): Promise<EventTicketDto | null>;
}

type Message =
  | { type: "success"; ticket: EventTicketDto }
  | { type: "warning"; msg: string }
  | { type: "danger"; ticket: EventTicketDto };

export default function TicketScanner(props: TicketScannerProps) {
  const [message, setMessage] = useState<Message>();
  const [loading, setLoading] = useState(false);

  async function handleScan(id: string) {
    setLoading(true);
    if (!id) return;
    const foundTicket = await props.onScan(id);
    if (foundTicket)
      setMessage({
        type: foundTicket.usable ? "success" : "danger",
        ticket: foundTicket,
      });
    else
      setMessage({
        type: "warning",
        msg: "No se ha encontrado ninguna entrada",
      });
    setLoading(false);
  }

  return (
    <>
      <div className="block">
        {loading ? (
          <div className="notification">
            <strong>Cargando entrada...</strong>
          </div>
        ) : !message ? (
          <div className="notification">
            <strong>Aún no has escaneado una entrada.</strong>
          </div>
        ) : message.type == "warning" ? (
          <div className="notification is-warning">
            <strong>{message.msg}</strong>
          </div>
        ) : (
          <div className={`notification is-${message.type}`}>
            <p>
              <strong>ID:</strong> {message.ticket.id}
            </p>
            <p>
              <strong>Evento:</strong> {message.ticket.event.name}
            </p>
            <p>
              <strong>Fecha:</strong> {message.ticket.date.toLocaleString()}
            </p>
            <p>
              <strong>
                Entrada {message.ticket.usable ? "habilitada" : "inhabilitada"}
              </strong>
            </p>
          </div>
        )}
      </div>
      <div className="block">
        <Scanner
          allowMultiple={false}
          paused={loading}
          onScan={(codes) => {
            handleScan(codes[0].rawValue);
          }}
          onError={(err) => setMessage({ type: "warning", msg: String(err) })}
          formats={["qr_code"]}
          styles={{ container: { width: "50%", marginInline: "auto" } }}
        />
      </div>
    </>
  );
}
