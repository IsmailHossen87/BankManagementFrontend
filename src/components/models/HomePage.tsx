import Button from "./Button";
import image from "./../../assets/typingLaptop.jpg";

export default function HomePage() {
  return (
    <section className="bg-[#4B1E2F] md:py-16 py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Content */}
        <div className="space-y-6 text-white">
          <h1 className="text-2xl md:text-5xl font-bold leading-tight">
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
        <div className="flex justify-center md:justify-end">
          <img
            src={image}
            alt="Laptop Typing"
            className="rounded-xl shadow-lg max-h-80 w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
