import { getEventApi } from "@/api";
import { auth0 } from "@/auth0";
import BackButton from "@/components/BackButton";
import { redirect } from "next/navigation";
import BuyButton from "./BuyButton";

export default auth0.withPageAuthRequired(async function ComprarPage(props) {
  const { id, date } = await (
    props as PageProps<"/[id]/comprar/[date]">
  ).params.then((params) => ({
    ...params,
    date: params.date.replaceAll("%3A", ":"),
  }));
  const event = await getEventApi()
    .eventControllerGetById({ id })
    .catch(() => redirect("/"));
  const eventDate = event.dates.find((ed) => ed.datetime.toISOString() == date);
  if (!eventDate) redirect(`${id}`);

  const { email } = await auth0.getSession().then((sess) => sess!.user);

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

          <p className="block is-size-5">
            <strong>Ubicación:</strong> {event.location}
          </p>
          <p className="block is-size-5">
            <strong>Fecha:</strong> {new Date(date).toLocaleString()}
          </p>
          <p className="block is-size-5">
            <strong>Precio:</strong> ${event.ticketPrice}
          </p>

          <BuyButton
            price={event.ticketPrice}
            event={event}
            date={new Date(date)}
            email={email!}
          />
        </div>
      </div>
    </div>
  );
});
