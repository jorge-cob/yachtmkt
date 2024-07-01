'use client';
import React, { useState, useEffect} from 'react'
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchYacht } from '@/utils/request';

const YachtEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    type: '',
    name: '',
    description: '',
    location: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
    beds: '',
    baths: '',
    feet: '',
    amenities: [],
    rates: {
      weekly: '',
      monthly: '',
      daily: '',
    },
    seller_info: {
      name: '',
      email: '',
      phone: '',
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Fetch yacht data for form
    const fetchYachtData = async () => {
      try {
        const yachtData = await fetchYacht(id);

        // Check rates for null, if so make empty string
        if(yachtData && yachtData.rates) {
          const defaultRates = {...yachtData.rates}
          for (const rate in defaultRates) {
            if(defaultRates[rate] === null) {
              defaultRates[rate] = '';
            }
          }
          yachtData.rates = defaultRates;
        }


        setFields(yachtData);
      } catch (error) {
        console.error('Error fetching yacht:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchYachtData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //Check if nested property
    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');
      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }))
    } else {
      // Not nested property
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };
  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;

    // Clone current array
    const updatedAmenities = [...fields.amenities]

    if (checked) {
      // Add value to array
      updatedAmenities.push(value)
    } else {
      // Remove value from array
      const index = updatedAmenities.indexOf(value);
      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }

    // Update state with updated array
    setFields((prevFields) => ({
      ...prevFields,
      amenities: updatedAmenities,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const res = await fetch(`/api/yachts/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (res.status === 200) {
        router.push(`/yachts/${id}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error('Permission denied');
      } else {
        toast.error('Failed to update yacht');
      }
    } catch (error) {
      toast.error('Error updating yacht:', error);
    }

  };

  return mounted && !loading &&
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl text-center font-semibold mb-6">
        Edit Yacht
      </h2>

      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-gray-700 font-bold mb-2"
          >Yacht Type</label
        >
        <select
          id="type"
          name="type"
          className="border rounded w-full py-2 px-3"
          required
          value={fields.type}
          onChange={handleChange}
        >
          <option value="Antique">Antique and Classic</option>
          <option value="Catamaran">Catamaran</option>
          <option value="Monohull">Centre Cockpit</option>
          <option value="Cruiser">Cruiser</option>
          <option value="Motorsailer">Motorsailer</option>
          <option value="Cutter">Cutter</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2"
          >Listing Name</label
        >
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful catamaran in Guadeloupe"
          required
          value={fields.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
          >Description</label
        >
        <textarea
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3"
          rows="4"
          placeholder="Add an optional description of your yacht"
          value={fields.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input
          type="text"
          id="street"
          name="location.street"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
          value={fields.location.street}
          onChange={handleChange}
        />
        <input
          type="text"
          id="city"
          name="location.city"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          required
          value={fields.location.city}
          onChange={handleChange}
        />
        <input
          type="text"
          id="state"
          name="location.state"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          required
          value={fields.location.state}
          onChange={handleChange}
        />
        <input
          type="text"
          id="zipcode"
          name="location.zipcode"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
          value={fields.location.zipcode}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <label htmlFor="beds" className="block text-gray-700 font-bold mb-2"
            >Beds</label
          >
          <input
            type="number"
            id="beds"
            name="beds"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.beds}
            onChange={handleChange}
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <label htmlFor="baths" className="block text-gray-700 font-bold mb-2"
            >Baths</label
          >
          <input
            type="number"
            id="baths"
            name="baths"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.baths}
            onChange={handleChange}
          />
        </div>
        <div className="w-full sm:w-1/3 pl-2">
          <label
            htmlFor="feet"
            className="block text-gray-700 font-bold mb-2"
            >Feet</label
          >
          <input
            type="number"
            id="feet"
            name="feet"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.feet}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2"
          >Amenities</label
        >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <input
              type="checkbox"
              id="amenity_music"
              name="amenities"
              value="music_equipment"
              className="mr-2"
              checked={fields.amenities.includes('music_equipment')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_music">Music equipment</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_kitchen"
              name="amenities"
              value="full_kitchen"
              className="mr-2"
              checked={fields.amenities.includes('full_kitchen')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_fishing"
              name="amenities"
              value="fishing_equipment"
              className="mr-2"
              checked={fields.amenities.includes('fishing_equipment')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_fishing">Fishing Equipment</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_sup"
              name="amenities"
              value="sup_board"
              className="mr-2"
              checked={fields.amenities.includes('sup_board')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_sup">Paddle Surf Boards</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_scuba"
              name="amenities"
              value="scuba_equipment"
              className="mr-2"
              checked={fields.amenities.includes('scuba_equipment')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_scuba">Scuba Diving Equipment</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hot_tub"
              name="amenities"
              value="hot_tub"
              className="mr-2"
              checked={fields.amenities.includes('hot_tub')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_tv"
              name="amenities"
              value="tv"
              className="mr-2"
              checked={fields.amenities.includes('tv')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_tv">TV</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_wheelchair_accessible"
              name="amenities"
              value="wheelchair_accessible"
              className="mr-2"
              checked={fields.amenities.includes('wheelchair_accessible')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_wheelchair_accessible">
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_barbeque"
              name="amenities"
              value="bbq"
              className="mr-2"
              checked={fields.amenities.includes('bbq')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_barbeque">Barbeque</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_internet"
              name="amenities"
              value="wifi"
              className="mr-2"
              checked={fields.amenities.includes('wifi')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_internet">WiFi</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_air_conditioning"
              name="amenities"
              value="air_conditioning"
              className="mr-2"
              checked={fields.amenities.includes('air_conditioning')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_coffee_maker"
              name="amenities"
              value="coffee_machine"
              className="mr-2"
              checked={fields.amenities.includes('coffee_machine')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_coffee_maker">Coffee Machine</label>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2"
          >Rates (Leave blank if not applicable)</label
        >
        <div
          className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
        >
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2">Weekly</label>
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              className="border rounded w-full py-2 px-3"
              value={fields.rates.weekly}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="monthly_rate" className="mr-2">Monthly</label>
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              className="border rounded w-full py-2 px-3"
              value={fields.rates.monthly}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="daily_rate" className="mr-2">Daily</label>
            <input
              type="number"
              id="daily_rate"
              name="rates.daily"
              className="border rounded w-full py-2 px-3"
              value={fields.rates.daily}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="seller_name"
          className="block text-gray-700 font-bold mb-2"
          >Seller Name</label
        >
        <input
          type="text"
          id="seller_name"
          name="seller_info.name"
          className="border rounded w-full py-2 px-3"
          placeholder="Name"
          value={fields.seller_info.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_email"
          className="block text-gray-700 font-bold mb-2"
          >Seller Email</label
        >
        <input
          type="email"
          id="seller_email"
          name="seller_info.email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address"
          required
          value={fields.seller_info.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_phone"
          className="block text-gray-700 font-bold mb-2"
          >Seller Phone</label
        >
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          className="border rounded w-full py-2 px-3"
          placeholder="Phone"
          value={fields.seller_info.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Edit Yacht
        </button>
      </div>
    </form>
}

export default YachtEditForm;
