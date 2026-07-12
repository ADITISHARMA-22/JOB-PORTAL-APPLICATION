// /* eslint-disable react/prop-types */
// import { Navigate, useLocation } from "react-router-dom";
// import { useUser } from "@clerk/react";

// const ProtectedRoute = ({ children }) => {
//   const { isSignedIn, isLoaded, user } = useUser();
//   const { pathname } = useLocation();

//   if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
//     return <Navigate to="/?sign-in=true" />;
//   }

//   if (
//     user !== undefined &&
//     !user?.unsafeMetadata?.role &&
//     pathname !== "/onboarding"
//   )
//     return <Navigate to="/onboarding" />;

//   return children;
// };

// export default ProtectedRoute;

/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/react";
import { BarLoader } from "react-spinners";
const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { pathname } = useLocation();

  // Wait until Clerk has loaded
  if (!isLoaded) {
    return (
      <div className="flex justify-center py-20">
        <BarLoader color="#7c3aed" />
      </div>
    );
  }

  // User is not authenticated
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  // Authenticated but role not selected
  if (!user?.unsafeMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
