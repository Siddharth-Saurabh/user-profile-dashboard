import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const UserAnalytics = ({ data = [], title, type = "line" }) => {
  if (!data || data.length === 0) return null;

 
  const chartHeight = typeof window !== "undefined" && window.innerWidth < 640 ? 200 : 260;

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div style={{ width: "100%", height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#6366f1" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAnalytics;
