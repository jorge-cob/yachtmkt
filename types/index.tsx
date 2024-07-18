export type YachtProps = {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description?: string;
  location: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
  beds: number;
  baths: number;
  feet: number;
  amenities: string[];
  rates: {
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
  images: string[];
  is_featured: boolean;
}
export type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
}