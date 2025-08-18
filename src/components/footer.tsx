import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Separator className="mb-6" />
      <footer className="flex gap-[24px] flex-wrap items-center justify-center text-sm text-muted-foreground py-6">
        <span>© 2025 Aube. Tous droits réservés.</span>
      </footer>
    </div>
  );
} 