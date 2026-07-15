// import { Link } from "react-router-dom";
// import Autoplay from "embla-carousel-autoplay";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "@clerk/react";

// import companies from "../data/companies.json";
// import faqs from "../data/faq.json";

// const LandingPage = () => {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoaded) return;

//     if (isSignedIn && !user?.unsafeMetadata?.role) {
//       navigate("/onboarding", { replace: true });
//     }
//   }, [isLoaded, isSignedIn, user, navigate]);
//   return (
//     <main className="flex flex-col gap-20 py-12">
//       {/* Hero */}

//       <section className="mx-auto flex max-w-5xl flex-col items-center text-center">
//         <span className="mb-6 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
//           🚀 Welcome to Nexora
//         </span>

//         <h1 className="gradient-title text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
//           Find Your
//           <br />
//           Dream Career
//         </h1>

//         <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
//           Explore thousands of opportunities from top companies and connect with
//           employers looking for exceptional talent.
//         </p>

//         <div className="mt-10 flex flex-wrap justify-center gap-5">
//           <Link to="/jobs">
//             <Button size="xl" variant="default">
//               Explore Jobs
//             </Button>
//           </Link>

//           <Link to="/post-job">
//             <Button size="xl" variant="outline">
//               Hire Talent
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Companies */}

//       <section>
//         <p className="mb-8 text-center text-sm uppercase tracking-[0.25em] text-muted-foreground">
//           Trusted by companies worldwide
//         </p>

//         <Carousel
//           plugins={[
//             Autoplay({
//               delay: 1800,
//             }),
//           ]}
//         >
//           <CarouselContent className="items-center">
//             {companies.map(({ id, path, name }) => (
//               <CarouselItem
//                 key={id}
//                 className="basis-1/3 md:basis-1/5 lg:basis-1/6"
//               >
//                 <img
//                   src={path}
//                   alt={name}
//                   className="mx-auto h-12 object-contain opacity-70 transition hover:opacity-100"
//                 />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </Carousel>
//       </section>

//       {/* Banner */}

//       <section>
//         <img
//           src="/banner.png"
//           alt="Nexora Banner"
//           className="w-full rounded-3xl border border-border shadow-2xl"
//         />
//       </section>

//       {/* Features */}

//       <section>
//         <div className="mb-10 text-center">
//           <h2 className="text-4xl font-bold">Everything You Need</h2>

//           <p className="mt-3 text-muted-foreground">
//             Whether you're looking for your next opportunity or your next hire.
//           </p>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2">
//           <Card className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl">
//             <CardHeader>
//               <CardTitle className="text-2xl">👨‍💼 Job Seekers</CardTitle>
//             </CardHeader>

//             <CardContent className="text-muted-foreground leading-7">
//               Search thousands of verified job openings, save your favorites,
//               track applications, and discover exciting career opportunities.
//             </CardContent>
//           </Card>

//           <Card className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl">
//             <CardHeader>
//               <CardTitle className="text-2xl">🏢 Employers</CardTitle>
//             </CardHeader>

//             <CardContent className="text-muted-foreground leading-7">
//               Post jobs, manage applicants, shortlist top candidates, and hire
//               the right talent faster.
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* FAQ */}

//       <section className="mx-auto w-full max-w-4xl">
//         <div className="mb-10 text-center">
//           <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>

//           <p className="mt-3 text-muted-foreground">
//             Everything you need to know about Nexora.
//           </p>
//         </div>

//         <Accordion type="single" collapsible className="space-y-5">
//           {faqs.map((faq, index) => (
//             <AccordionItem
//               key={index}
//               value={`item-${index}`}
//               className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur transition-all hover:border-primary/40 hover:shadow-lg"
//             >
//               <AccordionTrigger className="py-5 text-left text-lg font-semibold hover:no-underline">
//                 {faq.question}
//               </AccordionTrigger>

//               <AccordionContent className="border-t border-border/50 px-6 py-5 text-muted-foreground leading-7">
//                 {faq.answer}
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </section>
//     </main>
//   );
// };

// export default LandingPage;

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@clerk/react";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import companies from "../data/companies.json";
import faqs from "../data/faq.json";

const LandingPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && !user?.unsafeMetadata?.role) {
      navigate("/onboarding", { replace: true });
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  const isRecruiter = user?.unsafeMetadata?.role === "recruiter";
  const isCandidate = user?.unsafeMetadata?.role === "candidate";

  return (
    <main className="flex flex-col gap-20 py-12">
      {/* Hero */}

      <section className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <span className="mb-6 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
          🚀 Welcome to Nexora
        </span>

        <h1 className="gradient-title text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          Find Your
          <br />
          Dream Career
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
          Explore thousands of opportunities from top companies and connect with
          employers looking for exceptional talent.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          {!isSignedIn && (
            <>
              <Link to="/jobs">
                <Button size="xl" variant="default">
                  Explore Jobs
                </Button>
              </Link>

              <Link to="/post-job">
                <Button size="xl" variant="outline">
                  Hire Talent
                </Button>
              </Link>
            </>
          )}

          {isCandidate && (
            <>
              <Link to="/jobs">
                <Button size="xl" variant="default">
                  Explore Jobs
                </Button>
              </Link>

              <Link to="/my-jobs">
                <Button size="xl" variant="outline">
                  My Applications
                </Button>
              </Link>
            </>
          )}

          {isRecruiter && (
            <>
              <Link to="/post-job">
                <Button size="xl" variant="default">
                  Post a Job
                </Button>
              </Link>

              <Link to="/my-jobs">
                <Button size="xl" variant="outline">
                  My Posted Jobs
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Companies */}

      <section>
        <p className="mb-8 text-center text-sm uppercase tracking-[0.25em] text-muted-foreground">
          Trusted by companies worldwide
        </p>

        <Carousel
          plugins={[
            Autoplay({
              delay: 1800,
            }),
          ]}
        >
          <CarouselContent className="items-center">
            {companies.map(({ id, path, name }) => (
              <CarouselItem
                key={id}
                className="basis-1/3 md:basis-1/5 lg:basis-1/6"
              >
                <img
                  src={path}
                  alt={name}
                  className="mx-auto h-12 object-contain opacity-70 transition hover:opacity-100"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Banner */}

      <section>
        <img
          src="/banner.png"
          alt="Nexora Banner"
          className="w-full rounded-3xl border border-border shadow-2xl"
        />
      </section>

      {/* Features */}

      <section>
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">Everything You Need</h2>

          <p className="mt-3 text-muted-foreground">
            Whether you're looking for your next opportunity or your next hire.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">👨‍💼 Job Seekers</CardTitle>
            </CardHeader>

            <CardContent className="leading-7 text-muted-foreground">
              Search thousands of verified job openings, save your favorites,
              track applications, and discover exciting career opportunities.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">🏢 Employers</CardTitle>
            </CardHeader>

            <CardContent className="leading-7 text-muted-foreground">
              Post jobs, manage applicants, shortlist top candidates, and hire
              the right talent faster.
            </CardContent>
          </Card>
        </div>
      </section>
      {/* FAQ */}

      <section className="mx-auto w-full max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>

          <p className="mt-3 text-muted-foreground">
            Everything you need to know about Nexora.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-5">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <AccordionTrigger className="py-5 text-left text-lg font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="border-t border-border/50 px-6 py-5 leading-7 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
};

export default LandingPage;
