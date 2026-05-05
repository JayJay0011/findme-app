import Navbar from "@/components/Navbar";
import { properties } from "@/lib/properties";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-[#111827]">Admin panel</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Review listings, landlord verification, users, and reports.
        </p>

        <section className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5">
            <h2 className="text-lg font-black text-[#111827]">Listing approvals</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-gray-50 text-xs font-black uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-3">Property</th>
                  <th className="px-5 py-3">Landlord</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td className="px-5 py-4">
                      <p className="font-black text-[#111827]">{property.title}</p>
                      <p className="mt-1 text-gray-600">{property.location}</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-gray-700">
                      {property.landlord.name}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-black text-[#16A34A]">
                        {property.verified ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="rounded-md bg-[#16A34A] px-3 py-2 text-xs font-black text-white">
                          Approve
                        </button>
                        <button className="rounded-md border border-gray-200 px-3 py-2 text-xs font-black text-gray-700">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
