import { CreateEventDto, getEventApi, getProfileApi } from "@/api";
import { auth0 } from "@/auth0";
import EventForm from "@/components/events/EventForm";
import { redirect } from "next/navigation";

export default auth0.withPageAuthRequired(
  async function PublishEventPage() {
    const profile = await getProfileApi().profileControllerGetProfile();

    if (profile.type !== "manager") {
      redirect("/solicitud-manager");
    }

    async function publishEvent(event: CreateEventDto) {
      "use server";

      return await getEventApi().eventControllerCreate({
        createEventDto: event,
      });
    }

    return (
      <div className="container is-max-desktop">
        <EventForm mode="create" onPublish={publishEvent} />
      </div>
    );
  },
  { returnTo: "/mis-eventos/publicar" },
);
