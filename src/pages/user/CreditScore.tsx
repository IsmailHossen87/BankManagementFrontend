import { TfiMoney } from "react-icons/tfi";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/layout/Footer";
import { useGetPersonalQuery, useLoanRequestMutation } from "@/redux/info/personalData";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function CreditScore() {
  const [loanRequest] = useLoanRequestMutation(undefined)
  const { data: creditScore } = useGetPersonalQuery(undefined);
  const navigate = useNavigate()


  const score = creditScore?.data?.[0];


  const [loanAmount, setLoanAmount] = useState("");
  const [agree, setAgree] = useState(false);

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



  const handleSubmit = async () => {
    try {

      const res = await loanRequest({ loanAmount: Number(loanAmount) }).unwrap();
      toast.success("Loan Request Successfully");
      navigate("/")
    } catch (error) {
      toast.error("Loan Request Failed");
    }
  };



  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Top grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex  justify-between items-center">
            <h2 className="text-lg font-semibold mb-2">Your Credit Score</h2>
            <p className="text-sm text-gray-500 mb-4">Updated today</p>
          </div>

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
          <div className="flex flex-col items-center ">
            <p><TfiMoney className="text-4xl bg-gray-300 p-2 rounded-full"  /></p>
            <p className="text-2xl text-center font-bold mb-2">
              FCFA {suggestedLimit.toLocaleString()}
            </p>
            <p className="text-sm text-center text-gray-500 mb-4">
              Based on your credit score of {percentage}/100
            </p>
          </div>

          {/* Ranges */}
          <div className="border rounded-lg p-3 mb-4">
            <p className="text-sm font-semibold">Credit Limit Ranges</p>
            <div className="flex justify-between text-sm mt-2">
              <span>Excellent (80–100)</span> <span>FCFA 100,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Good (60–79)</span> <span>FCFA  50,000 </span>
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
            <input type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4" />
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
          <Button
            className="flex text-end"
            onClick={handleSubmit}
            disabled={!agree || !loanAmount}
          >
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
          <p className="font-bold">FCFA {score.financialData.annualIncome}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Value of Land ownership</p>
          <p className="font-bold">FCFA {score.financialData.landOwnershipValue}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Debt-to-Income Ratio</p>
          <p className="font-bold">17/17</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow">
        {/* Header */}
        <div className="bg-gray-100 rounded-t-2xl px-6 py-4 font-bold text-gray-700">
          Recent Activity
        </div>

        {/* Items */}
        <div className="space-y-3 p-4">
          {/* Item 1 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-xl p-4 hover:shadow transition">
            <h1 className="flex items-center gap-2 text-sm sm:text-base">
              📊 Credit score calculated
            </h1>
            <span className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
              Today
            </span>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-xl p-4 hover:shadow transition">
            <h1 className="flex items-center gap-2 text-sm sm:text-base">
              👤 Profile information submitted
            </h1>
            <span className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
              Today
            </span>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-xl p-4 hover:shadow transition">
            <h1 className="flex items-center gap-2 text-sm sm:text-base">
              🆕 Account created
            </h1>
            <span className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
              Today
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
