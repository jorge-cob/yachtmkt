'use client';
import { useState, useEffect } from 'react';
import YachtCard from '@/components/YachtCard';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const SavedYachtsPage = () => {
  const [yachts, setYachts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedYachts = async () => {
      try {
        const res = await fetch('/api/bookmarks');

        if (res.status === 200) {
          const data = await res.json();
          setYachts(data);
        } else {
          console.log(res.statusText);
          toast.error('Failed to fetch saved yachts');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch saved yachts');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedYachts();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Yachts</h1>
        {yachts.length === 0 ? (
          <p>No saved yachts</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {yachts.map((yacht) => (
              <YachtCard key={yacht._id} yacht={yacht} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedYachtsPage;