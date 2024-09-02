import { SubmitHandler, useForm } from "react-hook-form";
import useUserStore from "@/store/useUserStore.ts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import LabelError from "@/components/LabelError.tsx";
import { Button } from "@/components/ui/button.tsx";
import Spinner from "@/components/Spinner.tsx";
import useHospitalStore from "@/store/useHospitalStore.ts";

const HospitalOnboardingPage = () => {
  type HospitalRegistrationFormInputs = {
    name: string;
    branch: string;
    address: string;
    pincode: string;
    phone: string;
    googleMapCoords: {
      latitude: number;
      longitude: number;
    };
    logo: string;
    createdBy: string;
    city: string;
    country: string;
    unitName: string;
    description: string;
    bedCount: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HospitalRegistrationFormInputs>();

  const { user } = useUserStore();
  const { setHospital } = useHospitalStore();

  const navigate = useNavigate();

  const createHospital = async (data: any) => {
    const res = await axios.post(
      "http://localhost:3000/hospitals",
      JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return res.data;
  };

  const createHospitalMutation = useMutation({
    mutationFn: createHospital,
    onSuccess: (data: any) => {
      console.log("Item created:", data);
      setHospital(data.result.hospital);
      navigate("/home");
    },
    onError: (error: any) => {
      console.error("Error creating item:", error);
    },
  });

  const onSubmit: SubmitHandler<HospitalRegistrationFormInputs> = (
    data: HospitalRegistrationFormInputs,
  ) => {
    console.log(data);
    data["createdBy"] = user?._id || "";
    createHospitalMutation.mutate(data);
  };

  return (
    <>
      <div className="flex-1 bg-neutral-100 p-8 overflow-auto items-center flex flex-col">
        <div className="flex gap-6 bg-white p-8 border w-[40%]  rounded-lg flex-col">
          <h1 className="text-lg font-bold">Enter Your Clinic Information</h1>

          <div className="grid gap-3 grid-cols-2">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">
                Clinic Name
              </Label>
              <Input
                placeholder=""
                {...register("name", { required: true })}
              ></Input>
              {errors.name?.type === "required" && <LabelError />}
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Branch</Label>
              <Input
                placeholder=""
                {...register("branch", { required: true })}
              ></Input>
              {errors.branch?.type === "required" && <LabelError />}
            </div>
            <div className="space-y-2 col-span-2">
              <Label className="text-muted-foreground text-sm">Address</Label>
              <Input
                placeholder=""
                {...register("address", { required: true })}
              ></Input>
              {errors.address?.type === "required" && <LabelError />}
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Latitude</Label>
              <Input
                placeholder=""
                {...register("googleMapCoords.latitude", { required: true })}
              ></Input>
              {errors.googleMapCoords?.latitude?.type === "required" && (
                <LabelError />
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Longitude</Label>
              <Input
                placeholder=""
                {...register("googleMapCoords.longitude", { required: true })}
              ></Input>
              {errors.googleMapCoords?.longitude?.type === "required" && (
                <LabelError />
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Phone</Label>
              <Input
                placeholder=""
                {...register("phone", { required: true })}
              ></Input>
              {errors.phone?.type === "required" && <LabelError />}
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Pincode</Label>
              <Input
                placeholder=""
                {...register("pincode", { required: true })}
              ></Input>
              {errors.pincode?.type === "required" && <LabelError />}
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">City</Label>
              <Input
                placeholder=""
                {...register("city", { required: true })}
              ></Input>
              {errors.city?.type === "required" && <LabelError />}
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Country</Label>
              <Input
                placeholder=""
                {...register("country", { required: true })}
              ></Input>
              {errors.country?.type === "required" && <LabelError />}
            </div>
            <h1 className="text-lg font-bold my-2  col-span-2">
              Add A Dialysis Unit
            </h1>
            <div className="space-y-2 col-span-2">
              <Label className="text-muted-foreground text-sm">Unit Name</Label>
              <Input
                placeholder=""
                {...register("unitName", { required: true })}
              ></Input>
              {errors.unitName?.type === "required" && <LabelError />}
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">
                Description
              </Label>
              <Input
                placeholder=""
                {...register("description", { required: true })}
              ></Input>
              {errors.description?.type === "required" && <LabelError />}
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">
                Beds Count
              </Label>
              <Input
                placeholder=""
                type={"number"}
                {...register("bedCount", { required: true })}
              ></Input>
              {errors.bedCount?.type === "required" && <LabelError />}
            </div>
          </div>

          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </div>
      </div>

      {/*{isPending && (*/}
      {/*  <div className="flex-1 flex justify-center gap-1 items-center flex-col">*/}
      {/*    <Spinner />*/}
      {/*    <div className="items-center flex flex-col space-y-0.5">*/}
      {/*      <h1 className="text-sm text-neutral-900 font-semibold">Hold On</h1>*/}
      {/*      <h1 className="text-xs text-neutral-400">*/}
      {/*        We are creating your clinic*/}
      {/*      </h1>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
};

export default HospitalOnboardingPage;
