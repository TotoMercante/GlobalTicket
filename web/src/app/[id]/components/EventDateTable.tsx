"use client";

import { EventDto } from "@/api";
import { useRouter } from "next/navigation";

interface EventDateTableProps {
  event: EventDto;
}

export default function EventDateTable(props: EventDateTableProps) {
  const { event } = props;
  const router = useRouter();

  return (
    <div className="mt-4">
      <h2 className="subtitle">Fechas</h2>
      <div className="content">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Fecha y hora</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {event.dates.map(({ datetime, sold }, idx) => {
              const soldOut = sold > event.capacity;
              return (
                <tr key={idx}>
                  <td style={{ verticalAlign: "middle" }}>
                    <strong>{datetime.toLocaleString()}</strong>
                  </td>
                  <td>
                    <button
                      className="button is-primary"
                      onClick={() =>
                        router.push(
                          `${event.id}/comprar/${datetime.toISOString()}`,
                        )
                      }
                      disabled={soldOut}
                    >
                      {soldOut ? "Agotado" : "Comprar"}
                    </button>
                    <p className="help">
                      {event.capacity - sold} entradas restantes
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
