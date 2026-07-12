// import { useUser } from "@clerk/react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { BarLoader } from "react-spinners";

// const Onboarding = () => {
//   const { user, isLoaded } = useUser();
//   const navigate = useNavigate();

//   const navigateUser = (currRole) => {
//     navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
//   };

//   const handleRoleSelection = async (role) => {
//     await user
//       .update({ unsafeMetadata: { role } })
//       .then(() => {
//         console.log(`Role updated to: ${role}`);
//         navigateUser(role);
//       })
//       .catch((err) => {
//         console.error("Error updating role:", err);
//       });
//   };

//   useEffect(() => {
//     if (user?.unsafeMetadata?.role) {
//       navigateUser(user.unsafeMetadata.role);
//     }
//   }, [user]);

//   if (!isLoaded) {
//     return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center mt-40">
//       <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
//         I am a...
//       </h2>
//       <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
//         <Button
//           variant="blue"
//           className="h-36 text-2xl"
//           onClick={() => handleRoleSelection("candidate")}
//         >
//           Candidate
//         </Button>
//         <Button
//           variant="destructive"
//           className="h-36 text-2xl"
//           onClick={() => handleRoleSelection("recruiter")}
//         >
//           Recruiter
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Onboarding;

import { useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { BarLoader } from "react-spinners";
import { BriefcaseBusiness, UserRound } from "lucide-react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const navigateUser = (role) => {
    navigate(role === "recruiter" ? "/post-job" : "/jobs", {
      replace: true,
    });
  };

  useEffect(() => {
    if (!isLoaded) return;

    const role = user?.unsafeMetadata?.role;

    if (role) {
      navigateUser(role);
    }
  }, [isLoaded, user]);

  const handleRoleSelection = async (role) => {
    if (loading) return;

    try {
      setLoading(true);

      await user.update({
        unsafeMetadata: {
          role,
        },
      });

      navigateUser(role);
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <BarLoader width={"100%"} color="#7C3AED" className="mt-10" />;
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Welcome to Nexora
          </p>

          <h1 className="gradient-title mt-4 text-5xl font-extrabold sm:text-6xl">
            Choose Your Role
          </h1>

          <p className="mt-5 text-lg text-muted-foreground">
            Select how you'd like to use Nexora.
            <br />
            You can change this later from your account settings.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* Candidate */}

          <button
            disabled={loading}
            onClick={() => handleRoleSelection("candidate")}
            className="group rounded-3xl border border-border bg-card p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <UserRound className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-3xl font-bold">Candidate</h2>

            <p className="mt-3 text-muted-foreground">
              Discover your next opportunity.
            </p>

            <ul className="mt-8 space-y-3 text-muted-foreground">
              <li>✓ Browse thousands of jobs</li>
              <li>✓ Save interesting opportunities</li>
              <li>✓ Track your applications</li>
              <li>✓ Build your career</li>
            </ul>
          </button>

          {/* Recruiter */}

          <button
            disabled={loading}
            onClick={() => handleRoleSelection("recruiter")}
            className="group rounded-3xl border border-border bg-card p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <BriefcaseBusiness className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-3xl font-bold">Recruiter</h2>

            <p className="mt-3 text-muted-foreground">
              Find the best talent faster.
            </p>

            <ul className="mt-8 space-y-3 text-muted-foreground">
              <li>✓ Post unlimited jobs</li>
              <li>✓ Manage applications</li>
              <li>✓ Hire top candidates</li>
              <li>✓ Grow your team</li>
            </ul>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Onboarding;
