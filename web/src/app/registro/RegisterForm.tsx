"use client";

import { getRegisterApi, RegisterProfileDto } from "@/api";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const { user, isLoading } = useUser();
  const [data, setData] = useState({} as RegisterProfileDto);
  const router = useRouter();

  function setProps<K extends keyof RegisterProfileDto>(
    name: K,
    value: RegisterProfileDto[K],
  ) {
    setData({ ...data, [name]: value });
  }

  async function registerProfile() {
    await getRegisterApi().registerControllerRegisterProfile({
      registerProfileDto: { ...data, email: user!.email!, password: "pass" },
    });
    router.push("/");
  }

  return (
    <form action={registerProfile} className="fixed-grid">
      <section className="grid has-2-cols">
        <div className="field is-col-span-2">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            required
            readOnly
            type="email"
            name="email"
            id="email"
            className={"input is-static" + (isLoading ? " is-loading" : null)}
            placeholder="Email"
            value={user?.email ?? ""}
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
      <div className="field is-grouped">
        <button type="submit" className="button is-primary">
          Guardar
        </button>
        <button
          type="reset"
          className="button"
          onClick={() => setData({} as RegisterProfileDto)}
        >
          Reiniciar
        </button>
      </div>
    </form>
  );
}
