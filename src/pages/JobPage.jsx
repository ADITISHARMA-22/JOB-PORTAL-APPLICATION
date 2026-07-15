// import { useEffect } from "react";
// import { BarLoader } from "react-spinners";
// import MDEditor from "@uiw/react-md-editor";
// import { useParams } from "react-router-dom";
// import { useUser } from "@clerk/react";
// import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ApplyJobDrawer } from "@/components/applyJob";
// import ApplicationCard from "@/components/ApplicationCard";

// import useFetch from "@/hooks/usefetch";
// import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";

// const JobPage = () => {
//   const { id } = useParams();
//   const { isLoaded, user } = useUser();

//   const {
//     loading: loadingJob,
//     data: job,
//     fn: fnJob,
//   } = useFetch(getSingleJob, {
//     job_id: id,
//   });

//   useEffect(() => {
//     if (isLoaded) fnJob();
//   }, [isLoaded]);

//   const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
//     updateHiringStatus,
//     {
//       job_id: id,
//     },
//   );

//   const handleStatusChange = (value) => {
//     const isOpen = value === "open";
//     fnHiringStatus(isOpen).then(() => fnJob());
//   };

//   if (!isLoaded || loadingJob) {
//     return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
//   }

//   return (
//     <div className="flex flex-col gap-8 mt-5">
//       <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
//         <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
//           {job?.title}
//         </h1>
//         <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
//       </div>

//       <div className="flex justify-between ">
//         <div className="flex gap-2">
//           <MapPinIcon /> {job?.location}
//         </div>
//         <div className="flex gap-2">
//           <Briefcase /> {job?.applications?.length} Applicants
//         </div>
//         <div className="flex gap-2">
//           {job?.isOpen ? (
//             <>
//               <DoorOpen /> Open
//             </>
//           ) : (
//             <>
//               <DoorClosed /> Closed
//             </>
//           )}
//         </div>
//       </div>

//       {job?.recruiter_id === user?.id && (
//         <Select onValueChange={handleStatusChange}>
//           <SelectTrigger
//             className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
//           >
//             <SelectValue
//               placeholder={
//                 "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
//               }
//             />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="open">Open</SelectItem>
//             <SelectItem value="closed">Closed</SelectItem>
//           </SelectContent>
//         </Select>
//       )}

//       <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
//       <p className="sm:text-lg">{job?.description}</p>

//       <h2 className="text-2xl sm:text-3xl font-bold">
//         What we are looking for
//       </h2>
//       <MDEditor.Markdown
//         source={job?.requirements}
//         className="bg-transparent sm:text-lg" // add global ul styles - tutorial
//       />
//       {job?.recruiter_id !== user?.id && (
//         <ApplyJobDrawer
//           job={job}
//           user={user}
//           fetchJob={fnJob}
//           applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
//         />
//       )}
//       {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
//       {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
//         <div className="flex flex-col gap-2">
//           <h2 className="font-bold mb-4 text-xl ml-1">Applications</h2>
//           {job?.applications.map((application) => {
//             return (
//               <ApplicationCard key={application.id} application={application} />
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobPage;

import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ApplyJobDrawer } from "@/components/applyJob";
import ApplicationCard from "@/components/ApplicationCard";

import useFetch from "@/hooks/useFetch";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const isCandidate = user?.unsafeMetadata?.role === "candidate";

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    },
  );

  useEffect(() => {
    if (isLoaded) {
      fnJob();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const handleStatusChange = async (value) => {
    const isOpen = value === "open";

    await fnHiringStatus(isOpen);
    await fnJob();
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const hasApplied = job?.applications?.some(
    (application) => application.candidate_id === user?.id,
  );

  return (
    <div className="mt-5 flex flex-col gap-8">
      <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
        <h1 className="gradient-title pb-3 text-4xl font-extrabold sm:text-6xl">
          {job?.title}
        </h1>

        <img
          src={job?.company?.logo_url}
          className="h-12 object-contain"
          alt={`${job?.company?.name || job?.title} logo`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-xl border bg-card/70 p-4">
          <MapPinIcon />
          <span>{job?.location}</span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border bg-card/70 p-4">
          <Briefcase />
          <span>{job?.applications?.length || 0} Applicants</span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border bg-card/70 p-4">
          {job?.isOpen ? <DoorOpen /> : <DoorClosed />}

          <span>{job?.isOpen ? "Open" : "Closed"}</span>
        </div>
      </div>

      {job?.recruiter_id === user?.id && (
        <div className="rounded-xl border bg-card/70 p-4">
          <p className="mb-3 font-semibold">Hiring Status</p>

          <Select
            value={job?.isOpen ? "open" : "closed"}
            onValueChange={handleStatusChange}
            disabled={loadingHiringStatus}
          >
            <SelectTrigger
              className={
                job?.isOpen
                  ? "border-green-500/40 bg-green-500/10"
                  : "border-red-500/40 bg-red-500/10"
              }
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="open">Open</SelectItem>

              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          {loadingHiringStatus && (
            <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
          )}
        </div>
      )}

      <section className="rounded-2xl border bg-card/70 p-6">
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">About the job</h2>

        <p className="leading-7 text-muted-foreground sm:text-lg">
          {job?.description}
        </p>
      </section>

      <section className="rounded-2xl border bg-card/70 p-6">
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
          What we are looking for
        </h2>

        <MDEditor.Markdown
          source={job?.requirements}
          className="bg-transparent sm:text-lg"
        />
      </section>

      {isCandidate && job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={hasApplied}
        />
      )}

      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <section className="flex flex-col gap-4">
          <h2 className="ml-1 text-2xl font-bold">
            Applications ({job.applications.length})
          </h2>

          {job.applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </section>
      )}
    </div>
  );
};

export default JobPage;
