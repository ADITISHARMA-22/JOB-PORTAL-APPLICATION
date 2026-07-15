// /* eslint-disable react/prop-types */
// import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { updateApplicationStatus } from "@/api/apiApplication";
// import useFetch from "@/hooks/usefetch";
// import { BarLoader } from "react-spinners";

// const ApplicationCard = ({ application, isCandidate = false }) => {
//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = application?.resume;
//     link.target = "_blank";
//     link.click();
//   };

//   const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
//     updateApplicationStatus,
//     {
//       job_id: application.job_id,
//     },
//   );

//   const handleStatusChange = (status) => {
//     fnHiringStatus(status).then(() => fnHiringStatus());
//   };

//   return (
//     <Card>
//       {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
//       <CardHeader>
//         <CardTitle className="flex justify-between font-bold">
//           {isCandidate
//             ? `${application?.job?.title} at ${application?.job?.company?.name}`
//             : application?.name}
//           <Download
//             size={18}
//             className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
//             onClick={handleDownload}
//           />
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-4 flex-1">
//         <div className="flex flex-col md:flex-row justify-between">
//           <div className="flex gap-2 items-center">
//             <BriefcaseBusiness size={15} /> {application?.experience} years of
//             experience
//           </div>
//           <div className="flex gap-2 items-center">
//             <School size={15} />
//             {application?.education}
//           </div>
//           <div className="flex gap-2 items-center">
//             <Boxes size={15} /> Skills: {application?.skills}
//           </div>
//         </div>
//         <hr />
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <span>{new Date(application?.created_at).toLocaleString()}</span>
//         {isCandidate ? (
//           <span className="capitalize font-bold">
//             Status: {application.status}
//           </span>
//         ) : (
//           <Select
//             onValueChange={handleStatusChange}
//             defaultValue={application.status}
//           >
//             <SelectTrigger className="w-52">
//               <SelectValue placeholder="Application Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="applied">Applied</SelectItem>
//               <SelectItem value="interviewing">Interviewing</SelectItem>
//               <SelectItem value="hired">Hired</SelectItem>
//               <SelectItem value="rejected">Rejected</SelectItem>
//             </SelectContent>
//           </Select>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };

// export default ApplicationCard;

/* eslint-disable react/prop-types */

import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { updateApplicationStatus } from "@/api/apiApplication";
import useFetch from "@/hooks/useFetch";
import { BarLoader } from "react-spinners";
import { useState } from "react";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const [status, setStatus] = useState(application.status);

  const handleDownload = () => {
    window.open(application.resume, "_blank");
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    },
  );

  const handleStatusChange = async (value) => {
    setStatus(value);

    try {
      await fnHiringStatus(value);
    } catch (error) {
      setStatus(application.status);
      console.error(error);
    }
  };

  const formattedDate = new Date(application.created_at).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg">
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}

      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">
              {isCandidate ? `${application?.job?.title}` : application?.name}
            </h2>

            {isCandidate && (
              <p className="text-sm text-muted-foreground mt-1">
                {application?.job?.company?.name}
              </p>
            )}
          </div>

          <button
            onClick={handleDownload}
            className="rounded-full bg-primary/10 p-2 hover:bg-primary hover:text-white transition"
          >
            <Download size={18} />
          </button>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-5">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="flex items-center gap-2 text-sm">
            <BriefcaseBusiness size={16} />
            <span>{application.experience} Years</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <School size={16} />
            <span>{application.education}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Boxes size={16} />
            <span className="truncate">{application.skills}</span>
          </div>
        </div>

        <hr />
      </CardContent>

      <CardFooter className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Applied on {formattedDate}
        </p>

        {isCandidate ? (
          <span
            className={`rounded-full px-4 py-1 text-sm font-semibold capitalize
              ${
                status === "applied"
                  ? "bg-blue-100 text-blue-700"
                  : status === "interviewing"
                    ? "bg-yellow-100 text-yellow-700"
                    : status === "hired"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
              }`}
          >
            {status}
          </span>
        ) : (
          <Select
            value={status}
            onValueChange={handleStatusChange}
            disabled={loadingHiringStatus}
          >
            <SelectTrigger className="w-52">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>

              <SelectItem value="interviewing">Interviewing</SelectItem>

              <SelectItem value="hired">Hired</SelectItem>

              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
