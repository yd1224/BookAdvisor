async function loadHotelDetails() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id');
    
    if (!hotelId) {
      throw new Error('Hotel ID not provided');
    }

    const response = await fetch('data/hotels.json');
    const data = await response.json();
    
    const hotel = data.hotels.find(h => h.id === hotelId);
    
    if (!hotel) {
      throw new Error('Hotel not found');
    }

    displayHotelDetails(hotel);

    const bookNowBtn = document.querySelectorAll('.book-now-btn');


    bookNowBtn.forEach(button => {
      button.onclick = handleBookNowClick;

      button.addEventListener('click', ()=>{
        button.textContent = 'Booked';
        button.disabled = true;
      });

      const listenerObj = {
        handleEvent() {
          window.open('https://www.booking.com', '_blank');
        }
      };

      button.addEventListener('click', listenerObj);
    });
  } catch (error) {
    console.error('Error loading hotel details:', error);
    document.getElementById('hotel-details').innerHTML = `
      <div class="error-message">
        <h2>Oops! Something went wrong</h2>
        <p>${error.message}</p>
        <a href="hotel-list.html" class="button">Return to Hotel List</a>
      </div>
    `;
  }
}

function displayHotelDetails(hotel) {
  const hotelDetailsElement = document.getElementById('hotel-details');
  
  hotelDetailsElement.innerHTML = `
    <div class="hotel-details__header">
      <h1>${hotel.name}</h1>
      <p class="hotel-details__location">
        <i class="icon">📍</i> ${hotel.location}
      </p>
      <div class="hotel-details__rating">
        <span class="rating"><i class="icon">⭐</i> ${hotel.rating}</span>
        <span class="reviews">${hotel.reviews} reviews</span>
      </div>
    </div>

    <div class="hotel-details__image">
      <img src="assets/img/${hotel.img}" alt="${hotel.name}" loading="lazy">
    </div>

    <div class="hotel-details__content">
      <section class="hotel-details__description">
        <h2>About the Hotel</h2>
        <p>${hotel.description}</p>
      </section>

      <section class="hotel-details__features">
        <h2>Hotel Features</h2>
        <ul class="features-list">
          ${hotel.features.map(feature => `
            <li><i class="icon">✓</i> ${feature}</li>
          `).join('')}
        </ul>
      </section>

      <section class="hotel-details__rooms">
        <h2>Available Rooms</h2>
        <div class="rooms-grid">
          ${hotel.rooms.map(room => `
            <div class="room-card">
              <h3>${room.type}</h3>
              <div class="room-details">
                <p class="room-capacity">
                  <i class="icon">👥</i> Up to ${room.capacity} guests
                </p>
                <ul class="room-amenities">
                  ${room.amenities.map(amenity => `
                    <li><i class="icon">✓</i> ${amenity}</li>
                  `).join('')}
                </ul>
              </div>
              <div class="room-price">
                <span class="price-amount">$${room.price}</span>
                <span class="price-period">per night</span>
              </div>
              <button class="book-now-btn">Book Now</button>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

function handleBookNowClick() {
  alert('Booking functionality is not implemented yet.');
}

document.addEventListener('DOMContentLoaded', loadHotelDetails);
