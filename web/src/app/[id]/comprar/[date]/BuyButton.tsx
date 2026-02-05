"use client";

import { EventDto } from "@/api";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";

interface BuySectionProps {
  price: number;
  email: string;
  event: EventDto;
  date: Date;
}

export default function BuyButton(props: BuySectionProps) {
  const { price, email, event, date } = props;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MP_KEY;
    if (!publicKey) {
      (async () => setError("Error al cargar botón de compra"))();
    }
    initMercadoPago(`${publicKey}`);
  }, []);

  async function fetchPreference() {
    const res = await fetch("/api/mercadopago/preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        title: event.name,
        eventId: event.id,
        date,
        price,
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.error || "Ha ocurrido un error");
    }
    return (await res.json()).id as string;
  }

  async function loadPreference() {
    setError(null);
    try {
      const preferenceId = await fetchPreference();
      return preferenceId;
    } catch (err) {
      setError(err?.message || "Error inesperado");
    }
  }

  return (
    <>
      {error && <p className="notification is-danger">{error}</p>}
      <div className="box has-background-light p-2">
        <Wallet onSubmit={loadPreference} locale="es-AR" />
      </div>
    </>
  );
}
