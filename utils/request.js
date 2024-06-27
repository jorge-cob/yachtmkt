const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all yachts
async function fetchYachts() {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) return [];
    const res = await fetch(`${apiDomain}/yachts`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  };
};

// Fetch single yacht

async function fetchYacht(id) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) return null;
    const res = await fetch(`${apiDomain}/yachts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  };
};

export { fetchYachts, fetchYacht };
