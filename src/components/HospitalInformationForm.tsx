import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import useUserStore from "@/store/useUserStore.ts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import LabelError from "@/components/LabelError.tsx";
import { useEffect } from "react";
import Spinner from "@/components/Spinner.tsx";

const HospitalInformationForm = (props) => {
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
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HospitalRegistrationFormInputs>();

  const { user } = useUserStore();

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

  const { mutate, isPending } = useMutation({
    mutationFn: createHospital,
    onSuccess: (data: any) => {
      console.log("Item created:", data);
    },
    onError: (error: any) => {
      console.error("Error creating item:", error);
    },
  });

  const onSubmit: SubmitHandler<HospitalRegistrationFormInputs> = (data) => {
    console.log(data);
    data.createdBy = user?._id;
    mutate(data);
  };

  useEffect(() => {
    console.log(isPending);
  });

  return (
    <>
      {!isPending && (
        <div
          className="bg-white flex gap-6  flex-col border rounded-lg p-6  w-[4
        0%]"
        >
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
          </div>

          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </div>
      )}

      {isPending && (
        <div className="flex-1 flex justify-center gap-1 items-center flex-col">
          <Spinner />
          <div className="items-center flex flex-col space-y-0.5">
            <h1 className="text-sm text-neutral-900 font-semibold">Hold On</h1>
            <h1 className="text-xs text-neutral-400">
              We are creating your clinic
            </h1>
          </div>
        </div>
      )}
    </>
  );
};
export default HospitalInformationForm;
