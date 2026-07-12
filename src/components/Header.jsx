import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Show, UserButton, SignIn, useUser } from "@clerk/react";

import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between">
          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src="/logo.png"
              alt="Nexora Logo"
              className="logo-img h-11 w-11 rounded-full object-cover"
            />

            <span className="hidden text-2xl font-bold tracking-tight sm:block">
              Nexora
            </span>
          </Link>

          {/* Right Side */}

          <div className="flex items-center gap-3">
            <ModeToggle />

            <Show when="signed-out">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setShowSignIn(true)}
              >
                Login
              </Button>
            </Show>

            <Show when="signed-in">
              {user?.unsafeMetadata?.role === "recruiter" && (
                <Link to="/post-job">
                  <Button variant="default" className="rounded-full">
                    <PenBox size={18} className="mr-2" />
                    Post a Job
                  </Button>
                </Link>
              )}

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-primary/20",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Jobs"
                    href="/my-jobs"
                    labelIcon={<BriefcaseBusiness size={15} />}
                  />

                  <UserButton.Link
                    label="Saved Jobs"
                    href="/saved-jobs"
                    labelIcon={<Heart size={15} />}
                  />

                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Show>
          </div>
        </nav>
      </header>

      {/* Clerk Sign In Modal */}

      {showSignIn && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
