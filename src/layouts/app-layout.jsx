import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="relative min-h-screen">
      <div className="grid-background" />

      <main className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />
        <Outlet />
      </main>

      <footer className="relative z-10 mt-16 border-t border-white/10 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-center text-sm text-muted-foreground md:flex-row">
          <p>
            © 2026 <span className="font-semibold text-foreground">Nexora</span>
            . All rights reserved.
          </p>

          <p>
            Built with{" "}
            <span className="font-medium text-foreground">
              React • Supabase • Clerk • Tailwind CSS
            </span>
          </p>

          <p>
            Crafted with 💜 by{" "}
            <span className="font-semibold text-violet-400">Aditi Sharma</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
