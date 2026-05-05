export type Property = {
  id: string;
  slug: string;
  title: string;
  price: string;
  priceValue: number;
  location: string;
  type: "Apartment" | "Mini flat" | "Studio" | "Duplex";
  bedrooms: number;
  bathrooms: number;
  verified: boolean;
  description: string;
  images: string[];
  landlord: {
    name: string;
    responseTime: string;
    verified: boolean;
  };
};

export const properties: Property[] = [
  {
    id: "prop_001",
    slug: "lekki-2-bedroom-apartment",
    title: "Modern 2 Bedroom Apartment with Balcony",
    price: "₦3,200,000/yr",
    priceValue: 3200000,
    location: "Lekki Phase 1, Lagos",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    verified: true,
    description:
      "A bright apartment in a secure estate with steady water, fitted kitchen, balcony, and direct access to the landlord for inspection scheduling.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
    ],
    landlord: {
      name: "Tola Adeyemi",
      responseTime: "Replies within 1 hour",
      verified: true,
    },
  },
  {
    id: "prop_002",
    slug: "yaba-mini-flat-close-to-unilag",
    title: "Clean Mini Flat Close to UNILAG",
    price: "₦1,450,000/yr",
    priceValue: 1450000,
    location: "Yaba, Lagos",
    type: "Mini flat",
    bedrooms: 1,
    bathrooms: 1,
    verified: true,
    description:
      "Compact and well-maintained mini flat with prepaid meter, tiled floors, and easy access to major roads, shops, and transit.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    landlord: {
      name: "Musa Ibrahim",
      responseTime: "Replies same day",
      verified: true,
    },
  },
  {
    id: "prop_003",
    slug: "ikeja-studio-apartment",
    title: "Furnished Studio Apartment near Allen",
    price: "₦950,000/yr",
    priceValue: 950000,
    location: "Ikeja, Lagos",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    verified: false,
    description:
      "Simple furnished studio for one occupant with private bathroom, kitchenette, and quick access to Ikeja business districts.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1200&q=80",
    ],
    landlord: {
      name: "Chika Okafor",
      responseTime: "Replies within 3 hours",
      verified: false,
    },
  },
  {
    id: "prop_004",
    slug: "ajah-family-duplex",
    title: "Spacious 4 Bedroom Duplex for Family Living",
    price: "₦5,800,000/yr",
    priceValue: 5800000,
    location: "Ajah, Lagos",
    type: "Duplex",
    bedrooms: 4,
    bathrooms: 4,
    verified: true,
    description:
      "Large family duplex in a gated community with parking, visitor toilet, fitted kitchen, and direct landlord negotiation.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    ],
    landlord: {
      name: "Amina Bello",
      responseTime: "Replies within 2 hours",
      verified: true,
    },
  },
];

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}

export function getFeaturedProperties() {
  return properties.filter((property) => property.verified).slice(0, 3);
}
