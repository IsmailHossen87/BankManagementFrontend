"use client";

import { Button } from "@/components/ui/button";
import { useGetPersonalQuery } from "@/redux/info/personalData";
import { useState } from "react";

export default function CreditScore() {
  const { data: creditScore } = useGetPersonalQuery(undefined);
  const score = creditScore?.data?.[0];

  const [loanAmount, setLoanAmount] = useState("");

  if (!score) return <p>Loading...</p>;

  const percentage = score.creditScore || 0;

  // Suggested Credit Limit calculation
  const getCreditLimit = (score: number) => {
    if (score >= 80) return 100000;
    if (score >= 60) return 50000;
    if (score >= 40) return 30000;
    if (score >= 0) return 10000;
    return 0;
  };

  const suggestedLimit = getCreditLimit(percentage);

  // Label by score range
  const getLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  const label = getLabel(percentage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Top grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Your Credit Score</h2>
          <p className="text-sm text-gray-500 mb-4">Updated today</p>

          {/* Gauge Chart */}
          <div className="flex flex-col items-center">
            <div className="relative w-74 h-36">
              <svg viewBox="0 0 36 20" className="w-full h-full">
                {/* Background semicircle */}
                <path
                  d="M2,18 A16,16 0 0,1 34,18"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Dynamic progress semicircle */}
                <path
                  d="M2,18 A16,16 0 0,1 34,18"
                  fill="none"
                  stroke={
                    percentage >= 80
                      ? "#56BC58"
                      : percentage >= 60
                        ? "#56BC58"
                        : percentage >= 40
                          ? "#56BC58"
                          : "red"
                  }
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * 50} 50`}
                />
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${percentage >= 80
                      ? "bg-green-100 text-green-700"
                      : percentage >= 60
                        ? "bg-blue-100 text-blue-700"
                        : percentage >= 40
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                    }`}
                >
                  {label}
                </span>
                <span className="lg:text-4xl md:text-2xl font-bold text-gray-800">
                  {percentage}
                </span>
              </div>
            </div>

            {/* Scale labels */}
            <div className="flex justify-between w-full px-6 mt-2 text-sm text-gray-600">
              <span>0</span>
              <span>100</span>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600 text-sm text-center max-w-md">
              Your credit score is in the {label} range. This indicates excellent
              creditworthiness.
            </p>
          </div>

          {/* Factors */}
          {/* Factors */}
          <div className="mt-6">
            <h3 className="font-semibold mb-4">Factors affecting your score</h3>
            <div className="space-y-4">
              {/* Annual Income */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Annual Income (FCFA)</span>
                  <span>30/30</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-full"></div>
                </div>
              </div>

              {/* Electricity bill */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Electricity bill (FCFA)</span>
                  <span>30/30</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-full"></div>
                </div>
              </div>

              {/* Mobile money Balance */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Mobile money Balance (FCFA)</span>
                  <span>30/30</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right side */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Suggested Credit Limit</h3>
          <p className="text-2xl font-bold mb-2">
            FCFA {suggestedLimit.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Based on your credit score of {percentage}/100
          </p>

          {/* Ranges */}
          <div className="border rounded-lg p-3 mb-4">
            <p className="text-sm font-semibold">Credit Limit Ranges</p>
            <div className="flex justify-between text-sm mt-2">
              <span>Excellent (80–100)</span> <span>FCFA 100,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Good (60–79)</span> <span>FCFA 50,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Fair (40–59)</span> <span>FCFA 30,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Poor (0–39)</span> <span>FCFA 10,000</span>
            </div>
          </div>

          {/* Loan form */}
          <label className="flex items-center space-x-2 mb-4">
            <input type="checkbox" className="h-4 w-4" />
            <span className="text-sm text-gray-600">
              I agree to share my data with partner financial institutions
            </span>
          </label>

          <input
            type="number"
            placeholder="Enter your amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
          />
          <Button className="flex text-end">
            Submit Application
          </Button>

          {/* Application Status */}
          <div className="mt-6 space-y-2">
            <p className="text-sm font-semibold">Application Status</p>
            <p className="text-green-600 text-sm">✔ Profile Complete</p>
            <p className="text-green-600 text-sm">✔ Score Generated</p>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Annual Income</p>
          <p className="font-bold">FCFA 500,000</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Value of Land ownership</p>
          <p className="font-bold">FCFA 2,000,010</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Debt-to-Income Ratio</p>
          <p className="font-bold">17/17</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>📊 Credit score calculated</span>
            <span>Today</span>
          </div>
          <div className="flex justify-between">
            <span>👤 Profile information submitted</span>
            <span>Today</span>
          </div>
          <div className="flex justify-between">
            <span>🆕 Account created</span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
