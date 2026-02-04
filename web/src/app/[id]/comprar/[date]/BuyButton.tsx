"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface BuySectionProps {
  onBuy(): Promise<void>;
}

export default function BuyButton(props: BuySectionProps) {
  const { onBuy } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function buyTickets() {
    setLoading(true);
    await onBuy().finally(() => setLoading(false));
    router.push("/");
  }

  return (
    <button
      className="button is-primary"
      disabled={loading}
      onClick={(e) => {
        e.preventDefault();
        buyTickets();
      }}
    >
      {loading ? "Cargando..." : "Comprar"}
    </button>
  );
}
