import React from "react";
import { FaBitcoin, FaEthereum, FaDollarSign, FaCoins } from "react-icons/fa";
import { SiBinance, SiRipple } from "react-icons/si";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";
import "../css/crypto.css";

const CryptoPrices = () => {
  const cryptos = [
    {
      rank: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 70668.15,
      marketCap: 1410000000000,
      volume: 1180000000,
      change24h: -21.17,
      icon: <FaBitcoin />,
      iconColor: "#f7931a",
    },
    {
      rank: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: 2087.18,
      marketCap: 255420000000,
      volume: 1060000000,
      change24h: -31.33,
      icon: <FaEthereum />,
      iconColor: "#627eea",
    },
    {
      rank: 3,
      name: "Tether",
      symbol: "USDT",
      price: 1.076,
      marketCap: 73440000000,
      volume: 5160000000,
      change24h: 7.06,
      icon: <FaDollarSign />,
      iconColor: "#26a17b",
    },
    {
      rank: 4,
      name: "Binance Coin",
      symbol: "BNB",
      price: 632.07,
      marketCap: 106270000000,
      volume: 116480000,
      change24h: -27.9,
      icon: <SiBinance />,
      iconColor: "#f3ba2f",
    },
    {
      rank: 5,
      name: "USCoin",
      symbol: "USDC",
      price: 1.0,
      marketCap: 29310000000,
      volume: 728550000,
      change24h: 0.0,
      icon: <FaCoins />,
      iconColor: "#2775ca",
    },
    {
      rank: 6,
      name: "XRP",
      symbol: "XRP",
      price: 1.422,
      marketCap: 66230000000,
      volume: 126120000,
      change24h: -30.26,
      icon: <SiRipple />,
      iconColor: "#23292f",
    },
  ];

  const formatNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const formatVolume = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const formatPrice = (price) => {
    return price < 1
      ? `$${price.toFixed(3)}`
      : `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <section className="crypto-section py-5">
      <div className="container py-4">
        <div className="text-center mb-5 text-white">
          <h2 className="display-5 fw-bold">
            Live <span className="title-span">Crypto Prices</span>
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            Real‑time market data for top cryptocurrencies.
          </p>
        </div>

        <div className="crypto-table-wrapper">
          <div className="table-responsive">
            <table className="crypto-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  <th>Volume (24h)</th>
                  <th>24h Change</th>
                </tr>
              </thead>
              <tbody>
                {cryptos.map((crypto) => (
                  <tr key={crypto.rank}>
                    <td className="rank-cell">{crypto.rank}</td>
                    <td className="name-cell">
                      <div className="crypto-info">
                        <div
                          className="crypto-icon"
                          style={{ color: crypto.iconColor }}
                        >
                          {crypto.icon}
                        </div>
                        <div>
                          <span className="crypto-name">{crypto.name}</span>
                          <span className="crypto-symbol">
                            [{crypto.symbol}]
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="price-cell">{formatPrice(crypto.price)}</td>
                    <td className="marketcap-cell">
                      {formatNumber(crypto.marketCap)}
                    </td>
                    <td className="volume-cell">
                      {formatVolume(crypto.volume)}
                    </td>
                    <td
                      className={`change-cell ${crypto.change24h >= 0 ? "positive" : "negative"}`}
                    >
                      {crypto.change24h >= 0 ? (
                        <MdTrendingUp className="trend-icon" />
                      ) : (
                        <MdTrendingDown className="trend-icon" />
                      )}
                      {Math.abs(crypto.change24h).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-outline-info btn-sm view-more-btn">
              View Full Market Data
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoPrices;
