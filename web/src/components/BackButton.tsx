"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button className="button" onClick={() => router.back()}>
      ← Volver
    </button>
  );
}
