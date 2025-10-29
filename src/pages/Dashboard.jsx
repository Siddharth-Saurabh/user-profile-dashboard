import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/NavBar";
import UserCard from "../component/UserCard";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    
      <Navbar />

    
      {loading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <div className="flex flex-col items-center">
            {/* Tailwind spinner for loadinhg  effect */}
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-5 text-gray-600 text-sm font-medium animate-fadeIn">
              Fetching user data...
            </p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-800">
              User Profile Dashboard
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              View and manage user analytics, insights, and performance metrics
            </p>
            <div className="mt-6 w-24 h-1 mx-auto bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"></div>
          </div>

          {/* Content Card  */}
          <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl border border-gray-100 p-6 sm:p-10 transition-all duration-300">
            <div
              className="
                flex flex-wrap justify-center gap-8
                transition-all duration-300
              "
            >
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex-grow sm:flex-grow-0 sm:w-[45%] lg:w-[30%] xl:w-[22%] flex justify-center"
                >
                  <UserCard user={user} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-200 opacity-25 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-indigo-200 opacity-25 blur-3xl rounded-full"></div>
      </div>
    </div>
  );
};

export default Dashboard;
