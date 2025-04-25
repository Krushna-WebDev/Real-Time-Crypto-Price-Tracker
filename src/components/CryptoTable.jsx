import { useSelector } from 'react-redux';
import { selectAllAssets } from '../features/crypto/cryptoSlice';
import { formatNumber, formatCurrency, formatPercent } from '../utils/formatters';

const CryptoTable = () => {
  const assets = useSelector(selectAllAssets);

  const renderPercentChange = (value) => {
    const color = value >= 0 ? 'text-green-500' : 'text-red-500';
    return <span className={color}>{formatPercent(value)}</span>;
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 mx-auto shadow-lg">
      <table className="min-w-full bg-gray-800 text-white table-auto">
        <thead>
          <tr className="bg-gray-700 border-b border-gray-600">
            <th className="py-2 px-2 text-center">#</th>
            <th className="py-2 px-3 text-left">Name</th>
            <th className="py-2 px-2 text-right">Price</th>
            <th className="py-2 px-2 text-right">1h %</th>
            <th className="py-2 px-2 text-right">24h %</th>
            <th className="py-2 px-2 text-right">7d %</th>
            <th className="py-2 px-2 text-right">Market Cap</th>
            <th className="py-2 px-2 text-right">Volume (24h)</th>
            <th className="py-2 px-2 text-right">Circulating Supply</th>
            <th className="py-2 px-2 text-right">Max Supply</th>
            <th className="py-2 px-2 text-center">Last 7 Days</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {assets.map((asset, index) => (
            <tr key={asset.id} className="hover:bg-gray-750 transition-colors">
              <td className="py-3 px-2 text-center font-medium">{index + 1}</td>
              <td className="py-3 px-3">
                <div className="flex items-center">
                  <img src={asset.logo} alt={asset.name} className="w-6 h-6 mr-2" />
                  <div>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-gray-400 text-xs">{asset.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-2 text-right font-medium">{formatCurrency(asset.price)}</td>
              <td className="py-3 px-2 text-right">{renderPercentChange(asset.change1h)}</td>
              <td className="py-3 px-2 text-right">{renderPercentChange(asset.change24h)}</td>
              <td className="py-3 px-2 text-right">{renderPercentChange(asset.change7d)}</td>
              <td className="py-3 px-2 text-right">{formatCurrency(asset.marketCap)}</td>
              <td className="py-3 px-2 text-right">{formatCurrency(asset.volume24h)}</td>
              <td className="py-3 px-2 text-right whitespace-nowrap">
                {formatNumber(asset.circulatingSupply)} {asset.symbol}
              </td>
              <td className="py-3 px-2 text-right whitespace-nowrap">
                {asset.maxSupply ? `${formatNumber(asset.maxSupply)} ${asset.symbol}` : '∞'}
              </td>
              <td className="py-3 px-2 text-center">
                <img src={asset.chart7d} alt="7d chart" className="h-8 inline-block" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;