import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/properties";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/listings/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-gray-100">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          {property.verified ? (
            <span className="absolute left-3 top-3 rounded-md bg-white px-3 py-1 text-xs font-black text-[#16A34A] shadow-sm">
              Verified
            </span>
          ) : null}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-500">{property.location}</p>
            <h2 className="mt-1 line-clamp-2 text-lg font-black text-[#111827]">
              <Link href={`/listings/${property.slug}`}>{property.title}</Link>
            </h2>
          </div>
          <p className="whitespace-nowrap text-right text-lg font-black text-[#111827]">
            {property.price}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-gray-600">
          <span className="rounded-md bg-gray-100 px-2.5 py-1">{property.type}</span>
          <span className="rounded-md bg-gray-100 px-2.5 py-1">
            {property.bedrooms} beds
          </span>
          <span className="rounded-md bg-gray-100 px-2.5 py-1">
            {property.bathrooms} baths
          </span>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
          {property.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-sm font-semibold text-gray-500">
            By {property.landlord.name}
          </p>
          <Link
            href={`/listings/${property.slug}`}
            className="text-sm font-extrabold text-[#2563EB]"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
