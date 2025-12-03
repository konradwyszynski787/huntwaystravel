import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type {
  FormData,
  HandLuggage,
  CheckedLuggage,
  Bed,
  MultiCity,
} from "./types";

export async function POST(request: NextRequest) {
  try {
    const formData = (await request.json()) as FormData;

    // Walidacja danych krytycznych
    if (!formData?.email || !formData?.from || !formData?.to) {
      return NextResponse.json(
        { error: "Brakuje wymaganych pól (email, skąd, dokąd)" },
        { status: 400 }
      );
    }

    const clientEmail = formData.email.trim();
    if (!clientEmail) {
      return NextResponse.json(
        { error: "Brak poprawnego adresu email klienta w formularzu" },
        { status: 400 }
      );
    }

    // --- SMTP (nodemailer) konfiguracja ---
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || "587");
    const secure = process.env.SMTP_SECURE === "true";
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;

    if (!host || !user || !pass) {
      console.error("Brak konfiguracji SMTP (SMTP_HOST / SMTP_USER / SMTP_PASSWORD)");
      return NextResponse.json(
        {
          error:
            "Serwer poczty nie jest poprawnie skonfigurowany. Skontaktuj się z nami bezpośrednio na huntwaystravelpl@gmail.com.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const fromAddress =
      process.env.SMTP_FROM || `HuntWays Travel <${user}>`;

    const adminEmails = (
      process.env.SMTP_TO || "huntwaystravelpl@gmail.com"
    )
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    const adminHtml = generateSummaryHTML(formData);
    const adminText = generateSummaryPlainText(formData);

    // Mail do biura
    await transporter.sendMail({
      from: fromAddress,
      to: adminEmails,
      replyTo: clientEmail,
      subject: "Nowe zgłoszenie - Kreator podróży",
      html: adminHtml,
      text: adminText,
    });

    console.log("Email wysłany do administratorów (SMTP):", adminEmails.join(", "));

   // Mail potwierdzający zawsze wysyłany do klienta
const confirmationHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #ff9800; margin-bottom: 16px;">Dziękujemy za zgłoszenie!</h2>
  <p style="margin: 0 0 16px;">Otrzymaliśmy Twoje zgłoszenie dotyczące planowania podróży. Skontaktujemy się z Tobą wkrótce z najlepszą ofertą.</p>
  <p style="margin: 0 0 12px;">Szczegóły Twojego zgłoszenia:</p>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 12px; margin: 20px 0;">
    ${adminHtml}
  </div>
  <p style="margin-top: 30px; color: #666; font-size: 14px;">
    Pozdrawiamy,<br/>
    Zespół HuntWays Travel
  </p>
</div>
`;

await transporter.sendMail({
from: fromAddress,
to: clientEmail,
subject: "Potwierdzenie otrzymania zgłoszenia - HuntWays Travel",
html: confirmationHtml,
text: `Dziękujemy za zgłoszenie! Otrzymaliśmy Twoje dane i wkrótce wrócimy z ofertą.\n\n${adminText}`,
});

console.log("Email potwierdzający wysłany do klienta (SMTP):", clientEmail);

    return NextResponse.json(
      { message: "Formularz został wysłany pomyślnie" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Błąd podczas wysyłania formularza:", error);
    return NextResponse.json(
      {
        error: "Wystąpił błąd podczas wysyłania formularza",
        details: error.message || "Nieznany błąd",
      },
      { status: 500 }
    );
  }
}

const formatBoolean = (condition?: boolean, text?: string) =>
  condition ? text : null;

const formatList = (items: string[]) =>
  items.length
    ? `<ul style="margin: 8px 0 0 16px; padding: 0;">${items
        .map((item) => `<li style="margin-bottom: 4px;">${item}</li>`)
        .join("")}</ul>`
    : "<p style=\"margin: 8px 0 0; color: #777;\">Brak</p>";

const collectSpecialNeeds = (data: FormData): string[] => {
  if (data.specialNeedsMain !== "tak") {
    return [];
  }

  return [
    formatBoolean(data.airportAssist, "Asysta na lotnisku"),
    formatBoolean(data.maas, "MAAS"),
    formatBoolean(data.wchr, "WCHR"),
    formatBoolean(data.wchs, "WCHS"),
    formatBoolean(data.wchc, "WCHC"),
    formatBoolean(data.deaf, "DEAF"),
    formatBoolean(data.blnd, "BLND"),
    formatBoolean(data.manualWheelchair, "Wózek manualny"),
    formatBoolean(data.electricWheelchair, "Wózek elektryczny"),
    formatBoolean(data.dietaryRestrictions, "Ograniczenia dietetyczne"),
    formatBoolean(data.medicalEquipment, "Sprzęt medyczny"),
    formatBoolean(data.mobilityAssistance, "Pomoc w poruszaniu się"),
    formatBoolean(data.visualAssistance, "Pomoc dla niewidomych"),
    formatBoolean(data.hearingAssistance, "Pomoc dla niesłyszących"),
    formatBoolean(data.cognitiveAssistance, "Pomoc dla zaburzeń poznawczych"),
    formatBoolean(data.petTravel, "Podróż ze zwierzęciem"),
    formatBoolean(data.infantTravel, "Podróż z niemowlęciem"),
  ].filter(Boolean) as string[];
};

function generateSummaryHTML(formData: FormData): string {
  const handLuggage = (formData.handLuggage || [])
    .filter((item: HandLuggage) => Number(item.count) > 0)
    .map(
      (item) =>
        `${item.type === "plecak" ? "Plecak" : "Walizka kabinowa"} x${item.count}`
    );

  const checkedLuggage = (formData.checkedLuggage || [])
    .filter((item: CheckedLuggage) => item.weight)
    .map((item) => `Walizka ${item.weight} kg`);

  const beds = (formData.beds || [])
    .filter((bed: Bed) => Number(bed.count) > 0)
    .map((bed) => {
      const typeName =
        bed.type === "pojedyncze"
          ? "Łóżko pojedyncze"
          : bed.type === "podwójne"
          ? "Łóżko podwójne"
          : "Łóżko małżeńskie";
      const roomInfo =
        Number(formData.rooms) > 1 ? ` (Pokój ${bed.room})` : "";
      return `${typeName} x${bed.count}${roomInfo}`;
    });

  const multiCity = (formData.multiCity || [])
    .filter((item: MultiCity) => item.city && item.date)
    .map((item) => `${item.city} (${item.date})`);

  const specialNeeds = collectSpecialNeeds(formData);

  const sectionStyle =
    "margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #eee;";
  const headingStyle =
    "font-size: 18px; color: #ff9800; margin-bottom: 12px; text-transform: uppercase;";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #222;">
      <h2 style="color: #ff9800; margin-bottom: 8px;">Nowe zgłoszenie z kreatora podróży</h2>
      <p style="margin-top: 0; color: #666;">Email klienta: <strong>${formData.email}</strong></p>

      <section style="${sectionStyle}">
        <h3 style="${headingStyle}">Szczegóły lotu</h3>
        <p><strong>Skąd:</strong> ${formData.from || "-"}</p>
        <p><strong>Dokąd:</strong> ${formData.to || "-"}</p>
        <p><strong>Typ podróży:</strong> ${formData.tripType}</p>
        <p><strong>Rodzaj lotu:</strong> ${formData.flightType}</p>
        <p><strong>Data wyjazdu:</strong> ${formData.dateFrom || "-"}</p>
        ${
          formData.tripType === "roundtrip"
            ? `<p><strong>Data powrotu:</strong> ${formData.dateTo || "-"}</p>`
            : ""
        }
        ${
          formData.tripType === "multicity"
            ? `<p><strong>Miasta Multi City:</strong></p>${formatList(multiCity)}`
            : ""
        }
        <p><strong>Ilość osób:</strong> ${formData.adults} dorośli, ${
    formData.children
  } dzieci, ${formData.infants} niemowlęta</p>
        <p><strong>Pora dnia wylotu:</strong> ${formData.departureTime}</p>
        <p><strong>Bagaż podręczny:</strong></p>
        ${formatList(handLuggage)}
        <p><strong>Bagaż rejestrowany:</strong></p>
        ${formatList(checkedLuggage)}
        <p><strong>Wybór miejsca:</strong> ${
          formData.seatChoice === "tak" ? "Tak" : "Nie"
        }</p>
        <p><strong>Potrzeby specjalne:</strong></p>
        ${
          formData.specialNeedsMain === "tak"
            ? formatList(specialNeeds)
            : '<p style="margin: 8px 0 0; color: #777;">Brak</p>'
        }
      </section>

      <section style="${sectionStyle}">
        <h3 style="${headingStyle}">Szczegóły hotelu</h3>
        <p><strong>Jakość hotelu:</strong> ${formData.hotelQuality || "-"}</p>
        <p><strong>Odległość od centrum:</strong> ${
          formData.distanceCenter || "-"
        }</p>
        <p><strong>Odległość od plaży:</strong> ${
          formData.distanceBeach || "-"
        }</p>
        <p><strong>Ilość pokoi:</strong> ${formData.rooms || "-"}</p>
        <p><strong>Łóżka:</strong></p>
        ${formatList(beds)}
        <p><strong>Wyżywienie:</strong> ${
          formData.meals?.length ? formData.meals.join(", ") : "Brak"
        }</p>
      </section>

      <section style="${sectionStyle}">
        <h3 style="${headingStyle}">Dodatki</h3>
        <p><strong>Ubezpieczenie turystyczne:</strong> ${
          formData.insurance
        }</p>
        <p><strong>Bilety wstępu:</strong> ${formData.tickets}</p>
        <p><strong>Budżet:</strong> ${
          formData.budget ? `${formData.budget} ${formData.currency}` : "-"
        }</p>
      </section>
    </div>
  `;
}

function generateSummaryPlainText(formData: FormData): string {
  const lines: string[] = [];
  lines.push("Nowe zgłoszenie z formularza HuntWays Travel");
  lines.push("");
  lines.push("— Szczegóły lotu —");
  lines.push(`Skąd: ${formData.from || "-"}`);
  lines.push(`Dokąd: ${formData.to || "-"}`);
  lines.push(`Typ podróży: ${formData.tripType}`);
  lines.push(`Rodzaj lotu: ${formData.flightType}`);
  lines.push(`Data wyjazdu: ${formData.dateFrom || "-"}`);
  if (formData.tripType === "roundtrip") {
    lines.push(`Data powrotu: ${formData.dateTo || "-"}`);
  }
  if (formData.tripType === "multicity") {
    const cities = (formData.multiCity || [])
      .filter((item: MultiCity) => item.city && item.date)
      .map((item) => `${item.city} (${item.date})`);
    lines.push(`Miasta multi city: ${cities.length ? cities.join(", ") : "Brak"}`);
  }
  lines.push(
    `Ilość osób: ${formData.adults} dorośli, ${formData.children} dzieci, ${formData.infants} niemowlęta`
  );
  lines.push(`Pora dnia wylotu: ${formData.departureTime}`);

  const handLuggage = (formData.handLuggage || [])
    .filter((item: HandLuggage) => Number(item.count) > 0)
    .map(
      (item) =>
        `${item.type === "plecak" ? "Plecak" : "Walizka kabinowa"} x${item.count}`
    );
  lines.push(
    `Bagaż podręczny: ${handLuggage.length ? handLuggage.join(", ") : "Brak"}`
  );

  const checkedLuggage = (formData.checkedLuggage || [])
    .filter((item: CheckedLuggage) => item.weight)
    .map((item) => `Walizka ${item.weight} kg`);
  lines.push(
    `Bagaż rejestrowany: ${
      checkedLuggage.length ? checkedLuggage.join(", ") : "Brak"
    }`
  );

  lines.push(
    `Wybór miejsca: ${formData.seatChoice === "tak" ? "Tak" : "Nie"}`
  );

  const specialNeeds = collectSpecialNeeds(formData);
  lines.push(
    `Potrzeby specjalne: ${
      formData.specialNeedsMain === "tak"
        ? specialNeeds.length
          ? specialNeeds.join(", ")
          : "Zaznaczono, ale brak szczegółów"
        : "Brak"
    }`
  );

  lines.push("");
  lines.push("— Szczegóły hotelu —");
  lines.push(`Jakość hotelu: ${formData.hotelQuality || "-"}`);
  lines.push(`Odległość od centrum: ${formData.distanceCenter || "-"}`);
  lines.push(`Odległość od plaży: ${formData.distanceBeach || "-"}`);
  lines.push(`Ilość pokoi: ${formData.rooms || "-"}`);

  const beds = (formData.beds || [])
    .filter((bed: Bed) => Number(bed.count) > 0)
    .map((bed) => {
      const typeName =
        bed.type === "pojedyncze"
          ? "Łóżko pojedyncze"
          : bed.type === "podwójne"
          ? "Łóżko podwójne"
          : "Łóżko małżeńskie";
      const roomInfo =
        Number(formData.rooms) > 1 ? ` (Pokój ${bed.room})` : "";
      return `${typeName} x${bed.count}${roomInfo}`;
    });
  lines.push(`Łóżka: ${beds.length ? beds.join(", ") : "Brak"}`);
  lines.push(
    `Wyżywienie: ${
      formData.meals?.length ? formData.meals.join(", ") : "Brak"
    }`
  );

  lines.push("");
  lines.push("— Dodatki —");
  lines.push(`Ubezpieczenie turystyczne: ${formData.insurance}`);
  lines.push(`Bilety wstępu: ${formData.tickets}`);
  lines.push(
    `Budżet: ${
      formData.budget ? `${formData.budget} ${formData.currency}` : "-"
    }`
  );
  lines.push(`Email klienta: ${formData.email}`);

  return lines.join("\n");
}
