import TopNavBar from "@/components/TopNavBar";
import TopNotificationBar from "@/components/TopNotificationBar";



const OnboardingPage = () => {

  return (
    <div className="h-screen  w-screen flex flex-col">
      <TopNotificationBar />
      <TopNavBar />
      <div className="flex-1 flex flex-col  bg-stone-100  px-16 py-8">
       
      </div>
    </div>
  );
};

export default OnboardingPage;
