import Image from "next/image";
import Navbar from "@/components/Navbar";
import { properties } from "@/lib/properties";

export default function DashboardPage() {
  const landlordListings = properties.slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-black text-[#111827]">Landlord dashboard</h1>
            <p className="mt-2 max-w-2xl text-gray-600">
              Manage listings and add new apartments. Supabase will store these
              records once the project keys are configured.
            </p>
          </div>
          <p className="rounded-md bg-blue-50 px-3 py-2 text-sm font-black text-[#2563EB]">
            MVP workspace
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
          <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-5">
              <h2 className="text-lg font-black text-[#111827]">Your listings</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {landlordListings.map((property) => (
                <div key={property.id} className="flex gap-4 p-5">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    width={112}
                    height={96}
                    className="h-24 w-28 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-black text-[#111827]">{property.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{property.location}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                      <span className="rounded-md bg-gray-100 px-2.5 py-1">
                        {property.price}
                      </span>
                      <span className="rounded-md bg-green-50 px-2.5 py-1 text-[#16A34A]">
                        {property.verified ? "Verified" : "Pending verification"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-[#111827]">Add property</h2>
            <form className="mt-5 space-y-4">
              {[
                ["Title", "Modern 2 bedroom apartment"],
                ["Price", "3200000"],
                ["Location", "Lekki Phase 1, Lagos"],
              ].map(([label, placeholder]) => (
                <div key={label}>
                  <label className="text-sm font-black text-gray-800">{label}</label>
                  <input
                    placeholder={placeholder}
                    className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2.5 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ))}
              <div>
                <label className="text-sm font-black text-gray-800">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the apartment, amenities, and inspection terms."
                  className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2.5 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="text-sm font-black text-gray-800">Images</label>
                <input
                  type="file"
                  multiple
                  className="mt-2 w-full rounded-md border border-dashed border-gray-300 px-3 py-3 text-sm text-gray-600"
                />
              </div>
              <button className="w-full rounded-md bg-[#16A34A] px-4 py-3 text-sm font-black text-white hover:bg-green-700">
                Save Listing
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
