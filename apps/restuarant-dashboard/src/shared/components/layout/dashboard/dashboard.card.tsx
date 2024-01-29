import { CircularProgress } from "@mui/material";

const DashboardCard = (props: DashboardCardType) => {
  const { title, icon, percentenge, amount, color } = props;

  return (
    <div className="md:w-[320px] xl:w-[420px] bg-[#111C42] rounded p-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <span className="md:text-3xl xl:text-4xl text-[#46CBA0]">{icon}</span>
          <h3 className="pt-3 text-2xl xl:text-3xl">{amount}</h3>
        </div>
        <div>
          <CircularProgress
            variant="determinate"
            value={100}
            size={50}
            color={color}
            thickness={4}
          />
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <h5 className="py-3 text-2xl xl:text-4xl text-[#46CBA0]">{title}</h5>
        <h6 className="text-2xl xl:text-4xl">{percentenge}</h6>
      </div>
    </div>
  );
};

export default DashboardCard;
