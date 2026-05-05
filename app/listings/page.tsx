import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/lib/properties";

type ListingsPageProps = {
  searchParams: Promise<{
    location?: string;
    type?: string;
    maxPrice?: string;
    verified?: string;
  }>;
};

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const filters = await searchParams;
  const location = filters.location?.trim().toLowerCase() ?? "";
  const type = filters.type ?? "";
  const maxPrice = Number(filters.maxPrice || 0);
  const verifiedOnly = filters.verified === "on";

  const filteredProperties = properties.filter((property) => {
    const matchesLocation =
      !location || property.location.toLowerCase().includes(location);
    const matchesType = !type || property.type === type;
    const matchesPrice = !maxPrice || property.priceValue <= maxPrice;
    const matchesVerified = !verifiedOnly || property.verified;

    return matchesLocation && matchesType && matchesPrice && matchesVerified;
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-[#111827]">Apartment listings</h1>
          <p className="max-w-2xl text-gray-600">
            Filter direct landlord listings by location, price, property type,
            and verification status.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <form className="space-y-5">
              <div>
                <label className="text-sm font-black text-gray-800" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  defaultValue={filters.location}
                  placeholder="Lekki, Yaba, Ikeja"
                  className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2.5 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-black text-gray-800" htmlFor="type">
                  Property type
                </label>
                <select
                  id="type"
                  name="type"
                  defaultValue={filters.type}
                  className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Any type</option>
                  <option>Apartment</option>
                  <option>Mini flat</option>
                  <option>Studio</option>
                  <option>Duplex</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-black text-gray-800" htmlFor="maxPrice">
                  Max yearly price
                </label>
                <select
                  id="maxPrice"
                  name="maxPrice"
                  defaultValue={filters.maxPrice}
                  className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Any price</option>
                  <option value="1000000">Up to ₦1m</option>
                  <option value="2000000">Up to ₦2m</option>
                  <option value="4000000">Up to ₦4m</option>
                  <option value="6000000">Up to ₦6m</option>
                </select>
              </div>

              <label className="flex items-center gap-3 text-sm font-bold text-gray-700">
                <input
                  name="verified"
                  type="checkbox"
                  defaultChecked={verifiedOnly}
                  className="h-4 w-4 rounded border-gray-300 accent-[#16A34A]"
                />
                Verified listings only
              </label>

              <button className="w-full rounded-md bg-[#16A34A] px-4 py-3 text-sm font-black text-white hover:bg-green-700">
                Apply Filters
              </button>
            </form>
          </aside>

          <section>
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-gray-600">
                {filteredProperties.length} listings found
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {filteredProperties.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
                <h2 className="text-lg font-black text-[#111827]">
                  No listings match those filters.
                </h2>
                <p className="mt-2 text-gray-600">
                  Try a wider price range or remove the verified-only filter.
                </p>
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </>
  );
}
