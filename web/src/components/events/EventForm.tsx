"use client";

import {
  CreateEventDto,
  EventDateDto,
  EventShortDto,
  UpdateEventDto,
  type EventDto,
} from "@/api";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type EventFormProps =
  | { mode: "create"; onPublish(data: CreateEventDto): Promise<EventShortDto> }
  | {
      mode: "edit";
      eventId: string;
      initial: EventDto;
      onSave(id: string, data: UpdateEventDto): Promise<void>;
      onRemove(id: string): Promise<void>;
    };

export default function EventForm(props: EventFormProps) {
  const router = useRouter();
  const initial =
    props.mode == "edit"
      ? props.initial
      : {
          name: "",
          location: "",
          capacity: 0,
          ticketPrice: 0,
          description: "",
          dates: [],
        };
  const [name, setName] = useState(initial.name);
  const [location, setLocation] = useState(initial.location);
  const [capacity, setCapacity] = useState(initial.capacity);
  const [ticketPrice, setTicketPrice] = useState(initial.ticketPrice);
  const [description, setDescription] = useState(initial.description);
  const [dates, setDates] = useState<string[]>(
    initial.dates.map((d: EventDateDto) =>
      new Date(d.datetime).toISOString().slice(0, 16),
    ) || [""],
  );
  const [loading, withTransition] = useTransition();
  const [error, setError] = useState("");

  function updateDate(index: number, value: string) {
    const copy = [...dates];
    copy[index] = value;
    setDates(copy);
  }

  function addDate() {
    setDates([...dates, ""]);
  }

  function removeDate(i: number) {
    setDates(dates.filter((_, idx) => idx !== i));
  }

  async function submit() {
    setError("");
    withTransition(async () => {
      try {
        if (props.mode === "create") {
          const dto: CreateEventDto = {
            name,
            description,
            location,
            capacity: Number(capacity),
            ticketPrice: Number(ticketPrice),
            dates: dates.filter(Boolean).map((d) => new Date(d)),
          };

          const res = await props.onPublish(dto);
          router.replace(`/${res.id}`);
        } else {
          const dto: UpdateEventDto = {
            description,
            location,
            capacity: Number(capacity),
            ticketPrice: Number(ticketPrice),
            dates: dates.filter(Boolean).map((d) => new Date(d)),
          };
          console.log("Calling onSave prop...", {
            onSaveType: typeof props.onSave,
            eventId: props.eventId,
          });
          await props.onSave(props.eventId, dto);
          console.log("onSave prop resolved.");
          router.replace(`/${props.eventId}`);
        }
      } catch (e) {
        setError("Ha ocurrido un error.");
      }
    });
  }

  async function removeEvent() {
    if (props.mode != "edit") return;
    if (!confirm("¿Eliminar este evento? Esta acción no se puede deshacer."))
      return;
    withTransition(async () => {
      try {
        console.log("Calling onRemove prop...");
        await props.onRemove(props.eventId);
        router.replace("/mis-eventos");
      } catch (e) {
        console.error(e);
      }
    });
  }

  return (
    <div>
      <div className="block level">
        <div className="level-left">
          <h1 className="title">
            {props.mode === "create" ? "Publicar evento" : "Editar evento"}
          </h1>
        </div>
        <div className="level-right">
          <div className="buttons">
            <button
              className="button"
              onClick={() => router.back()}
              disabled={loading}
            >
              ← Volver
            </button>
            {props.mode === "create" ? (
              <>
                <button
                  className="button"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  className="button is-primary"
                  onClick={submit}
                  disabled={loading}
                >
                  {loading ? "Publicando…" : "Publicar"}
                </button>
              </>
            ) : (
              <>
                <button
                  className="button is-danger"
                  onClick={removeEvent}
                  disabled={loading}
                >
                  Eliminar
                </button>
                <button
                  className="button is-primary"
                  onClick={submit}
                  disabled={loading}
                >
                  {loading ? "Guardando…" : "Guardar"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {error && <div className="block">{error}</div>}

      <div className="box">
        <div className="field">
          <label className="label">Nombre</label>
          <div className="control">
            <input
              required
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={props.mode == "edit"}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Ubicación</label>
          <div className="control">
            <input
              required
              className="input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <label className="label">Capacidad</label>
              <div className="control">
                <input
                  required
                  type="number"
                  className="input"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Precio de entrada</label>
              <div className="control">
                <input
                  required
                  type="number"
                  className="input"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Fechas</label>
          <div className="control">
            {dates.map((d, idx) => (
              <div key={idx} className="field has-addons">
                <div className="control is-expanded">
                  <input
                    required
                    type="datetime-local"
                    className="input"
                    value={d}
                    onChange={(e) => updateDate(idx, e.target.value)}
                  />
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button is-danger"
                    onClick={() => removeDate(idx)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <div className="control">
              <button
                type="button"
                className="button is-link"
                onClick={addDate}
              >
                Agregar fecha
              </button>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Descripción</label>
          <div className="control">
            <textarea
              required
              className="textarea"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
