/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import useFetch from "@/hooks/usefetch";
import { applyToJob } from "@/api/apiApplication";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

import { BarLoader } from "react-spinners";

const schema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),

  experience: z
    .number({
      required_error: "Experience is required",
    })
    .min(0, {
      message: "Experience cannot be negative",
    })
    .int(),

  skills: z.string().min(1, {
    message: "Skills are required",
  }),

  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    required_error: "Please select your education",
  }),

  resume: z
    .any()
    .refine(
      (file) =>
        file?.[0] &&
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file[0].type),
      {
        message: "Only PDF or Word documents are allowed",
      },
    ),
});

export function ApplyJobDrawer({ user, job, fetchJob, applied = false }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      name: user?.fullName || "",
      experience: 0,
      skills: "",
      education: "",
    },
  });

  const {
    loading: loadingApply,
    error: errorApply,
    data: appliedData,
    fn: fnApply,
  } = useFetch(applyToJob);

  useEffect(() => {
    if (user?.fullName) {
      reset({
        name: user.fullName,
        experience: 0,
        skills: "",
        education: "",
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (appliedData?.length > 0) {
      fetchJob();
      setOpen(false);
    }
  }, [appliedData]);

  const onSubmit = async (data) => {
    await fnApply({
      job_id: job.id,
      candidate_id: user.id,
      name: data.name,
      experience: data.experience,
      skills: data.skills,
      education: data.education,
      status: "applied",
      resume: data.resume[0],
    });

    reset({
      name: user.fullName,
      experience: 0,
      skills: "",
      education: "",
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          variant={job?.isOpen && !applied ? "blue" : "destructive"}
          disabled={!job?.isOpen || applied}
        >
          {job?.isOpen
            ? applied
              ? "Already Applied"
              : "Apply Now"
            : "Hiring Closed"}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="mx-auto max-w-lg h-[88vh]">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Apply for {job?.title}</DrawerTitle>

          <DrawerDescription>
            Complete the application form below.
          </DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 px-6 overflow-y-auto pb-6"
        >
          {/* Name */}

          <div className="space-y-2">
            <Label>Full Name</Label>

            <Input placeholder="Enter your name" {...register("name")} />

            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Experience */}

          <div className="space-y-2">
            <Label>Years of Experience</Label>

            <Input
              type="number"
              placeholder="Years of experience"
              {...register("experience", {
                valueAsNumber: true,
              })}
            />

            {errors.experience && (
              <p className="text-red-500 text-sm">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Skills */}

          <div className="space-y-2">
            <Label>Skills</Label>

            <Input placeholder="React, Node, SQL..." {...register("skills")} />

            {errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills.message}</p>
            )}
          </div>

          {/* Education */}

          <div className="space-y-3">
            <Label>Highest Education</Label>

            <Controller
              control={control}
              name="education"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-3 rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Graduate" id="graduate" />
                    <Label htmlFor="graduate">Graduate</Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Post Graduate" id="postgraduate" />
                    <Label htmlFor="postgraduate">Post Graduate</Label>
                  </div>
                </RadioGroup>
              )}
            />

            {errors.education && (
              <p className="text-red-500 text-sm">{errors.education.message}</p>
            )}
          </div>
          {/* Resume */}

          <div className="space-y-2">
            <Label>Resume</Label>

            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              className="file:text-gray-500"
              {...register("resume")}
            />

            {errors.resume && (
              <p className="text-red-500 text-sm">{errors.resume.message}</p>
            )}
          </div>

          {/* API Error */}

          {errorApply?.message && (
            <p className="text-red-500 text-sm">{errorApply.message}</p>
          )}

          {/* Loader */}

          {loadingApply && <BarLoader width={"100%"} color="#36d7b7" />}

          <DrawerFooter className="px-6 pt-2 pb-6">
            <div className="flex justify-end gap-3">
              <DrawerClose asChild>
                <Button type="button" variant="outline" disabled={loadingApply}>
                  Cancel
                </Button>
              </DrawerClose>

              <Button type="submit" variant="blue" disabled={loadingApply}>
                {loadingApply ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
