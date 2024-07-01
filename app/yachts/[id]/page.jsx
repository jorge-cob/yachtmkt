'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchYacht } from '@/utils/request';
import YachtHeaderImage from '@/components/YachtHeaderImage';
import YachtDetails from '@/components/YachtDetails';
import YachtImages from '@/components/YachtImages';
import Spinner from '@/components/Spinner';
import { FaArrowLeft } from 'react-icons/fa';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from '@/components/ShareButton';
import YachtContactForm from '@/components/YachtContactForm';

const YachtPage = () => {
  const { id } = useParams();

  const [yacht, setYacht] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYachtData = async () => {
      if (!id) return;
      try {
        const yacht = await fetchYacht(id);
        setYacht(yacht);
      } catch (error) {
        console.error('Error fetching yacht:', error);
      } finally {
        setLoading(false);
      }
    };

    if (yacht === null) {
      fetchYachtData();
    }
  }, [id, yacht]);

  if (!yacht && !loading) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Yacht Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && yacht && (
        <>
          <YachtHeaderImage image={yacht.images[0]} />
          <section>
            <div className='container m-auto py-6 px-6'>
              <Link
                href='/yachts'
                className='text-blue-500 hover:text-blue-600 flex items-center'
              >
                <FaArrowLeft className='mr-2' /> Back to Yachts
              </Link>
            </div>
          </section>

          <section className='bg-blue-50'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                <YachtDetails yacht={yacht} />
                <aside className='space-y-4'>
                    <BookmarkButton yacht={yacht} />
                    <ShareButtons yacht={yacht} />
                    <YachtContactForm yacht={yacht} />
                </aside>              
              </div>
            </div>
          </section>
          <YachtImages images={yacht.images} />
        </>
      )}
    </>
  );
};
export default YachtPage;