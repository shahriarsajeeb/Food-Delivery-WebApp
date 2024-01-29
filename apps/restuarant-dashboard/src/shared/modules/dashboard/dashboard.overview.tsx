'use client';
import { Icons } from '../../../utils/Icon';
import DashboardCard from '../../components/layout/dashboard/dashboard.card';

const DashboardOverview = () => {
  return (
    <div className="w-full flex items-center px-8 py-6 justify-between flex-wrap">
      <DashboardCard
        icon={Icons.overview}
        title="Sells Overview"
        color="success"
        percentenge="+24%"
        amount={'$2452'}
      />
      <DashboardCard
        icon={Icons.order}
        title="Total Orders"
        color="error"
        percentenge="-10%"
        amount={'210'}
      />
      <DashboardCard
        icon={Icons.reviews}
        title="Shop Reviews"
        color="success"
        percentenge="+2%"
        amount={'34'}
      />
    </div>
  );
};

export default DashboardOverview;
