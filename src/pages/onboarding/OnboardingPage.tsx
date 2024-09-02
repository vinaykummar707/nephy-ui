import TopNavBar from "@/components/TopNavBar";
import TopNotificationBar from "@/components/TopNotificationBar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@/store/useUserStore.ts";
import Spinner from "@/components/Spinner.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HospitalOnboardingPage from "@/pages/onboarding/HospitalOnboardingPage.tsx";
import HospitalInformationForm from "@/components/HospitalInformationForm.tsx";
import CreateDialysisUnitForm from "@/components/CreateDialysisUnitForm.tsx";

const OnboardingPage = () => {
  const { user } = useUserStore();

  const [showHospitalOnboarding, setShowHospitalOnboarding] = useState(false);

  const navigate = useNavigate();

  const getHospitalsByUserId = async () => {
    const res = await axios.get(`http://localhost:3000/hospitals/${user?._id}`);
    return res.data;
  };

  const getDialysisUnitsByHospitalId = async () => {
    const res = await axios.get(
      `http://localhost:3000/dialysis-units/${hospitalData.data.hospitals[0]?._id}`,
    );
    return res.data;
  };

  const hospitalData = useQuery({
    queryKey: ["getHospitalsByUserId"],
    queryFn: getHospitalsByUserId,
    enabled: true,
  });

  const verifyHospital = () => {
    if (hospitalData.isSuccess) {
      if (hospitalData.data.hospitals.length == 0) {
        setShowHospitalOnboarding(true);
      } else {
        navigate("/home");
      }
    }
  };

  useEffect(() => {
    verifyHospital();
  }, [hospitalData.isSuccess, hospitalData.data]);

  return (
    <div className="h-screen overflow-hidden  w-screen flex flex-col">
      <div className="flex-initial flex flex-col">
        <TopNotificationBar />
        <TopNavBar />
      </div>
      {showHospitalOnboarding && <HospitalOnboardingPage />}
    </div>
  );
};

export default OnboardingPage;
