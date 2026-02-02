import { getEventApi } from "@/api";
import BackButton from "@/components/BackButton";
import EventDateTable from "./components/EventDateTable";

export default async function EventPage(props: PageProps<"/[id]">) {
  const { id } = await props.params;
  const event = await getEventApi().eventControllerGetById({ id });

  return (
    <div className="container is-max-desktop">
      <div className="columns">
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <div
                  className="has-background-light is-flex is-align-items-center is-justify-content-center"
                  style={{ width: "100%", height: 240 }}
                >
                  <span className="has-text-grey">Imagen</span>
                </div>
              </figure>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="level">
            <div className="level-left">
              <h1 className="title">{event.name}</h1>
            </div>
            <div className="level-right">
              <BackButton />
            </div>
          </div>

          <p>
            <strong>Ubicación:</strong> {event.location}
          </p>

          <EventDateTable event={event} />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="subtitle">Descripción</h2>
        <div className="content">{event.description}</div>
      </div>
    </div>
  );
}
