import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="flex font-sans py-5 items-center justify-between">
      <Image src="/logo.svg" width={20} height={20} alt="nav-logo" />

      <Link href="/login">
        <button className="bg-orange-400 px-4 py-1 rounded-full flex items-center gap-1">
          Sign in
          <FiArrowUpRight className="bg-white/40 text-lg text-white p-1 rounded-full" />
        </button>
      </Link>
    </nav>
  );
};
export default Navbar;
