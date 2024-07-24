'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import { YachtProps } from '@/types';
import profileDefault from '@/assets/images/profile.png'

const ProfilePage: React.FC = () => {

  const { data: session } = useSession();
  const profileImage = session?.user?.image as string | undefined;
  const profileName = session?.user?.name as string | undefined;
  const profileEmail = session?.user?.email as string | undefined;

  const [yachts, setYachts] = useState<YachtProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserYachts = async (userId: string | undefined) => {
      if (!userId) return;

      try {
        setLoading(true);
        const res = await fetch(`/api/yachts/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setYachts(data);
        }
      } catch (error) {
        console.error('Error fetching user yachts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserYachts(session?.user?.id);
  }, [session]);

  const handleDeleteYacht = async (yachtId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this yacht?');

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/yachts/${yachtId}`, { method: 'DELETE' });

      if (res.ok) {
        const updatedYachts = yachts.filter((yacht) => yacht._id !== yachtId);
        setYachts(updatedYachts);
        toast.success('Yacht deleted successfully');
      } else {
        toast.error('Failed to delete yacht');
      }
    } catch (error) {
      console.error('Error deleting yacht:', error);
      toast.error('Failed to delete yacht');
    }
  };

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>
              <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span> {profileName} </h2>
              <h2 className="text-2xl"><span className="font-bold block">Email: </span> {profileEmail} </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && yachts.length == 0 && (
                <p>You have no yachts listed</p>
              )}
              {loading ? <Spinner loading={loading} /> : (
                yachts.map((yacht) => (
                  <div className="mb-10" key={yacht._id}>
                  <Link href={`/yachts/${yacht._id}`}>
                    <Image
                      className="h-32 w-full rounded-md object-cover"
                      src={yacht.images[0]}
                      alt=''
                      width={500}
                      height={100}
                      priority={true}
                    />
                  </Link>
                  <div className="mt-2">
                    <p className="text-lg font-semibold">{yacht.name}</p>
                    <p className="text-gray-600">{yacht.description}</p>
                  </div>
                  <div className="mt-2">
                    <Link href={`/yachts/${yacht._id}/edit`}
                      className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                      type="button"
                      onClick={() => handleDeleteYacht(yacht._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default ProfilePage