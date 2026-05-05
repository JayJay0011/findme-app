import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-normal text-[#111827] sm:text-5xl lg:text-6xl">
            Find apartments directly from landlords.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Search verified homes, talk to landlords yourself, and avoid agent
            fees before you book a viewing.
          </p>

          <form
            action="/listings"
            className="mt-8 grid gap-3 rounded-lg border border-gray-200 bg-[#F9FAFB] p-3 shadow-sm sm:grid-cols-[1fr_auto]"
          >
            <label className="sr-only" htmlFor="hero-location">
              Search by location
            </label>
            <input
              id="hero-location"
              name="location"
              type="search"
              placeholder="Enter a location, for example Lekki"
              className="min-h-12 rounded-md border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
            />
            <button className="min-h-12 rounded-md bg-[#16A34A] px-6 text-sm font-extrabold text-white hover:bg-green-700">
              Search Listings
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-gray-600">
            <span className="rounded-md border border-gray-200 bg-white px-3 py-2">
              No agents
            </span>
            <span className="rounded-md border border-gray-200 bg-white px-3 py-2">
              Direct chat
            </span>
            <span className="rounded-md border border-gray-200 bg-white px-3 py-2">
              Verified landlords
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg bg-[#111827] shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
            alt="Bright apartment living room"
            width={1200}
            height={900}
            className="h-full min-h-[360px] w-full object-cover opacity-90"
            priority
          />
          <div className="absolute inset-x-4 bottom-4 rounded-lg bg-white p-4 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-gray-500">Featured today</p>
                <p className="mt-1 text-lg font-black text-[#111827]">
                  2 Bedroom Apartment in Lekki
                </p>
              </div>
              <p className="rounded-md bg-green-50 px-3 py-2 text-sm font-black text-[#16A34A]">
                Verified
              </p>
            </div>
            <Link
              href="/listings/lekki-2-bedroom-apartment"
              className="mt-4 inline-flex text-sm font-extrabold text-[#2563EB]"
            >
              View property
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
