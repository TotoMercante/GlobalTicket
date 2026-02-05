import { NextRequest, NextResponse } from "next/server";
import { getEventTicketApi } from "@/api";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const preferenceId = url.searchParams.get("preference_id");

    if (!preferenceId) {
      return NextResponse.json(
        { error: "Missing preference id" },
        { status: 400 },
      );
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken)
      return NextResponse.json(
        { error: "Missing MP_ACCESS_TOKEN" },
        { status: 500 },
      );

    const res = await fetch(
      `https://api.mercadopago.com/checkout/preferences/${preferenceId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: "Failed to fetch preference", body },
        { status: res.status },
      );
    }

    const pref = await res.json();

    // Try to extract eventId and date from external_reference (support JSON or delimited string)
    let eventId: string | undefined;
    let dateStr: string | undefined;

    const ext = pref.external_reference;
    if (ext) {
      if (typeof ext === "string") {
        try {
          const parsed = JSON.parse(ext);
          eventId = parsed.eventId || parsed.event_id || parsed.id;
          dateStr = parsed.date || parsed.datetime || parsed.iso_date;
        } catch (_) {
          // not JSON, try common delimiters
          if (ext.includes("::")) [eventId, dateStr] = ext.split("::");
          else if (ext.includes("|")) [eventId, dateStr] = ext.split("|");
          else eventId = ext;
        }
      }
    }

    // Fallback to item id/title if needed
    if (!eventId && pref.items && pref.items.length > 0) {
      const item = pref.items[0];
      if (item.id) eventId = String(item.id);
      // try to parse ISO date from title
      if (!dateStr && typeof item.title === "string") {
        const isoMatch = item.title.match(
          /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
        );
        if (isoMatch) dateStr = isoMatch[0];
      }
    }

    if (!eventId || !dateStr) {
      return NextResponse.json(
        { error: "Missing event id or date in preference" },
        { status: 400 },
      );
    }

    const ticket = await getEventTicketApi().eventTicketControllerBuyTicket({
      buyTicketDto: { eventId: String(eventId), date: new Date(dateStr) },
    });

    return NextResponse.redirect(new URL(`/entradas/${ticket.id}`, req.url));
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || String(e) },
      { status: 500 },
    );
  }
}
