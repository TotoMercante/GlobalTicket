import { getEventTicketApi } from "@/api";
import { auth0 } from "@/auth0";
import QRCode from "react-qr-code";
import TranferTicketModal from "./TranferTicketModal";
import { redirect } from "next/navigation";

export default auth0.withPageAuthRequired(async function EntradasPage(props) {
  const { id } = await (props as PageProps<"/entradas/[id]">).params;

  const ticket = await getEventTicketApi().eventTicketControllerGetById({ id });

  async function transferTicket(newUserEmail: string) {
    "use server";

    await getEventTicketApi().eventTicketControllerTransferTicket({
      transferTicketDto: { ticketId: ticket.id, newUserEmail },
    });
    redirect(`/entradas/${id}`);
  }

  return (
    <div className="container is-max-desktop">
      <div className="block">
        <h1 className="title">Entrada para &apos;{ticket.event.name}&apos;</h1>
        <p>
          <strong>Fecha:</strong> {ticket.date.toLocaleString()}
        </p>
      </div>
      <div className="block">
        {ticket.usable ? (
          <div className="notification is-success">Entrada habilitada</div>
        ) : (
          <div className="notification is-danger">Entrada inhabilitada</div>
        )}
      </div>
      {ticket.usable && (
        <>
          <div className="block">
            <QRCode value={ticket.id} />
          </div>
          <TranferTicketModal onTransfer={transferTicket} />
        </>
      )}
    </div>
  );
});
