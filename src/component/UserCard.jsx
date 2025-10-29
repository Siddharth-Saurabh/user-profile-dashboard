import React from "react";
import { useNavigate } from "react-router-dom";
import { RiMailLine, RiPhoneLine, RiBuildingLine, RiMapPinLine, RiArrowRightSLine } from "react-icons/ri";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div
      onClick={() => navigate(`/user/${user.id}`)}
      className="
        group cursor-pointer relative overflow-hidden
        bg-white/70 backdrop-blur-xl border border-gray-200 
        hover:border-blue-500 transition-all duration-300
        rounded-2xl shadow-md hover:shadow-xl
        hover:-translate-y-1 hover:bg-white
        flex flex-col p-6 w-full max-w-sm
      "
    >
     
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-2xl rounded-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-5 relative z-10">
        <div className="relative">
          <img
            src={`https://i.pravatar.cc/150?img=${user.id}`}
            alt={user.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-blue-500 shadow-md object-cover"
          />
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 truncate">@{user.username}</p>
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-700 space-y-2 relative z-10">
        <div className="flex items-center gap-2">
          <RiMailLine className="text-blue-500 w-4 h-4" />
          <p className="truncate">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <RiPhoneLine className="text-blue-500 w-4 h-4" />
          <p className="truncate">{user.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <RiBuildingLine className="text-blue-500 w-4 h-4" />
          <p className="truncate">{user.company?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <RiMapPinLine className="text-blue-500 w-4 h-4" />
          <p className="truncate">{user.address?.city}</p>
        </div>
      </div>

      {/* Button */}
      <button
        className="
          mt-6 relative z-10 w-full py-2.5 
          bg-gradient-to-r from-blue-600 to-indigo-500 
          text-white font-semibold rounded-xl 
          flex items-center justify-center gap-1 
          hover:gap-2 hover:shadow-md 
          transition-all duration-300
        "
      >
        View Profile <RiArrowRightSLine className="w-5 h-5" />
      </button>
    </div>
  );
};

export default UserCard;
