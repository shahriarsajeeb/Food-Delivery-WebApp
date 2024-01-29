'use client';

import { Tooltip } from '@nextui-org/react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const RevenueChart = () => {
  const analyticsData = [
    {
      name: 'Page A',
      Count: 4000,
    },
    {
      name: 'Page B',
      Count: 3000,
    },
    {
      name: 'Page C',
      Count: 5000,
    },
    {
      name: 'Page D',
      Count: 1000,
    },
    {
      name: 'Page E',
      Count: 4000,
    },
    {
      name: 'Page F',
      Count: 800,
    },
    {
      name: 'Page G',
      Count: 200,
    },
  ];

  return (
    <div>
      <div className={'h-[90vh] w-full flex items-center justify-center'}>
        <div className={`w-[70%] h-[70%] flex items-center justify-center`}>
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <LineChart
              width={500}
              height={300}
              data={analyticsData}
              margin={{ 
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
