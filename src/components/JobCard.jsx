// /* eslint-disable react/prop-types */
// import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
// import { Button } from "./ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Link } from "react-router-dom";
// import useFetch from "@/hooks/usefetch";
// import { deleteJob, saveJob } from "@/api/apiJobs";
// import { useUser } from "@clerk/react";
// import { useEffect, useState } from "react";
// import { BarLoader } from "react-spinners";

// const JobCard = ({
//   job,
//   savedInit = false,
//   onJobAction = () => {},
//   isMyJob = false,
// }) => {
//   const [saved, setSaved] = useState(savedInit);

//   const { user } = useUser();

//   const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
//     job_id: job.id,
//   });

//   const {
//     loading: loadingSavedJob,
//     data: savedJob,
//     fn: fnSavedJob,
//   } = useFetch(saveJob);

//   const handleSaveJob = async () => {
//     await fnSavedJob({
//       user_id: user.id,
//       job_id: job.id,
//     });
//     onJobAction();
//   };

//   const handleDeleteJob = async () => {
//     await fnDeleteJob();
//     onJobAction();
//   };

//   useEffect(() => {
//     if (savedJob !== undefined) setSaved(savedJob?.length > 0);
//   }, [savedJob]);

//   return (
//     <Card className="flex flex-col">
//       {loadingDeleteJob && (
//         <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
//       )}
//       <CardHeader className="flex">
//         <CardTitle className="flex justify-between font-bold">
//           {job.title}
//           {isMyJob && (
//             <Trash2Icon
//               fill="red"
//               size={18}
//               className="text-red-300 cursor-pointer"
//               onClick={handleDeleteJob}
//             />
//           )}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-4 flex-1">
//         <div className="flex justify-between">
//           {job.company && <img src={job.company.logo_url} className="h-6" />}
//           <div className="flex gap-2 items-center">
//             <MapPinIcon size={15} /> {job.location}
//           </div>
//         </div>
//         <hr />
//         {job.description.substring(0, job.description.indexOf("."))}.
//       </CardContent>
//       <CardFooter className="flex gap-2">
//         <Link to={`/job/${job.id}`} className="flex-1">
//           <Button variant="secondary" className="w-full">
//             More Details
//           </Button>
//         </Link>
//         {!isMyJob && (
//           <Button
//             variant="outline"
//             className="w-15"
//             onClick={handleSaveJob}
//             disabled={loadingSavedJob}
//           >
//             {saved ? (
//               <Heart size={20} fill="red" stroke="red" />
//             ) : (
//               <Heart size={20} />
//             )}
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };

// export default JobCard;

/* eslint-disable react/prop-types */

import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/usefetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/react";
import { useEffect, useMemo, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const { user } = useUser();

  const [saved, setSaved] = useState(savedInit);

  // Keep local state in sync with parent
  useEffect(() => {
    setSaved(savedInit);
  }, [savedInit]);

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  useEffect(() => {
    if (savedJob !== undefined) {
      setSaved(savedJob.length > 0 ? !saved : false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedJob]);

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });

    onJobAction();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  const shortDescription = useMemo(() => {
    if (!job.description) return "";

    const firstStop = job.description.indexOf(".");

    if (firstStop === -1) return job.description;

    return job.description.substring(0, firstStop + 1);
  }, [job.description]);

  return (
    <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {loadingDeleteJob && (
        <BarLoader className="mt-2" width={"100%"} color="#36d7b7" />
      )}

      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-4">
          <span>{job.title}</span>

          {isMyJob && (
            <Trash2Icon
              size={18}
              className="mt-1 cursor-pointer text-red-500 transition hover:scale-110 hover:text-red-600"
              onClick={handleDeleteJob}
              title="Delete Job"
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          {job.company && (
            <img
              src={job.company.logo_url}
              alt={job.company.name}
              className="h-7 object-contain"
            />
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPinIcon size={15} />
            <span>{job.location}</span>
          </div>
        </div>

        <hr />

        <p className="text-sm leading-6 text-muted-foreground">
          {shortDescription}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            <Heart
              size={20}
              fill={saved ? "red" : "none"}
              stroke={saved ? "red" : "currentColor"}
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
