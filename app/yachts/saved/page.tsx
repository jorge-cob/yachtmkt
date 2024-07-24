'use client'

import { useState, useEffect } from 'react';
import YachtCard from '@/components/YachtCard';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import { YachtProps } from '@/types';


const SavedYachtsPage = (): JSX.Element => {
  const [yachts, setYachts] = useState<YachtProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSavedYachts = async (): Promise<void> => {
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

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Yachts</h1>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div>
            {yachts.length === 0 ? (
              <p>No saved yachts</p>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {yachts.map((yacht: YachtProps) => (
                  <YachtCard key={yacht._id} yacht={yacht} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedYachtsPage;