import { getEventTicketApi, getProfileApi } from "@/api";
import { auth0 } from "@/auth0";
import TicketScanner from "./Scanner";
import { redirect } from "next/navigation";

export default auth0.withPageAuthRequired(async function StaffPage() {
  const profile = await getProfileApi().profileControllerGetProfile();

  if (profile.type !== "staff") redirect("/");

  async function fetchTicket(id: string) {
    "use server";

    return await getEventTicketApi()
      .eventTicketControllerGetById({ id })
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  return (
    <div className="container is-max-desktop">
      <h1 className="title">Verificar entrada</h1>
      <TicketScanner onScan={fetchTicket} />
    </div>
  );
});
