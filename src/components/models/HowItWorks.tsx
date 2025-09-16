import { Card } from "@/components/ui/card";
import { UserPlus, FileText, BarChart, Handshake } from "lucide-react";

const steps = [
    {
        icon: <UserPlus className="w-10 h-10 text-[#4B1E2F]" />,
        title: "Create Account",
        desc: "Sign up and give basic information to start assessing your credit score."
    },
    {
        icon: <FileText className="w-10 h-10 text-[#4B1E2F]" />,
        title: "Fill Data Form",
        desc: "Provide financial information and background details to calculate your credit score."
    },
    {
        icon: <BarChart className="w-10 h-10 text-[#4B1E2F]" />,
        title: "Get Score & Limit",
        desc: "Receive your credit score and suggested credit limit instantly."
    },
    {
        icon: <Handshake className="w-10 h-10 text-[#4B1E2F]" />,
        title: "Connect with Lenders",
        desc: "Access loans with your credit score and recommended limit from lenders."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-12 text-center container mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">How It Works</h2>
            <p className="text-gray-600 mb-8">
                Get your credit score and suggested credit limit in just four simple steps
            </p>
            <div className="grid gap-6 sm:grid-cols-2 px-6 lg:grid-cols-4">
                {steps.map((step, idx) => (
                    <Card
                        key={idx}
                        className="p-6 flex flex-col  rounded-xl border shadow-sm 
                       hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="">{step.icon}</div>
                        <h3 className="text-lg text-start font-semibold ">{step.title}</h3>
                        <p className="text-sm text-start text-gray-600">{step.desc}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}
