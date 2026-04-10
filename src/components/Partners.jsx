import React from "react";
import "../css/partners.css";

const partnerLogos = [
  {
    id: 1,
    name: "Binance",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.svg",
  },
  {
    id: 2,
    name: "Coinbase",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase_Logo.svg",
  },
  {
    id: 3,
    name: "Kraken",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Kraken_Logo.svg",
  },
  {
    id: 4,
    name: "KuCoin",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9b/KuCoin_logo.svg",
  },
  {
    id: 5,
    name: "MetaMask",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  },
  {
    id: 6,
    name: "Trust Wallet",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/Trustwallet.svg",
  },
  {
    id: 7,
    name: "Blockchain.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Blockchain.com_logo.svg",
  },
  {
    id: 8,
    name: "Chainlink",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Chainlink_Logo.svg",
  },
  {
    id: 9,
    name: "Solana",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Solana_logo.png",
  },
  {
    id: 10,
    name: "Polygon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Polygon_Blockchain_Matic_Logo.svg",
  },
  {
    id: 11,
    name: "Ethereum",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg",
  },
  {
    id: 12,
    name: "Bitcoin",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg",
  },
];

const Partners = () => {
  return (
    <section className="partners-section">
      <div className="container">
        <div className="partners-header">
          <h2>
            Backed by{" "}
            <span className="title-span">Global Financial Infrastructure</span>
          </h2>
          <p className="partners-subtitle">
            Powering the future of global digital investments
          </p>
        </div>

        <div className="logos-wrapper">
          <div className="logos-track">
            {/* The double-map creates the infinite loop effect */}
            {[...partnerLogos, ...partnerLogos].map((partner, index) => (
              <div key={index} className="partner-logo">
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
