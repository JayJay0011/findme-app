import Link from "next/link";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { getFeaturedProperties } from "@/lib/properties";

export default function HomePage() {
  const featuredProperties = getFeaturedProperties();

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-black text-[#111827] sm:text-3xl">
                Featured verified listings
              </h2>
              <p className="mt-2 max-w-2xl text-gray-600">
                Start with landlords who have passed the FindMe verification
                layer.
              </p>
            </div>
            <Link
              href="/listings"
              className="text-sm font-extrabold text-[#2563EB]"
            >
              Browse all listings
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        <section className="border-y border-gray-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
            {[
              ["Tenants search", "Find apartments by location, price, type, and verification status."],
              ["Landlords list", "Add property details, photos, pricing, and verification documents."],
              ["Both talk directly", "Start a property-linked conversation without agent handoffs."],
            ].map(([title, text]) => (
              <div key={title}>
                <h3 className="text-lg font-black text-[#111827]">{title}</h3>
                <p className="mt-2 leading-7 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
