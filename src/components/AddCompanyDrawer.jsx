// /* eslint-disable react/prop-types */
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import useFetch from "@/hooks/usefetch";
// import { addNewCompany } from "@/api/apiCompanies";
// import { BarLoader } from "react-spinners";
// import { useEffect } from "react";

// const schema = z.object({
//   name: z.string().min(1, { message: "Company name is required" }),
//   logo: z
//     .any()
//     .refine(
//       (file) =>
//         file[0] &&
//         (file[0].type === "image/png" || file[0].type === "image/jpeg"),
//       {
//         message: "Only Images are allowed",
//       },
//     ),
// });

// const AddCompanyDrawer = ({ fetchCompanies }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const {
//     loading: loadingAddCompany,
//     error: errorAddCompany,
//     data: dataAddCompany,
//     fn: fnAddCompany,
//   } = useFetch(addNewCompany);

//   const onSubmit = async (data) => {
//     fnAddCompany({
//       ...data,
//       logo: data.logo[0],
//     });
//   };

//   useEffect(() => {
//     if (dataAddCompany?.length > 0) {
//       fetchCompanies();
//     }
//   }, [loadingAddCompany]);

//   return (
//     <Drawer>
//       <DrawerTrigger>
//         <Button type="button" size="sm" variant="secondary">
//           Add Company
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <DrawerHeader>
//           <DrawerTitle>Add a New Company</DrawerTitle>
//         </DrawerHeader>
//         <form className="flex gap-2 p-4 pb-0">
//           {/* Company Name */}
//           <Input placeholder="Company name" {...register("name")} />

//           {/* Company Logo */}
//           <Input
//             type="file"
//             accept="image/*"
//             className=" file:text-gray-500"
//             {...register("logo")}
//           />

//           {/* Add Button */}
//           <Button
//             type="button"
//             onClick={handleSubmit(onSubmit)}
//             variant="destructive"
//             className="w-40"
//           >
//             Add
//           </Button>
//         </form>
//         <DrawerFooter>
//           {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//           {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
//           {errorAddCompany?.message && (
//             <p className="text-red-500">{errorAddCompany?.message}</p>
//           )}
//           {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}
//           <DrawerClose asChild>
//             <Button type="button" variant="secondary">
//               Cancel
//             </Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// };

// export default AddCompanyDrawer;

/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Upload } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useFetch from "@/hooks/useFetch";
import { addNewCompany } from "@/api/apiCompanies";

import { BarLoader } from "react-spinners";

const schema = z.object({
  name: z.string().min(1, {
    message: "Company name is required",
  }),

  logo: z
    .any()
    .refine(
      (file) =>
        file?.[0] &&
        ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(
          file[0].type,
        ),
      {
        message: "Please upload a PNG, JPG or SVG image",
      },
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const [selectedFile, setSelectedFile] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button type="button" size="sm" variant="secondary">
          Add Company
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a New Company</DrawerTitle>
        </DrawerHeader>

        <form className="flex flex-col gap-5 p-6 pt-2">
          {/* Company Name */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>

            <Input placeholder="e.g. Google" {...register("name")} />

            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Company Logo */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Company Logo</label>

            <label htmlFor="company-logo">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <span className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />

                  {selectedFile || "Upload Company Logo"}
                </span>
              </Button>
            </label>

            <Input
              id="company-logo"
              type="file"
              accept=".png,.jpg,.jpeg,.svg"
              className="hidden"
              {...register("logo", {
                onChange: (e) => {
                  setSelectedFile(e.target.files?.[0]?.name || "");
                },
              })}
            />

            <p className="text-xs text-muted-foreground">
              PNG, JPG, JPEG or SVG
            </p>

            {errors.logo && (
              <p className="text-sm text-red-500">{errors.logo.message}</p>
            )}
          </div>

          {errorAddCompany?.message && (
            <p className="text-sm text-red-500">{errorAddCompany.message}</p>
          )}

          {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="flex-1"
              disabled={loadingAddCompany}
            >
              {loadingAddCompany ? "Adding..." : "Add Company"}
            </Button>

            <DrawerClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </form>

        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
