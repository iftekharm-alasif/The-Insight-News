
import Image from "next/image";
import Navlinks from "./Navlinks";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="w-full">
      <nav className="max-w-7xl mx-auto bg-white">

        {/* Logo + Title + Date + Buttons */}
        <div className="relative flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3">

          {/* Logo + Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/5432bf97-d9a6-400b-8b0b-c48f25e773da.png"
              alt="The Insight Logo"
              width={60}
              height={60}
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
            />

            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                The Insight
              </h1>

              <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                {date}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="absolute right-2 sm:right-4 flex gap-1 sm:gap-2 md:gap-4">
            <button className="btn btn-sm sm:btn-md">
              সাইন ইন
            </button>

            <button className="btn btn-sm sm:btn-md btn-neutral btn-outline">
              সাইন আপ
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <Navlinks />
        
      </nav>
    </div>
  );
};

export default Navbar;