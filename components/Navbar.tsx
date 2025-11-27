import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="flex font-sans py-5 items-center justify-between">
      <div className="bg-black p-2 rounded">
        <Image src="/logo.svg" width={15} height={15} alt="nav-logo" />
      </div>

      <Link href="/login">
        <button className="bg-orange-300 font-sans px-4 py-1 rounded-full flex items-center gap-1 border border-white/20 text-sm">
          Sign in
          <FiArrowUpRight className="bg-white/30 text-lg text-white p-1 rounded-full" />
        </button>
      </Link>
    </nav>
  );
};
export default Navbar;
