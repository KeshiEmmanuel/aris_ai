import Image from "next/image";
import RealTimeClock from "./RealTimeClock";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full max-w-360 py-5 mx-auto">
      <div className="flex justify-between">
        <Image
          src="/zendt.png"
          alt="Zendt logo"
          className="rounded"
          width={30}
          height={30}
        />
        <div className="flex items-center gap-1 text-gray-700 text-sm">
          <RealTimeClock /> New York, USA
        </div>
        <button>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
