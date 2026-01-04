import React, { useState } from "react";
import { ShieldCheck, Store, Users, Copy, CheckCircle, ChevronRight, Lock, User } from "lucide-react";

const AccessPortal = () => {
  // Demo Data for Roles
  const roles = [
    {
      id: 1,
      title: "Super Admin",
      roleType: "admin",
      description: "Platform ka main controller. Sabhi franchise owners aur users ko manage karta hai. Full system access hota hai.",
      username: "admin@gmail.com",
      password: "123456",
      icon: <ShieldCheck size={32} />,
      color: "bg-indigo-600",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200",
    },
    {
      id: 2,
      title: "Franchise Owner",
      roleType: "ram",
      description: "Apni franchise ke orders, menu aur staff ko manage karta hai. Sales aur reports dekh sakta hai.",
      username: "subadmin@gmail.com",
      password: "123456",
      icon: <Store size={32} />,
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      id: 3,
      title: "Staff / Customer",
      roleType: "user",
      description: "Food order karta hai, offers use karta hai aur order history dekh sakta hai.",
      username: "ram1@gmail.com",
      password: "123456",
      icon: <Users size={32} />,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
      borderColor: "border-amber-200",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Food<span className="text-indigo-600">Franchise</span> System
        </h1>
        <p className="text-black font-bold text-xl" >Note:-</p> 
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
         Yahan dikhaye gaye login ID aur passwords sirf project demonstration aur understanding purpose ke liye hain. Inka kisi bhi tarah ka galat ya unauthorized use na karein.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {roles.map((role) => (
          <CredentialCard key={role.id} role={role} />
        ))}
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto mt-16 text-center border-t border-slate-200 pt-8">
        <p className="text-slate-400 text-sm">
          © 2024 Food Franchise Management System. Secure Access Portal.
        </p>
      </div>
    </div>
  );
};

// Reusable Card Component
const CredentialCard = ({ role }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border ${role.borderColor} overflow-hidden flex flex-col`}
    >
      {/* Top Decoration Line */}
      <div className={`h-2 w-full ${role.color}`} />

      <div className="p-8 flex-1 flex flex-col">
        {/* Header: Icon & Title */}
        <div className="flex items-center justify-between mb-6">
          <div className={`p-3 rounded-xl ${role.lightColor} ${role.textColor}`}>
            {role.icon}
          </div>
          {role.roleType === "admin" && (
            <span className="px-3 py-1 text-xs font-bold text-white bg-indigo-600 rounded-full uppercase tracking-wider shadow-sm">
              Admin Access
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-2">{role.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
          {role.description}
        </p>

        {/* Credentials Box */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:border-indigo-100 transition-colors">
          <div className="space-y-3">
            {/* Username Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-hidden">
                <User size={16} className="text-slate-400 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700 truncate">
                  {role.username}
                </span>
              </div>
            </div>

            {/* Password Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock size={16} className="text-slate-400" />
                <span className="text-sm font-family-mono text-slate-700">
                  •••••••
                </span>
              </div>
              <button
                onClick={() => handleCopy(role.password)}
                className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                title="Copy Password"
              >
                {copied ? (
                  <>
                    <CheckCircle size={14} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy Pass
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className={`mt-6 w-full py-3 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95 ${role.color}`}>
          Login as {role.title.split(' ')[0]} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default AccessPortal;