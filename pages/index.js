import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const mockPools = [
  {
    id: 1,
    name: 'The Lakeside Pool',
    location: 'Cotswolds',
    price: '£60/day',
    image: '/pool1.jpg',
    description: 'A serene outdoor pool by the lake, ideal for family retreats.',
    rating: 4.5,
    reviews: [
      { user: 'Alice', comment: 'Wonderful atmosphere!', rating: 5 },
      { user: 'Tom', comment: 'Very relaxing', rating: 4 },
    ],
    amenities: ['Heated pool', 'Wi-Fi', 'Parking'],
    type: 'Outdoor',
    petFriendly: true,
  },
  {
    id: 2,
    name: 'Luxury City Spa Pool',
    location: 'London',
    price: '£95/day',
    image: '/pool2.jpg',
    description: 'Private rooftop pool with sauna access in Central London.',
    rating: 4.8,
    reviews: [
      { user: 'Beth', comment: 'Top-tier spa facilities!', rating: 5 },
    ],
    amenities: ['Hot tub', 'Towels provided', 'Food/drinks available'],
    type: 'Indoor',
    petFriendly: false,
  },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [timeOfDay, setTimeOfDay] = useState('');
  const [addons, setAddons] = useState([]);
  const [accessibility, setAccessibility] = useState([]);
  const [petFriendlyOnly, setPetFriendlyOnly] = useState(false);

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleAddonChange = (e) => {
    const { value, checked } = e.target;
    setAddons((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleAccessibilityChange = (e) => {
    const { value, checked } = e.target;
    setAccessibility((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < Math.round(rating) ? '⭐' : '☆');
    }
    return stars.join('');
  };

  const buttonStyle = {
    padding: '8px 12px',
    borderRadius: '5px',
    border: '1px solid #0070f3',
    backgroundColor: '#0070f3',
    color: 'white',
    cursor: 'pointer',
  };

  const filteredPools = mockPools.filter((pool) => {
    const matchesSearch = pool.location.toLowerCase().includes(search.toLowerCase()) || pool.name.toLowerCase().includes(search.toLowerCase());
    const matchesAmenities = amenities.every((a) => pool.amenities.includes(a));
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(pool.type);
    const matc
