# 📈 Dodgy Dave's Stock Predictions

> **Disclaimer**: This is NOT real financial advice. "Always correct 15% of the time" - as advertised!

A modern, full-stack stock analysis application that combines real-time market data with AI-powered prediction capabilities. Built with Next.js 15, TypeScript, and integrated with the Polygon.io API for live stock market data.

## 🚀 Features

- **Real-time Stock Data**: Fetches live market data using Polygon.io API
- **Multi-ticker Analysis**: Add up to 3 stock tickers for comparative analysis
- **Modern UI/UX**: Built with Radix UI components and Tailwind CSS
- **Responsive Design**: Fully responsive interface with mobile-first approach
- **Error Handling**: Comprehensive error handling with toast notifications
- **Type Safety**: Full TypeScript implementation for robust development

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component and icons library
- **Sonner** - Toast notifications
- **Lucide Icons** - Beautiful SVG icons

### Backend
- **Next.js Route Handlers** - Serverless API endpoints
- **Polygon.io API** - Real-time financial data
- **Server-side Processing** - Data fetching and manipulation

### Development Tools
- **ESLint** - Code linting and formatting
- **Turbopack** - Fast development builds
- **Class Variance Authority** - Component styling utilities

## 🏗️ Architecture

```
app/
├── api/
│   ├── fetch-stock-data/     # Real-time stock data retrieval
│   └── fetch-ai-stock-report/ # AI-powered analysis (in development)
├── components/
│   └── ui/                   # Reusable UI components
├── lib/
│   └── utils.ts             # Utility functions and date handling
└── page.tsx                 # Main application interface
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm/bun
- Polygon.io API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dodgy-daves-stock-predictions.git
   cd dodgy-daves-stock-predictions
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your Polygon.io API key:
   ```
   POLYGON_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💡 Usage

1. **Add Stock Tickers**: Enter stock symbols (e.g., TSLA, AAPL, GOOGL) in the input field
2. **Manage Your List**: Add multiple tickers and remove them as needed
3. **Generate Report**: Click "GENERATE REPORT" to fetch real-time data
4. **View Analysis**: Review the stock data and predictions (AI analysis coming soon)

## 🔧 API Endpoints

### POST `/api/fetch-stock-data`
Fetches real-time stock data for provided tickers.

**Request Body:**
```json
{
  "stockTickers": ["TSLA", "AAPL", "GOOGL"]
}
```

**Response:**
```json
{
  "status": 200,
  "success": true,
  "data": [...] // Polygon.io stock data
}
```

## 🎯 Key Engineering Highlights

### 1. **Modern React Patterns**
- Utilizes React 19 with Next.js 15 App Router
- Implements client-side state management with hooks
- Type-safe component architecture

### 2. **API Integration**
- Seamless integration with Polygon.io financial API
- Asynchronous data fetching with error handling
- Environment-based configuration

### 3. **User Experience**
- Intuitive interface with real-time feedback
- Comprehensive error states and loading indicators
- Accessible design with Radix UI primitives

### 4. **Code Quality**
- TypeScript for type safety and better developer experience
- ESLint configuration for consistent code standards
- Modular component architecture

### 5. **Performance Optimization**
- Turbopack for fast development builds
- Efficient state management and re-rendering
- Responsive design with mobile optimization

## 🚧 Roadmap

- [ ] Complete AI-powered stock prediction analysis
- [ ] Add data visualization with charts and graphs
- [ ] Implement user authentication and portfolio tracking
- [ ] Add historical data analysis and trend detection
- [ ] Integrate machine learning models for prediction accuracy
- [ ] Add real-time WebSocket updates
- [ ] Implement caching for improved performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Hemant Sharma** - AI Engineer

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

*Built with ❤️ for learning AI Engineering and modern web development practices.*
