import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Walidacja danych
    if (!formData.email || !formData.from || !formData.to) {
      return NextResponse.json(
        { error: "Brakuje wymaganych pól" },
        { status: 400 }
      );
    }

    const clientEmail = (formData.email || "").trim();
    if (!clientEmail) {
      return NextResponse.json(
        { error: "Brak adresu email klienta w formularzu" },
        { status: 400 }
      );
    }

    // Adres nadawcy i odbiorcy
    const fromAddress = process.env.MAIL_FROM!;
    const adminEmails = (process.env.RECIPIENT_EMAIL || "kontakt@huntwaystravel.pl")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    // Tworzymy maila do administratora
    const adminHtml = generateSummaryHTML(formData);
    await resend.emails.send({
      from: fromAddress,
      to: adminEmails,
      replyTo: clientEmail,
      subject: "Nowe zgłoszenie - Kreator podróży",
      html: adminHtml,
    });

    console.log("Email wysłany do administratorów:", adminEmails.join(", "));

    // Opcjonalnie: potwierdzenie do klienta
    if (process.env.SEND_CONFIRMATION === "true") {
      const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1976d2;">Dziękujemy za zgłoszenie!</h2>
          <p>Otrzymaliśmy Twoje zgłoszenie dotyczące planowania podróży. Skontaktujemy się z Tobą wkrótce z najlepszą ofertą.</p>
          <p>Szczegóły Twojego zgłoszenia:</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${adminHtml}
          </div>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            Pozdrawiamy,<br/>
            Zespół HuntWays Travel
          </p>
        </div>
      `;
      await resend.emails.send({
        from: fromAddress,
        to: clientEmail,
        subject: "Potwierdzenie otrzymania zgłoszenia - HuntWays Travel",
        html: confirmationHtml,
      });

      console.log("Email potwierdzający wysłany do klienta:", clientEmail);
    }

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
};

function generateSummaryHTML(formData: any): string {
  // Tutaj możesz wstawić dokładnie Twój kod HTML podsumowania z dotychczasowego generateSummaryHTML
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #333;">
      <h2 style="color: #1976d2;">Podsumowanie rezerwacji</h2>
      <p><strong>Skąd:</strong> ${formData.from || '-'}</p>
      <p><strong>Dokąd:</strong> ${formData.to || '-'}</p>
      <p><strong>Email klienta:</strong> ${formData.email || '-'}</p>
      <!-- dodaj pozostałe sekcje jak wcześniej -->
    </div>
  `;
}
