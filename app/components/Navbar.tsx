import Image from "next/image";
import RealTimeClock from "./RealTimeClock";

function getNewYorkTime() {
  const now = new Date();

  // Format the time specifically for the New York timezone
  const nyTime = now.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Change to false if you prefer a 24-hour clock
  });

  return nyTime;
}

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full max-w-360 left-0 right-0 pt-5 mx-auto">
      <div className="flex justify-between">
        <Image src="/zendt.png" alt="Zendt logo" width={30} height={30} />
        <p>
          <RealTimeClock />
        </p>
        <button>Menu</button>
      </div>
    </nav>
  );
}
