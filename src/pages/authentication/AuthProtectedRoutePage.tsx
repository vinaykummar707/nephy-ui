// components/ProtectedRoute.tsx
import Spinner from "@/components/Spinner";
import useDialysisUnitStore from "@/store/useDialysisUnitStore";
import useHospitalStore, { Hospital } from "@/store/useHospitalStore";
import useUserStore from "@/store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AuthProtectedRoutePage: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const [show, setNotShow] = useState(false);

  const { user } = useUserStore();
  const { hospital, setHospital } = useHospitalStore();
  const { setActiveDialysisUnit, setDialysisUnits } = useDialysisUnitStore();

  const getHospitals = async () => {
    const res = await axios.get(`http://localhost:3000/hospitals/${user?._id}`);
    return res.data;
  };

  const getDialysisUnits = async () => {
    const res = await axios.get(
      `http://localhost:3000/dialysis-units/${hospital?._id}`
    );
    return res.data;
  };

  const { data: dialysisUnitsQuery, isError: dialysisUnitQueryError } =
    useQuery({
      queryKey: ["get dialysisUnits"],
      queryFn: getDialysisUnits,
      enabled: hospital ? true : false,
      staleTime: Infinity,
    });

  const { data: hospitalQuery, isError: hospitalQueryError } = useQuery({
    queryKey: ["get Hospital"],
    queryFn: getHospitals,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (hospitalQuery) {
      console.log(hospitalQuery);
      setHospital(hospitalQuery);
    }
    if (dialysisUnitsQuery) {
      console.log(dialysisUnitsQuery);
      setDialysisUnits(dialysisUnitsQuery);
      setActiveDialysisUnit(dialysisUnitsQuery[0]);
    }
  }, [hospitalQuery,dialysisUnitsQuery]);

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  // If the user is logged in, render the children components

  return (
    <>
      {" "}
      {true ? (
        children
      ) : (
        <>
          <div className="w-screen h-screen bg-neutral-100 flex justify-center items-center">
            <Spinner ttile={""} />
          </div>
        </>
      )}
    </>
  );
};

export default AuthProtectedRoutePage;
