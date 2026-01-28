"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getManagerRequestApi, getProfileApi, UserDto } from "@/api";

export default function SolicitudForm(props: { user: UserDto }) {
  const [businessName, setBusinessName] = useState("");
  const [cuit, setCuit] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateCuit = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    return cleaned.length === 11;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!businessName.trim()) {
      setError("Ingrese el nombre de la empresa.");
      return;
    }

    if (!validateCuit(cuit)) {
      setError("CUIT inválido; deben ser 11 dígitos.");
      return;
    }

    const user = props.user.id;

    try {
      setStatus("sending");
      await getManagerRequestApi().managerRequestControllerCreate({
        createManagerRequestDto: { user, businessName, cuit: Number(cuit) },
      });
      router.push("/");
    } catch (e) {
      setStatus("error");
      setError("Error al enviar la solicitud.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Nombre de la empresa</label>
        <div className="control">
          <input
            name="company"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="input"
            placeholder="Ej: Eventos S.A."
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">CUIT</label>
        <div className="control">
          <input
            name="cuit"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
            className="input"
            placeholder="Sin guiones, 11 dígitos"
            inputMode="numeric"
            required
          />
        </div>
      </div>

      {error && <p className="help is-danger">{error}</p>}

      <div className="field">
        <div className="control">
          <button
            type="submit"
            className="button is-primary"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Enviando…" : "Solicitar permiso"}
          </button>
        </div>
      </div>
      {status === "error" && (
        <div className="notification is-danger is-light">
          No se pudo enviar la solicitud.
        </div>
      )}
    </form>
  );
}
