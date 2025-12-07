import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Brakuje wymaganych pól: imię i nazwisko, email, wiadomość" },
        { status: 400 }
      );
    }

    const clientEmail = body.email.trim();
    if (!clientEmail) {
      return NextResponse.json(
        { error: "Brak poprawnego adresu email" },
        { status: 400 }
      );
    }

    // Konfiguracja SMTP – taka sama jak w /api/submit-form
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

    const fromAddress = process.env.SMTP_FROM || `HuntWays Travel <${user}>`;

    const adminEmails = (process.env.SMTP_TO || "huntwaystravelpl@gmail.com")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff9800; margin-bottom: 12px;">Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${clientEmail}</p>
        <p><strong>Wiadomość:</strong></p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${
          body.message
        }</div>
      </div>
    `;

    const adminText = `Nowa wiadomość z formularza kontaktowego\n\nImię i nazwisko: ${body.name}\nEmail: ${clientEmail}\n\nWiadomość:\n${body.message}`;

    // Mail do biura
    await transporter.sendMail({
      from: fromAddress,
      to: adminEmails,
      replyTo: clientEmail,
      subject: "Nowa wiadomość z formularza kontaktowego",
      html: adminHtml,
      text: adminText,
    });

    // Mail potwierdzający do użytkownika
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff9800; margin-bottom: 16px;">Dziękujemy za kontakt!</h2>
        <p style="margin: 0 0 16px;">Otrzymaliśmy Twoją wiadomość i skontaktujemy się z Tobą najszybciej jak to możliwe.</p>
        <p style="margin: 0 0 12px;">Treść Twojej wiadomości:</p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${
          body.message
        }</div>
        <p style="margin-top: 24px; color: #666; font-size: 14px;">Pozdrawiamy,<br/>Zespół HuntWays Travel</p>
      </div>
    `;

    await transporter.sendMail({
      from: fromAddress,
      to: clientEmail,
      subject: "Potwierdzenie otrzymania wiadomości - HuntWays Travel",
      html: confirmationHtml,
      text: `Dziękujemy za kontakt! Otrzymaliśmy Twoją wiadomość i wkrótce się odezwiemy.\n\nTreść wiadomości:\n${body.message}`,
    });

    return NextResponse.json(
      { message: "Wiadomość została wysłana pomyślnie" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Błąd podczas wysyłania formularza kontaktowego:", error);
    return NextResponse.json(
      {
        error: "Wystąpił błąd podczas wysyłania formularza kontaktowego",
        details: error.message || "Nieznany błąd",
      },
      { status: 500 }
    );
  }
}
