import { FaBuilding } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";
import { GiFarmTractor } from "react-icons/gi";
import { MdEvent, MdOutlineEditCalendar } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const solutions = [
  {
    icon: <FaBuilding size={28} className="text-[#4B1E2F] group-hover:text-white transition-colors duration-300" />,
    title: "Building & Construction",
    description:
      "Specialized financing solutions for construction projects, equipment purchase, and property development with flexible terms tailored to project timelines.",
  },
  {
    icon: <SiBlockchaindotcom size={28} className="text-[#4B1E2F] group-hover:text-white transition-colors duration-300" />,
    title: "DeFi & Fintech",
    description:
      "Cutting-edge decentralized finance solutions combining traditional lending models with blockchain technology for faster, more secure transactions.",
  },
  {
    icon: <GiFarmTractor size={28} className="text-[#4B1E2F] group-hover:text-white transition-colors duration-300" />,
    title: "Agriculture",
    description:
      "Customized financing for farmers and agribusinesses, considering seasonal cash flows and providing loans for equipment, land acquisition, and operational costs.",
  },
  {
    icon: <MdEvent size={28} className="text-[#4B1E2F] group-hover:text-white transition-colors duration-300" />,
    title: "Event & Entertainment",
    description:
      "Short-term financing solutions for event organizers and entertainment companies, with quick approval processes and specialized risk assessment models.",
  },
  {
    icon: <FaDatabase size={28} className="text-[#4B1E2F] group-hover:text-white transition-colors duration-300" />,
    title: "Data & Technology",
    description:
      "Innovative financing for tech startups and data-driven companies, with IP-backed loan options and growth-focused lending solutions for scaling operations.",
  },
  {
    icon: <MdOutlineEditCalendar size={28} className="text-[#4B1E2F] group-hover:text-white transition-colors duration-300" />,
    title: "Need a Custom Solution?",
    description:
     `Don’t see your industry? We offer customized lending solutions
    tailored to your specific business needs.`,
  },
];

export default function IndustrySolutions() {
  return (
    <section className=" py-16 lg:mt-20 md:mt-10" >
      <div className=" px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#4B1E2F]">
            Our Industry Solutions
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            We provide specialized lending solutions across multiple industries,
            tailored to meet the unique needs of each sector
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group bg-white shadow-md p-6 rounded-xl transition-all duration-500 hover:bg-[#4B1E2F] hover:scale-[1.03]"
            >
              <div className="mb-4">{solution.icon}</div>
              <h3 className="font-semibold text-lg text-[#4B1E2F] group-hover:text-white transition-colors duration-300">
                {solution.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 group-hover:text-gray-200 transition-colors duration-300">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
