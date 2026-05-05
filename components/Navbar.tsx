import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="FindMe home">
          <Image
            src="/findme-logo.png"
            alt="FindMe an Apartment"
            width={44}
            height={44}
            className="h-11 w-11 rounded-md object-contain"
            priority
          />
          <div className="leading-tight">
            <p className="text-lg font-extrabold tracking-normal">
              <span className="text-[#16A34A]">Find</span>
              <span className="text-[#2563EB]">Me</span>
            </p>
            <p className="hidden text-xs font-semibold text-gray-500 sm:block">
              an Apartment
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-semibold text-gray-700 md:flex">
          <Link href="/listings" className="hover:text-[#16A34A]">
            Listings
          </Link>
          <Link href="/dashboard" className="hover:text-[#16A34A]">
            Dashboard
          </Link>
          <Link href="/messages" className="hover:text-[#16A34A]">
            Messages
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/auth"
            className="hidden rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 sm:inline-flex"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md bg-[#16A34A] px-4 py-2 text-sm font-bold text-white shadow-sm shadow-green-700/10 hover:bg-green-700"
          >
            List Property
          </Link>
        </div>
      </nav>
    </header>
  );
}
