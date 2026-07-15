// import { useUser } from "@clerk/react";
// import ApplicationCard from "./ApplicationCard";
// import { useEffect } from "react";
// import { getApplications } from "@/api/apiApplication";
// import useFetch from "@/hooks/usefetch";
// import { BarLoader } from "react-spinners";

// const CreatedApplications = () => {
//   const { user } = useUser();

//   const {
//     loading: loadingApplications,
//     data: applications,
//     fn: fnApplications,
//   } = useFetch(getApplications, {
//     user_id: user.id,
//   });

//   useEffect(() => {
//     fnApplications();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (loadingApplications) {
//     return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
//   }

//   return (
//     <div className="flex flex-col gap-2">
//       {applications?.map((application) => {
//         return (
//           <ApplicationCard
//             key={application.id}
//             application={application}
//             isCandidate={true}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default CreatedApplications;

import { useEffect } from "react";
import { useUser } from "@clerk/react";
import { BarLoader } from "react-spinners";
import { BriefcaseBusiness } from "lucide-react";

import useFetch from "@/hooks/usefetch";
import { getApplications } from "@/api/apiApplication";

import ApplicationCard from "./ApplicationCard";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    if (user?.id) {
      fnApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  if (loadingApplications) {
    return <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />;
  }

  if (!applications?.length) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <BriefcaseBusiness size={48} className="mb-4 text-muted-foreground" />

        <h2 className="text-xl font-semibold">No Applications Yet</h2>

        <p className="mt-2 max-w-md text-muted-foreground">
          You haven't applied to any jobs yet. Start exploring opportunities and
          your applications will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          isCandidate
        />
      ))}
    </div>
  );
};

export default CreatedApplications;
