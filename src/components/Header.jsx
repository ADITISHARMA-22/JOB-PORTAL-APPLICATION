import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Show, SignInButton, UserButton } from "@clerk/react";
// import {
//   SignedIn,
//   SignedOut,
//   UserButton,
//   SignIn,
//   useUser,
// } from "@clerk/clerk-react";
// import { Button } from "./ui/button";
// import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  // const [showSignIn, setShowSignIn] = useState(false);

  // const [search, setSearch] = useSearchParams();
  // const { user } = useUser();

  // useEffect(() => {
  //   if (search.get("sign-in")) {
  //     setShowSignIn(true);
  //   }
  // }, [search]);

  // const handleOverlayClick = (e) => {
  //   if (e.target === e.currentTarget) {
  //     setShowSignIn(false);
  //     setSearch({});
  //   }
  // };

  // return (
  //   <>
  //     <nav className="py-4 flex justify-between items-center">
  //       <Link to="/">
  //         <img src="/logo.png" className="h-20" alt="Nexora Logo" />
  //       </Link>

  //       <div className="flex gap-8">
  //         <SignedOut>
  //           <Button variant="outline" onClick={() => setShowSignIn(true)}>
  //             Login
  //           </Button>
  //         </SignedOut>
  //         <SignedIn>
  //           {user?.unsafeMetadata?.role === "recruiter" && (
  //             <Link to="/post-job">
  //               <Button variant="destructive" className="rounded-full">
  //                 <PenBox size={20} className="mr-2" />
  //                 Post a Job
  //               </Button>
  //             </Link>
  //           )}
  //           <UserButton
  //             appearance={{
  //               elements: {
  //                 avatarBox: "w-10 h-10",
  //               },
  //             }}
  //           >
  //             <UserButton.MenuItems>
  //               <UserButton.Link
  //                 label="My Jobs"
  //                 labelIcon={<BriefcaseBusiness size={15} />}
  //                 href="/my-jobs"
  //               />
  //               <UserButton.Link
  //                 label="Saved Jobs"
  //                 labelIcon={<Heart size={15} />}
  //                 href="/saved-jobs"
  //               />
  //               <UserButton.Action label="manageAccount" />
  //             </UserButton.MenuItems>
  //           </UserButton>
  //         </SignedIn>
  //       </div>
  //     </nav>

  //     {showSignIn && (
  //       <div
  //         className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  //         onClick={handleOverlayClick}
  //       >
  //         <SignIn
  //           signUpForceRedirectUrl="/onboarding"
  //           fallbackRedirectUrl="/onboarding"
  //         />
  //       </div>
  //     )}
  //   </>
  // );
  return (
    <nav className="py-10 pl-6 sm:pl-8 md:pl-12 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Nexora logo"
          className="logo-img w-12 h-12 rounded-full object-cover shadow-md ring-1 ring-white/10 p-0.5 bg-white/5"
        />
        <span className="hidden sm:inline-block text-2xl font-semibold tracking-tight">
          Nexora
        </span>
      </Link>
      <Show when="signed-out">
        <SignInButton />
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </nav>
  );
};

export default Header;
