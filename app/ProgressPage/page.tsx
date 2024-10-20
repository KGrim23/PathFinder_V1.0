import React from "react";

export default function ProgressPage() {
  const data = [
    { name: "Jan", progress: 30 },
    { name: "Feb", progress: 45 },
    { name: "Mar", progress: 60 },
    { name: "Apr", progress: 70 },
    { name: "May", progress: 85 },
    { name: "Jun", progress: 100 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Monthly Progress</h1>
      <div className="mt-4 space-y-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <span className="font-medium">{item.name}</span>
            {/* <ProgressBar progress={item.progress} /> */}
            <span className="ml-2">{item.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
