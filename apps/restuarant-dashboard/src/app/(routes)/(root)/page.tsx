import DashboardData from "../../../shared/modules/dashboard/dashboard.data";
import DashboardOverview from "../../../shared/modules/dashboard/dashboard.overview";

const Page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <DashboardOverview />
      <DashboardData />
    </div>
  );
};

export default Page;
