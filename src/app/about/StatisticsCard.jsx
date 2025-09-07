import React from "react";

function StatisticsCard({ message, number, symbol: Icon, className, iconBg }) {
  return (
    <div
      className={`${className} flex flex-col items-center text-center py-6 rounded-2xl transition-all duration-300 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5`}
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${iconBg}`}
      >
        {Icon && <Icon className="w-8 h-8" />}
      </div>
      <div className="text-2xl md:text-3xl font-bold mb-1">{number}</div>
      <div className="text-sm md:text-base opacity-80">{message}</div>
    </div>
  );
}

export default StatisticsCard;
