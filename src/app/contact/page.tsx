"use client"

import { useState, useRef } from "react";
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

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    setStatusType(null);

    const formData = new FormData(event.currentTarget);
    const payload: ContactFormData = {
      email: String(formData.get("email") || ""),
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      company: String(formData.get("company") || ""),
      need: String(formData.get("need") || ""),
      phone: String(formData.get("phone") || ""),
    };

    try {
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

      <section className="pt-28 pb-16 px-4">
        <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
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
            <div className="sm:col-span-2 flex items-center gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
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


