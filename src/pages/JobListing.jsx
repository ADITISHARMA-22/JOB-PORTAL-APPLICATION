// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/react";
// import { State } from "country-state-city";
// import { BarLoader } from "react-spinners";
// import useFetch from "@/hooks/usefetch";

// import JobCard from "@/components/jobCard";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { getCompanies } from "@/api/apiCompanies";
// import { getJobs } from "@/api/apiJobs";

// const JobListing = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [location, setLocation] = useState("");
//   const [company_id, setCompany_id] = useState("");

//   const { isLoaded } = useUser();

//   const {
//     // loading: loadingCompanies,
//     data: companies,
//     fn: fnCompanies,
//   } = useFetch(getCompanies);

//   const {
//     loading: loadingJobs,
//     data: jobs,
//     fn: fnJobs,
//   } = useFetch(getJobs, {
//     location,
//     company_id,
//     searchQuery,
//   });

//   useEffect(() => {
//     if (isLoaded) {
//       fnCompanies();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoaded]);

//   useEffect(() => {
//     if (isLoaded) fnJobs();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoaded, location, company_id, searchQuery]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     let formData = new FormData(e.target);

//     const query = formData.get("search-query");
//     if (query) setSearchQuery(query);
//   };

//   const clearFilters = () => {
//     setSearchQuery("");
//     setCompany_id("");
//     setLocation("");
//   };

//   if (!isLoaded) {
//     return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
//   }

//   return (
//     <div className="">
//       <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
//         Latest Jobs
//       </h1>
//       <form
//         onSubmit={handleSearch}
//         className="h-14 flex flex-row w-full gap-2 items-center mb-3"
//       >
//         <Input
//           type="text"
//           placeholder="Search Jobs by Title.."
//           name="search-query"
//           className="h-full flex-1  px-4 text-md"
//         />
//         <Button type="submit" className="h-full sm:w-28" variant="blue">
//           Search
//         </Button>
//       </form>

//       <div className="flex flex-col sm:flex-row gap-2">
//         <Select value={location} onValueChange={(value) => setLocation(value)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Filter by Location" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {State.getStatesOfCountry("IN").map(({ name }) => {
//                 return (
//                   <SelectItem key={name} value={name}>
//                     {name}
//                   </SelectItem>
//                 );
//               })}
//             </SelectGroup>
//           </SelectContent>
//         </Select>

//         <Select
//           value={company_id}
//           onValueChange={(value) => setCompany_id(value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Filter by Company" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {companies?.map(({ name, id }) => {
//                 return (
//                   <SelectItem key={name} value={id}>
//                     {name}
//                   </SelectItem>
//                 );
//               })}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//         <Button
//           className="sm:w-1/2"
//           variant="destructive"
//           onClick={clearFilters}
//         >
//           Clear Filters
//         </Button>
//       </div>

//       {loadingJobs && (
//         <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
//       )}

//       {loadingJobs === false && (
//         <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {jobs?.length ? (
//             jobs.map((job) => {
//               return (
//                 <JobCard
//                   key={job.id}
//                   job={job}
//                   savedInit={job?.saved?.length > 0}
//                 />
//               );
//             })
//           ) : (
//             <div>No Jobs Found 😢</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobListing;

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/react";
import { BarLoader } from "react-spinners";
import { Search, RotateCcw, MapPin, Building2 } from "lucide-react";

import useFetch from "@/hooks/usefetch";

import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";

const JobListing = () => {
  const { isLoaded } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompanyId] = useState("");

  const { data: companies, fn: fnCompanies } = useFetch(getCompanies);

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    setSearchQuery(formData.get("search-query"));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setCompanyId("");
  };

  // Get unique locations from fetched jobs
  const locations = useMemo(() => {
    if (!jobs) return [];

    return [...new Set(jobs.map((job) => job.location))].sort();
  }, [jobs]);

  if (!isLoaded) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  return (
    <section className="space-y-10 py-6">
      {/* Heading */}

      <div className="text-center space-y-3">
        <h1 className="gradient-title text-6xl sm:text-7xl font-extrabold">
          Latest Jobs
        </h1>

        <p className="text-muted-foreground text-lg">
          Discover your next opportunity from top companies.
        </p>
      </div>

      {/* Search */}

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />

          <Input
            name="search-query"
            placeholder="Search by job title..."
            className="pl-11 h-12 rounded-xl"
          />
        </div>

        <Button type="submit" size="lg" className="rounded-xl px-8">
          Search
        </Button>
      </form>

      {/* Filters */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="h-12 rounded-xl">
            <MapPin className="mr-2 h-4 w-4" />
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {locations.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={setCompanyId}>
          <SelectTrigger className="h-12 rounded-xl">
            <Building2 className="mr-2 h-4 w-4" />
            <SelectValue placeholder="All Companies" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {companies?.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="h-12 rounded-xl"
          onClick={clearFilters}
        >
          <RotateCcw size={18} className="mr-2" />
          Reset Filters
        </Button>
      </div>

      {/* Loader */}

      {loadingJobs && <BarLoader width={"100%"} color="#36d7b7" />}

      {/* Jobs */}

      {!loadingJobs && (
        <>
          {jobs?.length ? (
            <>
              <p className="text-sm text-muted-foreground">
                {jobs.length} job{jobs.length !== 1 && "s"} found
              </p>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    savedInit={job?.saved?.length > 0}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-2xl font-bold">No jobs found</h3>

              <p className="mt-2 text-muted-foreground">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default JobListing;
