export interface Venue {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  maxGuests: number;
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    long: number;
  };
  media: {
    url: string;
    alt?: string;
  }[];
}
