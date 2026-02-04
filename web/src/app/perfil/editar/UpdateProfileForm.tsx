"use client";

import type { UpdateProfileDto, UserDto } from "@/api";
import { useState } from "react";

interface UpdateProfileFormProps {
  profile: UserDto;
  onSave(data: UpdateProfileDto): Promise<void>;
}

export default function UpdateProfileForm(props: UpdateProfileFormProps) {
  const [data, setData] = useState(props.profile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function setProps<K extends keyof UserDto>(key: K, value: UserDto[K]) {
    setData({ ...data, [key]: value });
  }

  async function saveChanges() {
    setLoading(true);
    setError(false);
    try {
      await props.onSave(data);
    } catch (err) {
      console.dir(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveChanges();
      }}
      className="fixed-grid"
    >
      <section className="grid has-2-cols">
        <div className="field">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            required
            readOnly
            type="email"
            name="email"
            id="email"
            className="input is-static"
            placeholder="Email"
            value={data.email}
          />
        </div>
        <div className="field">
          <label htmlFor="first-name" className="label">
            Nombre
          </label>
          <input
            required
            type="text"
            name="first-name"
            id="first-name"
            className="input"
            placeholder="Nombre"
            value={data.firstName ?? ""}
            onChange={(e) => setProps("firstName", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="last-name" className="label">
            Apellido
          </label>
          <input
            required
            type="text"
            name="last-name"
            id="last-name"
            className="input"
            placeholder="Apellido"
            value={data.lastName ?? ""}
            onChange={(e) => setProps("lastName", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="dni" className="label">
            Número de documento
          </label>
          <input
            required
            type="number"
            name="dni"
            id="dni"
            className="input"
            placeholder="Número de documento"
            value={data.dni ?? ""}
            onChange={(e) => setProps("dni", e.target.valueAsNumber)}
          />
          <p className="help">Sin puntos ni espacios</p>
        </div>
        <div className="field">
          <label htmlFor="birthdate" className="label">
            Fecha de nacimiento
          </label>
          <input
            required
            type="date"
            name="birthdate"
            id="birthdate"
            className="input"
            placeholder="Fecha de nacimiento"
            value={(data.birthdate ?? new Date(0)).toISOString().split("T")[0]}
            onChange={(e) => setProps("birthdate", e.target.valueAsDate!)}
          />
        </div>
        <div className="field">
          <label htmlFor="phone-number" className="label">
            Número de teléfono
          </label>
          <input
            type="tel"
            name="phone-number"
            id="phone-number"
            className="input"
            placeholder="Número de teléfono"
            value={data.phoneNumber}
            onChange={(e) => setProps("phoneNumber", e.target.value)}
          />
        </div>
      </section>
      {error && (
        <div className="block">
          <div className="notification is-danger">Ha ocurrido un error</div>
        </div>
      )}
      <div className="field is-grouped">
        <button type="submit" className="button is-primary" disabled={loading}>
          Guardar
        </button>
        <button
          type="reset"
          className="button"
          onClick={() => setData(props.profile)}
        >
          Reiniciar
        </button>
      </div>
    </form>
  );
}
