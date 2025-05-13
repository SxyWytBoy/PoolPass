  {/* Basic Search Options */}
  <div className="basic-filters" style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
    {/* Location */}
    <input
      type="text"
      placeholder="Enter postcode, city, or area"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: '8px',
        width: '300px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        flexGrow: 1,
      }}
    />
    <button
      onClick={() => alert("Getting current location...")}
      style={buttonStyle}
    >
      📍 Use My Location
    </button>

    {/* Date Picker */}
    <input
      type="date"
      value={availableDate}
      onChange={(e) => setAvailableDate(e.target.value)}
      style={{
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
      }}
    />

    {/* Guests Selector */}
    <select
      value={guests}
      onChange={(e) => setGuests(parseInt(e.target.value))}
      style={{
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
      }}
    >
      {[...Array(10).keys()].map((num) => (
        <option key={num + 1} value={num + 1}>
          {num + 1} {num === 0 ? 'guest' : 'guests'}
        </option>
      ))}
      <option value={11}>10+ guests</option>
    </select>

    {/* Toggle Advanced Filters */}
    <button
      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
      style={buttonStyle}
    >
      {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
    </button>
  </div>

  {/* Advanced Filters */}
  {showAdvancedFilters && (
    <div
      className="advanced-filters"
      style={{
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Amenities */}
      <div>
        <strong>Amenities:</strong>
        {['Heated pool', 'Hot tub', 'Loungers', 'Towels provided', 'Changing rooms', 'Food/drinks available', 'Wi-Fi', 'Parking'].map((a) => (
          <label key={a} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              value={a}
              checked={amenities.includes(a)}
              onChange={handleAmenityChange}
            />{' '}
            {a}
          </label>
        ))}
      </div>

      {/* Pool Type */}
      <div>
        <strong>Pool Type:</strong>
        {['Hotel Pool', 'Private Pool', 'Airbnb-style', 'Indoor', 'Outdoor'].map((type) => (
          <label key={type} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={handleTypeChange}
            />{' '}
            {type}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div>
        <strong>Price Range (£):</strong>
        <input
          type="number"
          placeholder="Min"
          value={priceRange.min}
          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          style={{ width: '80px', marginRight: '5px' }}
        />
        -
        <input
          type="number"
          placeholder="Max"
          value={priceRange.max}
          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          style={{ width: '80px', marginLeft: '5px' }}
        />
      </div>

      {/* Time of Day */}
      <div>
        <strong>Time of Day:</strong>
        {['Morning', 'Afternoon', 'Evening'].map((t) => (
          <label key={t} style={{ marginRight: '10px' }}>
            <input
              type="radio"
              name="timeofday"
              value={t}
              checked={timeOfDay === t}
              onChange={() => setTimeOfDay(t)}
            />{' '}
            {t}
          </label>
        ))}
      </div>

      {/* Add-ons */}
      <div>
        <strong>Add-ons:</strong>
        {['Food packages', 'Day beds', 'Alcohol', 'Kids’ area'].map((addon) => (
          <label key={addon} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              value={addon}
              checked={addons.includes(addon)}
              onChange={handleAddonChange}
            />{' '}
            {addon}
          </label>
        ))}
      </div>

      {/* Accessibility */}
      <div>
        <strong>Accessibility:</strong>
        {['Wheelchair access', 'Step-free access', 'Baby changing'].map((item) => (
          <label key={item} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              value={item}
              checked={accessibility.includes(item)}
              onChange={handleAccessibilityChange}
            />{' '}
            {item}
          </label>
        ))}
      </div>

      {/* Pet Friendly */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={petFriendlyOnly}
            onChange={(e) => setPetFriendlyOnly(e.target.checked)}
          />{' '}
          Show pet-friendly pools only
        </label>
      </div>
    </div>
  )}

  {/* Display Pools */}
  <div>
    {filteredPools.map((pool) => (
      <div key={pool.id} className="card" style={{ marginBottom: '20px' }}>
        <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '15px' }}>
          <Image
            src={pool.image}
            alt={pool.name}
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: '10px' }}
          />
        </div>
        <h2>{pool.name}</h2>
        <p><strong>Location:</strong> {pool.location}</p>
        <p><strong>Price:</strong> {pool.price}</p>
        <p>{pool.description}</p>
        <p><strong>Rating:</strong> {renderRatingStars(pool.rating)}</p>
        <div>
          <strong>Reviews:</strong>
          {pool.reviews.map((review, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p><strong>{review.user}</strong>: {review.comment}</p>
              <p>{renderRatingStars(review.rating)}</p>
            </div>
          ))}
        </div>
        <Link href={`/pool/${pool.id}`}>
          <button style={{ ...buttonStyle, marginTop: '10px' }}>View Details</button>
        </Link>
      </div>
    ))}
  </div>

  <div style={{ marginTop: '30px', textAlign: 'center' }}>
    <Link href="/host">
      <button style={buttonStyle}>Host Your Pool</button>
    </Link>
  </div>
</div>
