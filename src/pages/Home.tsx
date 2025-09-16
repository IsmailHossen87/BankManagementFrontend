import CreditLimitTiers from "@/components/models/creditLimit";
import DiscoverCredit from "@/components/models/DiscoverCredit";
import HomePage from "@/components/models/HomePage";
import HowItWorks from "@/components/models/HowItWorks";
import IndustrySolutions from "@/components/models/IndustrySolution";

export default function Home() {
  return (
    <div >
      <HomePage/> 
     <div className="container mx-auto">
       <IndustrySolutions/>
      <CreditLimitTiers/>
      <HowItWorks/>
      <DiscoverCredit/>
     </div>
    </div>
  )
}
