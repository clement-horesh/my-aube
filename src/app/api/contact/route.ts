import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactFormData = {
  email: string
  firstName: string
  lastName: string
  company: string
  need: string
  phone: string
}

type TurnstileVerifyResponse = {
  success: boolean
  challenge_ts?: string
  hostname?: string
  "error-codes"?: string[]
  action?: string
  cdata?: string
}

function isValidEmail(value: string): boolean {
  return /.+@.+\..+/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as (Partial<ContactFormData> & { turnstileToken?: string | null }) | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const { email, firstName, lastName, company, need, phone, turnstileToken } = body;

    // Verify Turnstile token
    const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecretKey) {
      return NextResponse.json(
        { error: "Captcha non configuré côté serveur (clé secrète manquante)." },
        { status: 500 }
      );
    }
    if (!turnstileToken) {
      return NextResponse.json({ error: "Vérification anti‑robot requise." }, { status: 400 });
    }

    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: turnstileSecretKey, response: String(turnstileToken) }),
    });
    const verifyJson = (await verifyRes.json()) as TurnstileVerifyResponse;
    if (!verifyJson.success) {
      console.warn("Turnstile verification failed:", verifyJson["error-codes"]);
      return NextResponse.json({ error: "Échec de la vérification anti‑robot." }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (!firstName || !lastName || !need) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.TO_EMAIL || "horeshclementpro@gmail.com";

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Email non configuré côté serveur (clé API Resend manquante)." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const subject = `Nouveau contact: ${firstName} ${lastName} - ${company || "Sans entreprise"}`;
    const text = `Nouveau message de contact:\n\n` +
      `Nom: ${firstName} ${lastName}\n` +
      `Email: ${email}\n` +
      `Téléphone: ${phone || "-"}\n` +
      `Entreprise: ${company || "-"}\n\n` +
      `Besoin:\n${need}`;

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text,
    });

    // Check if the email was sent successfully
    if (result.error) {
      console.error("Resend API error:", result.error);
      return NextResponse.json({ 
        error: "Erreur lors de l'envoi de l'email" 
      }, { status: 500 });
    }

    console.log("Email sent successfully:", result.data);
    return NextResponse.json({ 
      success: true, 
      message: "Email envoyé avec succès",
      id: result.data?.id 
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ 
      error: "Erreur inattendue lors de l'envoi" 
    }, { status: 500 });
  }
}


