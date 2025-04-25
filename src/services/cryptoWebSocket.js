export class CryptoWebSocketSimulator {
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
    this.interval = null;
    this.isConnected = false;
  }

  connect() {
    if (this.isConnected) return;
    
    this.isConnected = true;
    this.interval = setInterval(() => {
      const assetId = Math.floor(Math.random() * 5) + 1;
      
      const priceChange = (Math.random() * 0.02) - 0.01;
      const change1h = (Math.random() * 2) - 1;
      const change24h = (Math.random() * 4) - 2;
      const change7d = (Math.random() * 6) - 3;
      const volumeChange = (Math.random() * 0.04) - 0.02;

      this.onUpdate({
        id: assetId,
        priceChange,
        change1h,
        change24h,
        change7d,
        volumeChange
      });
    }, 1500);
  }

  disconnect() {
    if (!this.isConnected) return;
    
    clearInterval(this.interval);
    this.interval = null;
    this.isConnected = false;
  }
}