// pages/index.js
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const pools = [
  {
    id: 1,
    name: 'Luxury Hotel Pool',
    location: 'London',
    price: '£25',
    description: 'Access to rooftop infinity pool with towels included.',
    type: 'Luxury',
    image: '/images/luxury-pool.jpg',
    availableDates: ['2025-05-15', '2025-05-16'],
    rating: 4.5, // Add average rating
    reviews: [
      { user: 'John Doe', comment: 'Amazing experience, highly recommended!', rating: 5 },
      { user: 'Jane Smith', comment: 'Lovely pool, but a bit crowded.', rating: 4 },
    ],
  },
  {
    id: 2,
    name: 'Countryside B&B Pool',
    location: 'Somerset',
    price: '£15',
    description: 'Peaceful outdoor pool with countryside views.',
    type: 'Countryside',
    image: '/images/countryside-pool.jpg',
    availableDates: ['2025-05-14', '2025-05-18'],
    rating: 3.8, // Average rating
    reviews: [
      { user: 'Alice Brown', comment: 'A relaxing place to unwind!', rating: 4 },
      { user: 'Bob White', comment: 'Great view, but the pool could be cleaner.', rating: 3 },
    ],
  },
  {
    id: 3,
    name: 'City Gym Pool',
    location: 'Manchester',
    price: '£10',
    description: 'Indoor heated pool at modern fitness center.',
    type: 'Gym',
    image: '/images/city-gym-pool.jpg',
    availableDates: ['2025-05-10', '2025-05-12'],
    rating: 4.2,
    reviews: [
      { user: 'Sarah Green', comment: 'Nice pool but a little too small for my liking.', rating: 3 },
      { user: 'Tom Clark', comment: 'Great for a quick swim after the gym!', rating: 5 },
    ],
  },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [availableDate, setAvailableDate] = useState('');

  const filteredPools = pools.filter((pool) => {
    const matchesLocation = pool.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = type ? pool.type === type : true;
    const matchesDate = availableDate ? pool.availableDates.includes(availableDate) : true;
    return matchesLocation && matchesTy
