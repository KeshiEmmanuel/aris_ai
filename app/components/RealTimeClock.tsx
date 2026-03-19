"use client"; // Required if using the App Router

import { useState, useEffect } from "react";

export default function RealTimeClock() {
  // 1. Store the time in state
  const [time, setTime] = useState(new Date());

  // 2. Track if the component has mounted to prevent hydration errors
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Component has mounted on the client
    setIsMounted(true);

    // 3. Set up an interval to update the state every 1000ms (1 second)
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 4. Cleanup function to stop the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Avoid rendering the time until the client has mounted to prevent
  // the server-time and client-time from clashing (hydration mismatch)
  if (!isMounted) {
    return <span>Loading time...</span>;
  }

  // Format the time however you prefer
  return (
    <div className="text-sm text-gray-700 font-medium">
      {time.toLocaleTimeString("en-US", {
        timeZone: "America/New_York", // Linking back to your previous NY time request!
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  );
}
