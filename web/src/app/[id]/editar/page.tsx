import { getEventApi, getProfileApi, UpdateEventDto } from "@/api";
import { auth0 } from "@/auth0";
import EventForm from "@/components/events/EventForm";
import { redirect } from "next/navigation";

async function saveEvent(id: string, event: UpdateEventDto) {
  "use server";

  console.log("saveEvent called.");
  await getEventApi().eventControllerUpdate({ id, updateEventDto: event });
}

async function removeEvent(id: string) {
  "use server";

  console.log("removeEvent called.");
  await getEventApi().eventControllerDelete({ id });
}

export default auth0.withPageAuthRequired(
  async function EditEventPage(props) {
    const { id } = await (props as PageProps<"/[id]/editar">).params;
    const profile = await getProfileApi().profileControllerGetProfile();

    if (profile.type !== "manager") {
      redirect("/solicitud-manager");
    }

    const event = await getEventApi().eventControllerGetById({ id });

    if (event.manager.id !== profile.id) {
      redirect("/mis-eventos");
    }

    return (
      <div className="container is-max-desktop">
        <EventForm
          mode="edit"
          eventId={id}
          initial={event}
          onSave={saveEvent}
          onRemove={removeEvent}
        />
      </div>
    );
  },
  {
    returnTo: async ({ params }) => {
      const { id } = (await params) as { id: string };
      return `/${id}/edit`;
    },
  },
);
