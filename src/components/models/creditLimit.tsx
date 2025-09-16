import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const tiers = [
  {
    title: "Poor",
    limit: "0-39",
    amount: "10,000 FCFA",
    desc: "Basic credit limit with opportunities to improve your score",
    list: ["Limited borrowing capacity", "Higher interest rates"],
    color: "bg-red-50 border-red-300",
    limitColor: "bg-red-200 text-red-800",
    icons: <IoMdCheckmarkCircleOutline className="text-red-500" size={20} />,
  },
  {
    title: "Fair",
    limit: "40-59",
    amount: "30,000 FCFA",
    desc: "Moderate credit limit with standard terms",
    list: ["Reasonable borrowing capacity", "Standard interest rates"],
    color: "bg-yellow-50 border-yellow-300",
    limitColor: "bg-yellow-200 text-yellow-800",
    icons: <IoMdCheckmarkCircleOutline className="text-yellow-500" size={20} />,
  },
  {
    title: "Good",
    limit: "60-79",
    amount: "50,000 FCFA",
    desc: "Enhanced credit limit with preferential terms",
    list: ["Good borrowing capacity", "Competitive interest rates"],
    color: "bg-green-50 border-green-300",
    limitColor: "bg-green-200 text-green-800",
    icons: <IoMdCheckmarkCircleOutline className="text-green-500" size={20} />,
  },
  {
    title: "Excellent",
    limit: "80-100",
    amount: "100,000 FCFA",
    desc: "Maximum credit limit with premium benefits",
    list: ["Maximum borrowing capacity", "Lowest interest rates"],
    color: "bg-emerald-50 border-emerald-300",
    limitColor: "bg-emerald-200 text-emerald-800",
    icons: <IoMdCheckmarkCircleOutline className="text-emerald-500" size={20} />,
  },
];

export default function CreditLimitTiers() {
  return (
    <section className="py-12  text-center ">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Credit Limit Tiers</h2>
      <p className="text-gray-600 mb-8">
        Our system suggests credit limits based on your credit score range
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 px-6 gap-6">
        {tiers.map((tier, idx) => (
          <Card
            key={idx}
            className={`${tier.color} border rounded-xl shadow-sm hover:shadow-md transition`}
          >
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">{tier.title}</CardTitle>
              <span
                className={`${tier.limitColor} text-sm font-medium px-3 py-1 rounded-full`}
              >
                {tier.limit}
              </span>
            </CardHeader>

            <CardContent className="text-start">
              <p className="font-semibold text-xl mb-2">{tier.amount}</p>
              <p className="text-sm text-gray-700">{tier.desc}</p>
            </CardContent>

            <div className="border-t "></div>

            <div className="px-4 pb-2 text-left space-y-2">
              {tier.list.map((item, i) => (
                <p key={i} className="flex items-center gap-2 text-sm">
                  {tier.icons}
                  {item}
                </p>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
