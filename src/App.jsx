import { useState, useEffect } from 'react';
import CryptoTable from './components/CryptoTable';
import { useWebSocket } from './hooks/useWebSocket';
import './App.css';

function App() {
  const { isConnected } = useWebSocket();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 shadow-md py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-500 mb-3 sm:mb-0">CryptoTracker</h1>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="text-center sm:text-right sm:mr-6 mb-3 sm:mb-0">
              <div className="text-sm text-gray-400">Last Updated</div>
              <div className="text-lg font-medium">{currentTime.toLocaleTimeString()}</div>
            </div>
            <div className="flex items-center bg-gray-700 px-4 py-2 rounded-full">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></div>
              <span className="text-sm font-medium">
                {isConnected ? 'Live' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Cryptocurrency Prices by Market Cap
          </h2>
          <CryptoTable />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} <span className="text-blue-500">CryptoTracker</span>. All
            data is simulated for demo purposes.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;