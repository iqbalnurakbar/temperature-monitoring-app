import React from "react";
import UserPict from "../../assets/Iqbal.png";

export default function HeaderIcon() {
  return (
    <div className="mx-auto mb-10 mt-4 w-[85%]">
      <div className="flex items-center justify-end gap-2">
        <p className="text-right text-sm font-bold text-teal-800">
          Iqbal Nur Akbar
        </p>
        <img
          src={UserPict}
          alt="user"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
