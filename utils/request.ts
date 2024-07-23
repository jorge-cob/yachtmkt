import { YachtProps } from '@/types';

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
// Fetch all yachts
async function fetchYachts({ showFeatured = false }: { showFeatured?: boolean } = {}): Promise<YachtProps[]> {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) return [];
    const res = await fetch(
      `${apiDomain}/yachts${showFeatured ? '/featured' : ''}`,
      { cache: 'no-store' }
    );
    if (!res.ok) throw new Error('Failed to fetch data');
    const data: YachtProps[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetch single yacht
async function fetchYacht(id: string): Promise<YachtProps | null> {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) return null;
    const res = await fetch(`${apiDomain}/yachts/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data: YachtProps = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchYachts, fetchYacht };