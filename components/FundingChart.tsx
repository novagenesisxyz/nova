'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface FundingChartProps {
  projectId: string;
}

export default function FundingChart({ projectId }: FundingChartProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const generateMockData = () => {
      const days = 30;
      const result = [];
      let cumulative = 10000;

      for (let i = days; i >= 0; i--) {
        const dailyIncrease = Math.random() * 15000 + 5000;
        cumulative += dailyIncrease;

        result.push({
          day: `Day ${30 - i}`,
          funding: Math.floor(cumulative),
          backers: Math.floor((30 - i) * 40 + Math.random() * 20),
          quadraticBonus: Math.floor(Math.sqrt(cumulative) * 50)
        });
      }

      return result;
    };

    setData(generateMockData());

    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        return [...prev.slice(1), {
          day: `Now`,
          funding: last.funding + Math.floor(Math.random() * 1000),
          backers: last.backers + Math.floor(Math.random() * 5),
          quadraticBonus: Math.floor(Math.sqrt(last.funding + 1000) * 50)
        }];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [projectId]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 backdrop-blur-lg border border-purple-500/30 rounded-lg p-3">
          <p className="text-white font-semibold">{payload[0].payload.day}</p>
          <p className="text-purple-400">Funding: ${payload[0].value.toLocaleString()}</p>
          <p className="text-blue-400">Backers: {payload[0].payload.backers}</p>
          <p className="text-green-400">QF Bonus: ${payload[0].payload.quadraticBonus}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-400" />
        <span className="text-sm text-gray-400">Real-time funding trajectory</span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="fundingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="day"
            stroke="#666"
            tick={{ fill: '#999', fontSize: 12 }}
          />
          <YAxis
            stroke="#666"
            tick={{ fill: '#999', fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="funding"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="url(#fundingGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">24h Change</p>
          <p className="text-lg font-semibold text-green-400">+12.5%</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Avg. Stake</p>
          <p className="text-lg font-semibold text-white">$285</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Velocity</p>
          <p className="text-lg font-semibold text-purple-400">High</p>
        </div>
      </div>
    </div>
  );
}
