import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Walidacja danych
    const { firstName, lastName, adults, children, email, packageName } = body;
    
    if (!firstName || !lastName || !email || !packageName) {
      return NextResponse.json(
        { error: "Brakujące wymagane pola" },
        { status: 400 }
      );
    }

    const clientEmail = email.trim();
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

    // Generowanie treści email dla pracownika
    const adminHtml = generateBookingSummaryHTML({
      firstName,
      lastName,
      email: clientEmail,
      adults,
      children,
      packageName,
    });

    const adminText = generateBookingSummaryPlainText({
      firstName,
      lastName,
      email: clientEmail,
      adults,
      children,
      packageName,
    });

    // Mail do biura
    await transporter.sendMail({
      from: fromAddress,
      to: adminEmails,
      replyTo: clientEmail,
      subject: `NOWA PROŚBA O REZERWACJĘ - ${packageName}`,
      html: adminHtml,
      text: adminText,
    });

    console.log("Email wysłany do administratorów (SMTP):", adminEmails.join(", "));

    // Mail potwierdzający do klienta
    const confirmationHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #ff9800; margin-bottom: 16px;">Dziękujemy za prośbę o rezerwację!</h2>
  <p style="margin: 0 0 16px;">Otrzymaliśmy Twoją prośbę o rezerwację wyjazdu. Skontaktujemy się z Tobą wkrótce z najlepszą ofertą.</p>
  <p style="margin: 0 0 12px;">Szczegóły Twojej prośby:</p>
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
      subject: "Potwierdzenie prośby o rezerwację - HuntWays Travel",
      html: confirmationHtml,
      text: `Dziękujemy za prośbę o rezerwację! Otrzymaliśmy Twoje dane i wkrótce wrócimy z ofertą.\n\n${adminText}`,
    });

    console.log("Email potwierdzający wysłany do klienta (SMTP):", clientEmail);

    return NextResponse.json(
      { message: "Prośba o rezerwację została wysłana pomyślnie" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Błąd podczas wysyłania prośby o rezerwację:", error);
    return NextResponse.json(
      {
        error: "Wystąpił błąd podczas wysyłania prośby o rezerwację",
        details: error.message || "Nieznany błąd",
      },
      { status: 500 }
    );
  }
}

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  adults: string;
  children: string;
  packageName: string;
}

function generateBookingSummaryHTML(data: BookingData): string {
  const sectionStyle =
    "margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #eee;";
  const headingStyle =
    "font-size: 18px; color: #ff9800; margin-bottom: 12px; text-transform: uppercase;";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #222;">
      <h2 style="color: #ff9800; margin-bottom: 8px;">Nowa prośba o rezerwację wyjazdu</h2>
      <p style="margin-top: 0; color: #666;">Email klienta: <strong>${data.email}</strong></p>

      <section style="${sectionStyle}">
        <h3 style="${headingStyle}">Dane klienta</h3>
        <p><strong>Imię:</strong> ${data.firstName}</p>
        <p><strong>Nazwisko:</strong> ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Liczba osób dorosłych:</strong> ${data.adults || '0'}</p>
        <p><strong>Liczba dzieci:</strong> ${data.children || '0'}</p>
      </section>

      <section style="${sectionStyle}">
        <h3 style="${headingStyle}">Wybrany wyjazd</h3>
        <p><strong>Nazwa wyjazdu:</strong> ${data.packageName}</p>
        <p><strong>Data prośby:</strong> ${new Date().toLocaleString('pl-PL')}</p>
      </section>
    </div>
  `;
}

function generateBookingSummaryPlainText(data: BookingData): string {
  const lines: string[] = [];
  lines.push("Nowa prośba o rezerwację wyjazdu - HuntWays Travel");
  lines.push("");
  lines.push("— Dane klienta —");
  lines.push(`Imię: ${data.firstName}`);
  lines.push(`Nazwisko: ${data.lastName}`);
  lines.push(`Email: ${data.email}`);
  lines.push(`Liczba osób dorosłych: ${data.adults || '0'}`);
  lines.push(`Liczba dzieci: ${data.children || '0'}`);
  lines.push("");
  lines.push("— Wybrany wyjazd —");
  lines.push(`Nazwa wyjazdu: ${data.packageName}`);
  lines.push(`Data prośby: ${new Date().toLocaleString('pl-PL')}`);
  lines.push("");
  lines.push(`Email klienta: ${data.email}`);

  return lines.join("\n");
}
