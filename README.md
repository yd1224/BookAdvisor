# BookAdvisor

A modern hotel search and information platform that helps users find and explore hotels worldwide before booking. BookAdvisor provides detailed hotel information, ratings, reviews, and an interactive chatbot to assist with your travel planning.

## Features

- **Hotel Search & Browse**: Explore a curated collection of hotels with detailed information
- **Interactive Chatbot**: Get instant answers to your hotel-related questions
- **Multi-language Support**: Available in English, Ukrainian, Spanish, French, and German
- **Multi-currency Display**: View prices in USD, EUR, GBP, and UAH
- **Detailed Hotel Pages**: View comprehensive information including amenities, features, and reviews
- **Responsive Design**: Optimized for desktop and mobile devices

## Project Structure

```
BookAdvisor/
├── index.html           # Homepage with hero section and featured hotels
├── hotel-list.html      # Browse all available hotels
├── hotel-page.html      # Detailed hotel information page
├── about-us.html        # About the platform
├── styles/              # CSS stylesheets
├── js/                  # JavaScript files
│   ├── chatbot.js       # Chatbot functionality
│   ├── hotels.js        # Hotel listing logic
│   └── hotel-details.js # Hotel details page logic
├── data/
│   └── hotels.json      # Hotel data
└── assets/              # Images and other assets
```

## Running the Project

### Option 1: Using a Local Web Server (Recommended)

Since the project uses JavaScript modules and fetches JSON data, it's best to run it with a local web server:

**Using Python:**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Run the server
http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

### Option 2: Using Live Server (VS Code Extension)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Direct File Opening

You can also open `index.html` directly in your browser, though some features may not work properly due to CORS restrictions:
```bash
open index.html  # macOS
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **Vanilla JavaScript**: No frameworks, pure JS
- **JSON**: Data storage for hotel information

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Author

Yelyzaveta Demchenko

## License

This project is for educational purposes.
