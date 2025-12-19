async function loadHotels() {
  try {
    const response = await fetch('data/hotels.json');
    const data = await response.json();
    displayHotels(data.hotels);
  } catch (error) {
    console.error('Error loading hotels:', error);
  }
}

function displayHotels(hotels) {
  const hotelCardsSection = document.querySelector('.hotel-cards');
  hotelCardsSection.innerHTML = hotels.map(hotel => `
    <div class="hotel-card">
      <div class="hotel-card__image">
        <img src="assets/img/${hotel.img}" alt="${hotel.name}" loading="lazy">
        <span class="hotel-card__rating">
          <i class="icon">⭐</i>
          ${hotel.rating}
        </span>
      </div>
      <div class="hotel-card__content">
        <h3 class="hotel-card__title">${hotel.name}</h3>
        <p class="hotel-card__location">
          <i class="icon">📍</i> ${hotel.location}
        </p>
        <div class="hotel-card__amenities">
          ${hotel.amenities.map(amenity => `
            <span><i class="icon">${amenity.icon}</i> ${amenity.name}</span>
          `).join('')}
        </div>
        <div class="hotel-card__price-review">
          <div class="hotel-card__price">
            <span class="price-label">From</span>
            <span class="price-amount">$${hotel.price}</span>
            <span class="price-period">per night</span>
          </div>
          <div class="hotel-card__reviews">
            <span>${hotel.reviews} reviews</span>
          </div>
        </div>
        <a href="hotel-page.html?id=${hotel.id}" class="hotel-card__cta">View Details</a>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', loadHotels);
