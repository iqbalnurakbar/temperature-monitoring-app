import React from "react";

const SensorDuration = ({ duration }) => {
  return (
    <div>
      <div className="z-20 rounded-b-lg bg-[#27ab83] py-1 shadow-lg">
        <p className="text-center text-sm text-white">
          Durasi Mesin: {duration.hours} jam {duration.minutes} menit
        </p>
      </div>
    </div>
  );
};

export default SensorDuration;
