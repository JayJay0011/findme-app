import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getPropertyBySlug, properties } from "@/lib/properties";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/listings" className="text-sm font-extrabold text-[#2563EB]">
            Back to listings
          </Link>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Image
                src={property.images[0]}
                alt={property.title}
                width={1200}
                height={900}
                className="aspect-[4/3] w-full rounded-lg object-cover sm:col-span-2"
              />
              {property.images.slice(1).map((image) => (
                <Image
                  key={image}
                  src={image}
                  alt={`${property.title} view`}
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full rounded-lg object-cover"
                />
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="font-bold text-gray-500">{property.location}</p>
                  <h1 className="mt-2 text-3xl font-black text-[#111827]">
                    {property.title}
                  </h1>
                </div>
                <p className="text-2xl font-black text-[#111827]">{property.price}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-sm font-bold text-gray-700">
                <span className="rounded-md bg-gray-100 px-3 py-2">{property.type}</span>
                <span className="rounded-md bg-gray-100 px-3 py-2">
                  {property.bedrooms} bedrooms
                </span>
                <span className="rounded-md bg-gray-100 px-3 py-2">
                  {property.bathrooms} bathrooms
                </span>
                {property.verified ? (
                  <span className="rounded-md bg-green-50 px-3 py-2 text-[#16A34A]">
                    Verified listing
                  </span>
                ) : null}
              </div>

              <p className="mt-6 max-w-3xl leading-8 text-gray-600">
                {property.description}
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-gray-500">Landlord</p>
            <h2 className="mt-1 text-xl font-black text-[#111827]">
              {property.landlord.name}
            </h2>
            <p className="mt-2 text-sm font-semibold text-gray-600">
              {property.landlord.responseTime}
            </p>
            <p className="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm font-black text-[#16A34A]">
              {property.landlord.verified ? "Verified landlord" : "Verification pending"}
            </p>

            <Link
              href="/messages"
              className="mt-6 flex w-full justify-center rounded-md bg-[#2563EB] px-4 py-3 text-sm font-black text-white hover:bg-blue-700"
            >
              Chat with landlord
            </Link>
            <Link
              href="/auth"
              className="mt-3 flex w-full justify-center rounded-md border border-gray-200 px-4 py-3 text-sm font-black text-gray-800 hover:bg-gray-50"
            >
              Save listing
            </Link>
          </aside>
        </section>
      </main>
    </>
  );
}
