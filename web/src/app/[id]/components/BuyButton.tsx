"use client";

import { useRouter } from "next/navigation";

type EventActionsProps = {
  eventId: string;
  dateIndex?: number;
  sold?: number;
  capacity?: number;
};

export default function BuyButton({
  eventId,
  dateIndex,
  sold = 0,
  capacity = 0,
}: EventActionsProps) {
  const router = useRouter();

  function goBuy() {
    if (dateIndex == null) return;
    router.push(`/${eventId}/compra/${dateIndex}`);
  }

  return (
    <button
      className="button is-primary"
      onClick={goBuy}
      disabled={sold >= capacity}
    >
      {sold >= capacity ? "Agotado" : "Comprar"}
    </button>
  );
}
