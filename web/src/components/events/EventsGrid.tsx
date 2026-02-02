"use client";

import {
  getEventApi,
  type EventControllerGetAllRequest,
  type EventShortDto,
} from "@/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventsGrid() {
  const [events, setEvents] = useState<EventShortDto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const perPage = 20;
  const router = useRouter();

  async function load(pageToLoad = 1) {
    setLoading(true);
    try {
      const params: EventControllerGetAllRequest = {
        page: pageToLoad,
        perPage,
      };
      if (searchText && searchText.trim() !== "")
        params.search = searchText.trim();
      if (from) params.from = new Date(from);
      if (to) params.to = new Date(to);

      const res = await getEventApi().eventControllerGetAll(params);
      if (pageToLoad === 1) setEvents(res);
      else setEvents((prev) => [...prev, ...res]);
      setHasMore(res.length === perPage);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(1);
  }, []);

  async function doSearch() {
    setPage(1);
    await load(1);
  }

  async function loadMore() {
    if (loading || !hasMore) return;
    const next = page + 1;
    await load(next);
    setPage(next);
  }

  return (
    <div className="container mt-4">
      <div className="box">
        <form className="columns is-vcentered">
          <div className="column">
            <div className="field">
              <label htmlFor="search" className="label">
                Nombre, descripción o ubicación
              </label>
              <div className="control">
                <input
                  className="input"
                  name="search"
                  id="search"
                  placeholder="Buscar eventos..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="column is-narrow">
            <div className="field">
              <label htmlFor="date-from" className="label">
                Desde
              </label>
              <div className="control">
                <input
                  type="datetime-local"
                  name="date-from"
                  id="date-from"
                  className="input"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="column is-narrow">
            <div className="field">
              <label htmlFor="date-to" className="label">
                Hasta
              </label>
              <div className="control">
                <input
                  type="datetime-local"
                  name="date-to"
                  id="date-to"
                  className="input"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="column is-narrow">
            <div className="field">
              <div className="control">
                <button
                  className="button is-primary"
                  onClick={doSearch}
                  disabled={loading}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="block grid is-col-min-9">
        {events.map((e) => (
          <div
            key={e.id}
            className="cell is-clickable"
            onClick={() => router.push(`/${e.id}`)}
          >
            <div
              className="card is-flex is-flex-direction-column"
              style={{ minHeight: 320 }}
            >
              <div className="card-image">
                <figure className="image is-4by3">
                  <div
                    className="has-background-light is-flex is-align-items-center is-justify-content-center"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <span className="has-text-grey">Imagen</span>
                  </div>
                </figure>
              </div>
              <div className="card-content if-flex-grow-1 is-flex is-flex-direction-column">
                <p
                  className="title is-6"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {e.name}
                </p>
                <div className="mt-auto">
                  <button className="button is-link is-fullwidth">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="has-text-centered mt-4">
        {hasMore ? (
          <button
            className="button is-primary"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "Cargando…" : "Cargar más"}
          </button>
        ) : (
          <p className="help">No hay más eventos.</p>
        )}
      </div>
    </div>
  );
}
