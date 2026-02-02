import EventsGrid from "@/components/events/EventsGrid";

export default function Home() {
  return (
    <div>
      <section className="section">
        <div className="container is-max-desktop">
          <h1 className="title">Eventos</h1>
          <EventsGrid />
        </div>
      </section>
    </div>
  );
}
