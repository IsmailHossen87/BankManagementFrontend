import Logo from "@/components/logo";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#4B1E2F] text-white">
      <div className="mx-auto container px-4 py-16 space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
          {/* Left: Logo + description */}
          <div className="flex flex-col">
            <div className="text-foreground">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
              cupiditate quae nam molestias.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="flex flex-col md:items-center">
            <ul className="mt-0 space-y-2 text-sm">
              <p className="font-medium text-xl mb-2">Quick Links</p>
              <li>
                <Link to={"/"} className="hover:opacity-75 transition">Home</Link>
              </li>
              <li>
                <Link to={"/about"} className="hover:opacity-75 transition">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col md:items-end">
            <ul className="mt-0 space-y-2 text-sm">
              <p className="font-medium text-xl mb-2">Contact Us</p>
              <li className="flex items-center gap-2">
                <SlLocationPin /> <span>123 Finance Street Douala, Cameroon</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone /> <span>+237 123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineMail /> <span>info@creditmatch.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border border-[#D9D9D94D]"></div>
        <div className="md:flex justify-between ">
             {/*left  */}
             <div className="flex  gap-1 items-center">
                © 2025 GUEHI AND CO. All rights reserved.
             </div>
             <div className="mt-4 md:mt-0 flex gap-1">
               <p>Privacy Policy </p>
               <p>Terms of Service </p>
             </div>
        </div>
      </div>
    </footer>
  );
}
