import { Button } from "@/components/ui/button";

export default function DiscoverCredit() {
  return (
    <section className="py-12 bg-[#DBCBB9] lg:my-20 md:my-10 my-5 rounded-xl text-center shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Ready to discover your credit potential?</h2>
      <p className="text-gray-700 mb-6">
        Get your credit score and see what credit limit you qualify for. It’s quick, free, and completely transparent.
      </p>
      <Button size="lg" className="bg-[#4B1E2F] text-white hover:bg-purple-700">
        Get My Credit Score
      </Button>
    </section>
  );
}
