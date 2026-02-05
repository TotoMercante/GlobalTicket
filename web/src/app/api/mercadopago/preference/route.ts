import { Preference } from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { price, title, email, eventId, date } = await req.json();
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken)
      return NextResponse.json(
        { error: "Missing MP_ACCESS_TOKEN" },
        { status: 500 },
      );

    const preference = new Preference({ accessToken });

    const prefResponse = await preference.create({
      body: {
        items: [
          {
            id: "1234",
            title: `${title || "Entrada"} | GlobalTicket`,
            quantity: 1,
            unit_price: Number(price),
            currency_id: "ARS",
          },
        ],
        payer: { email: email || "test@example.com" },
        auto_return: "approved",
        back_urls: { success: "localhost:3000/api/mercadopago/success" },
        external_reference: JSON.stringify({ eventId, date }),
      },
    });

    return NextResponse.json({ id: prefResponse.id });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
