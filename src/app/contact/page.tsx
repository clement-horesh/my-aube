"use client"

import { useEffect, useRef, useState } from "react";
import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactFormData = {
  email: string
  firstName: string
  lastName: string
  company: string
  need: string
  phone: string
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string
          callback?: (token: string) => void
          "error-callback"?: () => void
          "expired-callback"?: () => void
          theme?: "light" | "dark" | "auto"
          size?: "normal" | "flexible" | "compact"
        }
      ) => string
      reset: (widgetId?: string) => void
      getResponse?: (widgetId?: string) => string | undefined
    }
  }
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Load Cloudflare Turnstile script once
  useEffect(() => {
    const existing = document.querySelector('script[data-turnstile]');
    if (existing) return;
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-turnstile', 'true');
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  // Render the widget when script available
  useEffect(() => {
    if (!widgetRef.current) return;
    const interval = window.setInterval(() => {
      if (window.turnstile && !widgetId) {
        if (!siteKey) {
          setStatusMessage("Le captcha n'est pas configuré. Ajoutez NEXT_PUBLIC_TURNSTILE_SITE_KEY.");
          setStatusType("error");
          window.clearInterval(interval);
          return;
        }
        const id = window.turnstile.render(widgetRef.current!, {
          sitekey: siteKey,
          theme: "auto",
          size: "flexible",
          callback: (token) => setCaptchaToken(token),
          "expired-callback": () => setCaptchaToken(null),
          "error-callback": () => setCaptchaToken(null),
        });
        setWidgetId(id);
        window.clearInterval(interval);
      }
    }, 200);
    return () => window.clearInterval(interval);
  }, [widgetId, siteKey]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    setStatusType(null);

    const formData = new FormData(event.currentTarget);
    const payload: ContactFormData & { turnstileToken?: string } = {
      email: String(formData.get("email") || ""),
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      company: String(formData.get("company") || ""),
      need: String(formData.get("need") || ""),
      phone: String(formData.get("phone") || ""),
      turnstileToken: captchaToken || undefined,
    };

    try {
      if (!payload.turnstileToken) {
        throw new Error("Veuillez compléter la vérification anti‑robot.");
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}: ${res.statusText}`);
      }

      if (data.success) {
        setStatusMessage("Merci, votre message a bien été envoyé.");
        setStatusType("success");
        formRef.current?.reset();
        setCaptchaToken(null);
        if (window.turnstile && widgetId) {
          window.turnstile.reset(widgetId);
        }
      } else {
        throw new Error(data.error || "Réponse inattendue du serveur");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue. Merci de réessayer plus tard.";
      setStatusMessage(errorMessage);
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Menu />

      <section className="pt-28 pb-16 ">
        <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 transition-all duration-1000">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact</h1>
            <p className="mt-2 text-muted-foreground">
              Dites-nous en plus sur vous et votre besoin. Nous vous répondrons rapidement.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" name="firstName" placeholder="Jean" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input id="lastName" name="lastName" placeholder="Dupont" required />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input id="company" name="company" placeholder="Votre société" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" inputMode="email" placeholder="vous@exemple.com" required />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" name="phone" type="tel" inputMode="tel" placeholder="+33 6 12 34 56 78" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="need">Votre besoin</Label>
              <Textarea id="need" name="need" placeholder="Décrivez votre besoin..." className="min-h-32" required />
            </div>
            <div className="sm:col-span-2">
              <div ref={widgetRef} className="mt-2" />
              {!siteKey && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  Captcha indisponible: configurez NEXT_PUBLIC_TURNSTILE_SITE_KEY pour activer l&apos;envoi.
                </p>
              )}
            </div>
            <div className="sm:col-span-2 flex items-center gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting || !captchaToken}>
                {isSubmitting ? "Envoi..." : "Envoyer"}
              </Button>
              {statusMessage && (
                <p className={statusType === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                  {statusMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}


