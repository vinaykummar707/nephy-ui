import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import useUserStore from "@/store/useUserStore.ts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LabelError from "@/components/LabelError.tsx";
import { useEffect } from "react";
import Spinner from "@/components/Spinner.tsx";

const CreateDialysisUnitForm = (props) => {
  type HospitalRegistrationFormInputs = {
    hospitalId: string;
    unitName: string;
    description: string;
    createdBy: string;
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
      "http://localhost:3000/dialysis-units",
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
    mutate(data);
  };

  useEffect(() => {
    console.log(isPending);
  });

  return (
    <>
      {!isPending && (
        <div className="bg-white flex gap-4  flex-col border rounded-lg p-6  w-[35%]">
          <h1 className="text-lg font-bold">Create Your Dialysis Unit </h1>

          <div className="grid gap-3 grid-cols-2">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Unit Name</Label>
              <Input
                placeholder=""
                {...register("name", { required: true })}
              ></Input>
              {errors.unitName?.type === "required" && <LabelError />}
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">
                Description
              </Label>
              <Input
                placeholder=""
                {...register("branch", { required: true })}
              ></Input>
              {errors.description?.type === "required" && <LabelError />}
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
export default CreateDialysisUnitForm;
