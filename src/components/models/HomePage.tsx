import Button from "./Button";
import image from "./../../assets/typingLaptop.jpg";

export default function HomePage() {
  return (
    <section className="bg-[#4B1E2F] py-8 lg:py-16 md:py-14 relative">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Content */}
        <div className="space-y-6 text-white">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
            Revolutionizing{" "}
            <span className="text-[#DBCBB9]">Lending Solutions</span>
          </h1>

          <p className="text-base md:text-lg text-gray-200 max-w-lg">
            Our platform helps clients get fair credit ratings and connects them
            with trusted lenders for faster, more transparent lending decisions
            across multiple industries.
          </p>

          <Button />
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:py-10 md:justify-end">
          <img
            src={image}
            alt="Laptop Typing"
            className="rounded-xl shadow-lg max-h-80 md:max-h-[28rem] w-full object-cover"
          />
        </div>
      </div>

      {/* Stats Box */}
      <div className="hidden md:flex flex-wrap justify-center md:justify-between bg-white w-11/12 max-w-6xl mx-auto rounded-xl absolute left-1/2 transform -translate-x-1/2 top-full md:-mt-15 shadow-md py-6 px-4">
        <div className="flex-1 text-center px-4 py-2 min-w-[120px]">
          <h1 className="font-bold text-xl text-[#063668]">10K+</h1>
          <p className="text-gray-600">Active Users</p>
        </div>
        <div className="flex-1 text-center px-4 py-2 min-w-[120px]">
          <h1 className="font-bold text-xl text-[#063668]">$250M+</h1>
          <p className="text-gray-600">Loan Facilitated</p>
        </div>
        <div className="flex-1 text-center px-4 py-2 min-w-[120px]">
          <h1 className="font-bold text-xl text-[#063668]">98%</h1>
          <p className="text-gray-600">Client Satisfaction</p>
        </div>
        <div className="flex-1 text-center px-4 py-2 min-w-[120px]">
          <h1 className="font-bold text-xl text-[#063668]">5</h1>
          <p className="text-gray-600">Industry Verticals</p>
        </div>
      </div>
    </section>
  );
}
