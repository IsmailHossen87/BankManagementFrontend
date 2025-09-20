import React, { useState } from "react";
import { FaUser, FaLock, FaCreditCard, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router"; // Link and NavLink from react-router-dom

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen justify-center md:p-4 -mt-4 ">
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Mobile Header and Overlay */}
        <header className="fixed top-0 left-0 w-full bg-white shadow md:hidden z-40 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Account Settings</h1>
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FaBars className="text-2xl text-gray-700" />
          </button>
        </header>

        {sidebarOpen && (
          <div
            className="fixed inset-0  bg-black bg-opacity-40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white p-6  border-r shadow-xl border-gray-200 transform transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:static md:flex-shrink-0 md:translate-x-0`}
        >
          {/* Profile Card */}
          <div className="pb-6 border-b border-gray-200 mb-6  text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg">
              JS
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">John Smith</h2>
              <p className="text-sm text-gray-500">john.smith@example.com</p>
            </div>
          </div>

          {/* Sidebar Links */}
          <nav className="space-y-2">
            <NavLink
              to="/dashboard/personal-info"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FaUser className="mr-3" />
              Personal Information
            </NavLink>

            <NavLink
              to="/dashboard/security"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FaLock className="mr-3" />
              Security
            </NavLink>

            <NavLink
              to="/dashboard/loan-status"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FaCreditCard className="mr-3" />
              Loan Status
            </NavLink>

            <Link
              to="/logout"
              className="flex items-center p-3 rounded-lg text-red-500 hover:bg-red-50 mt-8 transition"
            >
              <FaSignOutAlt className="mr-3" />
              Sign Out
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-4 md:p-8 pt-20 md:pt-8">
          {/* Page Header (Desktop) */}
          <div className="border-b border-dashed hidden md:block border-gray-300 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">⚙️ Account Settings</h1>
            <p className="text-gray-500 mt-2">
              Manage your account preferences and information
            </p>
          </div>

          {/* Personal Info Form */}
          <main className="flex-1">
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <FaUser className="mr-2 text-blue-600" />
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Smith"
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    defaultValue="(555) 123-4567"
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    defaultValue="123 Main Street"
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    defaultValue="New York"
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    defaultValue="NY"
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    defaultValue="10001"
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  Update Now
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
