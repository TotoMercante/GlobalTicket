"use client";

import type { CreateUserDto, StandardUserDto, UpdateUserDto } from "@/api";
import { useState } from "react";

type UserFormProps =
  | { mode: "new"; onSave(user: CreateUserDto): void }
  | { mode: "edit"; user: StandardUserDto; onSave(user: UpdateUserDto): void };

export default function UserForm(props: UserFormProps) {
  const [user, setUser] = useState(
    props.mode == "edit" ? props.user : ({} as CreateUserDto),
  );

  function setProps<K extends keyof CreateUserDto, V extends CreateUserDto[K]>(
    name: K,
    value: V,
  ) {
    setUser({ ...user, [name]: value });
  }

  return (
    <form action={() => props.onSave(user)} className="fixed-grid">
      <section className="grid has-2-cols">
        <div className="field">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            required
            disabled={props.mode == "edit"}
            type="email"
            name="email"
            id="email"
            className="input"
            placeholder="Email"
            value={user.email ?? ""}
            onChange={(e) => setProps("email", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password" className="label">
            Contraseña
          </label>
          <input
            required
            type="password"
            name="password"
            id="password"
            className="input"
            placeholder="Contraseña"
            value={user.password ?? ""}
            onChange={(e) => setProps("password", e.target.value)}
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
            value={user.firstName ?? ""}
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
            value={user.lastName ?? ""}
            onChange={(e) => setProps("lastName", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="dni" className="label">
            Número de documento
          </label>
          <input
            required
            disabled={props.mode == "edit"}
            type="number"
            name="dni"
            id="dni"
            className="input"
            placeholder="Número de documento"
            value={user.dni ?? ""}
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
            disabled={props.mode == "edit"}
            type="date"
            name="birthdate"
            id="birthdate"
            className="input"
            placeholder="Fecha de nacimiento"
            value={(user.birthdate ?? new Date(0)).toISOString().split("T")[0]}
            onChange={(e) => setProps("birthdate", e.target.valueAsDate!)}
          />
        </div>
        <div className="field">
          <label htmlFor="phone-number" className="label">
            Número de teléfono
          </label>
          <input
            required
            type="tel"
            name="phone-number"
            id="phone-number"
            className="input"
            placeholder="Número de teléfono"
            value={user.phoneNumber ?? ""}
            onChange={(e) => setProps("phoneNumber", e.target.value)}
          />
        </div>
      </section>
      <div className="field is-grouped">
        <button type="submit" className="button is-primary">
          Guardar
        </button>
        <button
          type="reset"
          className="button"
          onClick={() => setUser({} as CreateUserDto)}
        >
          Reiniciar
        </button>
      </div>
    </form>
  );
}
