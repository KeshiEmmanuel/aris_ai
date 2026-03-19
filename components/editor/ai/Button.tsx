// Use 'use client' for interactive components like buttons
"use client";
import * as React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  isPrimary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  isPrimary = true,
}) => {
  const baseClasses =
    "px-8 py-3 rounded-xl font-bold transition duration-300 shadow-md hover:shadow-lg";

  const primaryClasses = "bg-[#4F46E5] text-white hover:bg-indigo-700"; // Electric Indigo accent

  const secondaryClasses =
    "bg-transparent text-[#4F46E5] border border-[#4F46E5] hover:bg-indigo-50";

  const classes = `${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
};

export default Button;
