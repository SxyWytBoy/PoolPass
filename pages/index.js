
// pages/index.js
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const pools = [
  {
    id: 1,
    name: 'Luxury Hotel Pool',
    location: 'London',
    price: 25,
    description: 'Access to rooftop infinity pool with towels included.',
    type: 'Hotel Pool',
    image: '/images/luxury-pool.jpg',
    availableDates: ['2025-05-15', '2025-05-16'],
    rating: 4.5,
    amenities: ['Heated pool', 'Towels provided', 'Changing rooms', 'Food/drinks available', 'Wi-Fi', 'Parking'],
    addOns: ['Food packages', 'Day beds', 'Alcohol'],
    accessibility: ['Wheelchair access', 'Step-free access', 'Baby changing'],
    petFriendly: true,
    timeOfDay: ['Morning', 'Afternoon'],
    guests: 5,
    reviews: [
      { user: 'John Doe', comment: 'Amazing experience, highly recommended!', rating: 5 },
      { user: 'Jane Smith', comment: 'Lovely pool, but a bit crowded.', rating: 4 },
    ],
  },
  {
    id: 2,
    name: 'Countryside B&B Pool',
    location: 'Somerset',
    price: 15,
    description: 'Peaceful outdoor pool with countryside views.',
    type: 'Public Pool',
    image: '/images/countryside-pool.jpeg',
    availableDates: ['2025-05-14', '2025-05-18'],
    rating: 3.8,
    amenities: ['Loungers', 'Parking'],
    addOns: ['Kids area / family-friendly options'],
    accessibility: [],
    petFriendly: false,
    timeOfDay: ['Afternoon'],
    guests: 3,
    reviews: [
      { user: 'Alice Brown', comment: 'A relaxing place to unwind!', rating: 4 },
      { user: 'Bob White', comment: 'Great view, but the pool could be cleaner.', rating: 3 },
    ],
  },
  {
    id: 3,
    name: 'City Gym Pool',
    location: 'Manchester',
    price: 10,
    description: 'Indoor heated pool at modern fitness center.',
    type: 'Gym Pool',
    image: '/images/city-gym-pool.jpg',
    availableDates: ['2025-05-10', '2025-05-12'],
    rating: 4.2,
    amenities: ['Heated pool', 'Changing rooms', 'Wi-Fi'],
    addOns: [],
    accessibility: ['Step-free access'],
    petFriendly: false,
    timeOfDay: ['Evening'],
    guests: 2,
    reviews: [
      { user: 'Sarah Green', comment: 'Nice pool but a little too small for my liking.', rating: 3 },
      { user: 'Tom Clark', comment: 'Great for a quick swim after the gym!', rating: 5 },
    ],
  },
];

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🏊 Pool Pass</h1>
      <p>Find and book access to pools across the UK</p>
      <p>This is a placeholder: Full code with filters is available in your download.</p>
    </div>
  );
}
