import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import useUserStore, { User } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
};

const RegisterHospitalPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const createAccount = async (data: any) => {
    const res = await axios.post(
      "http://localhost:3000/users",
      JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createAccount,
    onSuccess: (data: any) => {
      console.log("Item created:", data);
      setUser(data?.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/onboarding");
    },
    onError: (error: any) => {
      console.error("Error creating item:", error);
    },
  });

  useEffect(() => {
    console.log(isPending);
  }, [isPending]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    data.role = "hospitaladmin";
    mutate(data);
  };

  return (
    <div className="flex-1  flex flex-col items-center justify-center">
      <div className="w-[65%] flex flex-col  gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl w-[400px] tracking-tight font-extrabold">
              Create An Account To Manage Your Clinic
            </h1>
            <p className="text-neutral-500 tracking-normal  text-xs">
              Once you create your clinic account you can add multiple dialysis
              units inside it. And you can even do more like adding patients
              managing shifts,tracking dialysis .etc
            </p>
          </div>
        <div className="grid gap-2   grid-cols-2">
          {/* <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">First Name</Label>
            <Input
              {...register("firstName", { required: true })}
              placeholder=""
            ></Input>
            {errors.firstName?.type === "required" && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Last Name</Label>
            <Input
              {...register("lastName", { required: true })}
              placeholder=""
            ></Input>
            {errors.lastName?.type === "required" && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div> */}
          <div className="space-y-2 col-span-2">
            <Label className="text-muted-foreground text-sm">
              Clinic Email Address
            </Label>
            <Input
              {...register("email", { required: true })}
              placeholder=""
            ></Input>
            {errors.email?.type === "required" && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div className="space-y-1.5 col-span-2">
            <Label className="text-muted-foreground text-sm">Password</Label>
            <Input
              {...register("password", { required: true })}
              placeholder=""
              type="password"
            ></Input>
            {errors.password?.type === "required" && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
        </div>
        <Button onClick={handleSubmit(onSubmit)}>Continue</Button>
      </div>
    </div>
  );
};

export default RegisterHospitalPage;
